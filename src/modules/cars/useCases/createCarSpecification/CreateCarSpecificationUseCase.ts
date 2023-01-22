import { inject, injectable } from "tsyringe";

import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificaationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Cars> {
    const carExists = await this.carsRespository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRespository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificaationUseCase };
