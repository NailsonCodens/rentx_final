import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Cars[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Cars> {
    const car = new Cars();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars> {
    const car = await this.cars.find(
      (car) => car.license_plate === license_plate
    );

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Cars[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return all;
  }

  async findById(id: string): Promise<Cars> {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
