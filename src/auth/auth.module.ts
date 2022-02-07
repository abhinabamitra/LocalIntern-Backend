import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtWrapperService } from './services/wrappers/jwtWrapper.service';
import { jwtSecret, jwtTimer } from 'src/utils/constants/constants';

@Module({
  imports: [UsersModule, PassportModule,
  JwtModule.register({
    secret: jwtSecret,
    signOptions: {
      expiresIn: jwtTimer
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtWrapperService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
