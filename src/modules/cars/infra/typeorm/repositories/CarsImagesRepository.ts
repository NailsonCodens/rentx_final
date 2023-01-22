import { Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { CarsImage } from "../entities/CarsImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarsImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarsImage);
  }

  async create(car_id: string, image_name: string): Promise<CarsImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
