import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'SecretKey',
      signOptions: {
        expiresIn: 60 * 60 // 초 단위
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository
  ]
})
export class AuthModule {}
