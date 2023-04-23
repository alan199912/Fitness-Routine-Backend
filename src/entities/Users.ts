import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Days } from './Days';
import { Excersices } from './Excersices';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => Days, (day) => day.user, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'users_days',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'day_id',
      referencedColumnName: 'id',
    },
  })
  days: Days[];

  @OneToMany(() => Excersices, (excersice) => excersice.id)
  excersice: Excersices;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
