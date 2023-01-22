import { ArrayContains, In, Repository } from "typeorm";

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.repository.find({
      where: { id: In(ids) },
    });

    return specification;
  }

  async create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }
}

export { SpecificationsRepository };
