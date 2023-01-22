import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserUseCase);
    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserController };
