import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const token = await authenticateUserUseCase.execute({ password, email });

      return response.json(token);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
