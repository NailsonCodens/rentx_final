import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

import { Cars } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Cars>;
  findByLicensePlate(license_plate: string): Promise<Cars>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Cars[]>;
  findById(id: string): Promise<Cars>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
