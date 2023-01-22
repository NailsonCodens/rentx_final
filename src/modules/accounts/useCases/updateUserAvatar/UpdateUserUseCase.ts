import { inject, injectable } from "tsyringe";

import { IUpdateAvatarDTO } from "@modules/accounts/dtos/IUpdateAvatarDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { deleteFile } from "@utils/file";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IUpdateAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserUseCase };
