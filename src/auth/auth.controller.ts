import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  // 종속적 주입
  constructor(private authService: AuthService) {}

  // 회원가입
  @Post('/signup')
  // '@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto'
  // 1. 요청 본문(body)에 있는 데이터를 'authCredentialsDto'변수로 받아온다.
  // 2. 'ValidationPipe'으로 요청 본문 데이터가 
  // 'AuthCredentialsDto'의 형식과 일치하는지 확인한다.
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authCredentialsDto)
  };

  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto)
  };
};
