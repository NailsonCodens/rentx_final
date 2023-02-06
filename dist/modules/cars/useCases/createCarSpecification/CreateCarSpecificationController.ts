import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificaationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificaationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(cars);
  }
}

export { CreateCarSpecificationController };
