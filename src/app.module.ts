import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { sequelizeconf } from './utils/constants/constants';
import { Dialect } from 'sequelize/dist';

@Module({
  imports: [UsersModule, SequelizeModule.forRoot({
    dialect: sequelizeconf['dialect'] as Dialect,
    host: sequelizeconf['host'],
    port: sequelizeconf['port'],
    username: sequelizeconf['username'],
    password: sequelizeconf['password'],
    database: sequelizeconf['database'],
    models: [users]
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
