import { CategoriesInMemory } from "@modules/cars/repositories/in-memory/CategoriesInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesInMemory;

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };
    await createCategoryUseCase.execute(category);

    const categoryCreate = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreate).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test not",
      description: "Category description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category alredy exists!"));
  });
});
