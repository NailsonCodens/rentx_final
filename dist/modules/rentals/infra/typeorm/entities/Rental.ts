import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Cars)
  @JoinColumn({ name: "car_id" })
  car: Cars;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
