import { config } from 'dotenv';
import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';

config();

export const DbDataSource = {
  type: 'postgres',
  host: 'db',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  // entities: ['dist/**/entities/*.entity.js'],
  entities: [User, Artist],
  // migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
};
