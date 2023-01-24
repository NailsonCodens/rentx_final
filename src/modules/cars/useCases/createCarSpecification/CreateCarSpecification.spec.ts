import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificaationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificaationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepository: SpecificationInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificaationUseCase(
      carsRepositoryInMemory,
      specificationsRepository
    );
  });

  it("shoulde be able to add a new specification to a non-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("shoulde be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Available",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "catagory",
    });

    const specification = await specificationsRepository.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
