import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [UsersController],
  providers: [UsersService, users],
  exports: [UsersService]
})
export class UsersModule {}
