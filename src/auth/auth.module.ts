import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository
  ]
})
export class AuthModule {}
