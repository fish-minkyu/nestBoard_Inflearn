import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  // JwtStrategy를 이 Auth 모듈에서 사용할 수 있게 등록
  providers: [
    AuthService, 
    AuthRepository,
    JwtStrategy
  ],
  // JwtStrategy, PassportModule를 다른 모듈에서 사용할 수 있게 등록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
