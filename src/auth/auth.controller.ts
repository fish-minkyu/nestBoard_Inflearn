import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  // 종속적 주입
  constructor(private authService: AuthService) {}
}
