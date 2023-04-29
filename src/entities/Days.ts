import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Excersices } from './Excersices';
import { Users } from './Users';

@Entity()
export class Days {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Users, (user) => user.days)
  user: Users;

  @ManyToMany(() => Excersices, (excersice) => excersice.id)
  excersice: Excersices[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
