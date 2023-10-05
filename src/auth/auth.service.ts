import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    // 종속적 주입
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository
  ) {}
}
