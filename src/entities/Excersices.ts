import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  Relation,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Days } from './Days';
import { Users } from './Users';

@Entity()
export class Excersices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  series: number;

  @Column()
  time: string;

  @Column()
  rest: string;

  @Column()
  weight: string;

  @ManyToOne(() => Users, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: Relation<Users[]>;

  @ManyToMany(() => Days, (day) => day.id, {
    cascade: true,
  })
  @JoinTable()
  day_id: Relation<Days>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
