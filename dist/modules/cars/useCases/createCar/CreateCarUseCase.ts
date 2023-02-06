import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Cars> {
    const carAlreadyExits = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExits) {
      throw new AppError("Car alredy exists");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
