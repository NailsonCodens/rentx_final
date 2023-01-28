import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IAuthenticateDTO } from "@modules/accounts/dtos/IAuthenticateDTO";
import { IResponseTokenDTO } from "@modules/accounts/dtos/IResponseTokenDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateDTO): Promise<IResponseTokenDTO> {
    const {
      experies_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_tokens_days,
    } = auth;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorret");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorret");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: experies_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_experies_date = this.dayjsProvider.addDays(
      expires_refresh_tokens_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_experies_date,
    });

    const tokenReturn: IResponseTokenDTO = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
