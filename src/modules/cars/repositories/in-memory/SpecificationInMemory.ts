import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecification;
  }
}
export { SpecificationInMemory };
