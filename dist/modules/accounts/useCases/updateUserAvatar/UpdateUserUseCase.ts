import { inject, injectable } from "tsyringe";

import { IUpdateAvatarDTO } from "@modules/accounts/dtos/IUpdateAvatarDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_file }: IUpdateAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }
    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserUseCase };
