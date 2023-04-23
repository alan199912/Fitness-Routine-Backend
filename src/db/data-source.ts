import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Days } from '../entities/Days';
import { Excersices } from '../entities/Excersices';
import { Users } from '../entities/Users';
import { insertDataDaysTable1676911138705 } from '../migrations/1676924735377-insert-data-days-table';
import { AddCreatedAtUpdatedAtToUsersDays1677451551595 } from '../migrations/1677451551595-AddCreatedAtUpdatedAtToUsersDays';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_fitness_routine',
  synchronize: true,
  logging: false,
  entities: [Days, Users, Excersices],
  subscribers: [],
  migrations: [insertDataDaysTable1676911138705, AddCreatedAtUpdatedAtToUsersDays1677451551595],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});
