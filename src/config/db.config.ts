import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const sqliteDbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};