import { hash } from "bcrypt";
import { autoInjectable, inject } from "tsyringe";

import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@autoInjectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Token Invalid!");
    }

    if (
      this.dayjsProvider.compareIfBefore(
        userToken.expires_date,
        this.dayjsProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
