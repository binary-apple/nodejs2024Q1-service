import { config } from 'dotenv';
import { User } from 'src/user/entities/user.entity';

config();
console.log(process.env);

export const DbDataSource = {
  type: 'postgres',
  host: 'db',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  // entities: ['dist/**/entities/*.entity.js'],
  entities: [User],
  // migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
};
