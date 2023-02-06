import { inject, injectable } from "tsyringe";

import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository") private carsRespoitory: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Cars[]> {
    const cars = this.carsRespoitory.findAvailable(brand, category_id, name);
    return cars;
  }
}

export { ListAvailableCarsUseCase };
