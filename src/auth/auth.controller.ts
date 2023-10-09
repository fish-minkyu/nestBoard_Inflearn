import { Controller, Body, Post, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport'
import { User } from './user.entity'
import { GetUser } from './get-user.decorator'

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

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.signIn(authCredentialsDto)
  };

  @Post('/test')
  // 'AuthGuard()'의 역할
  // 1. JwtStrategy.validate(payload)의 리턴값 user 객체를 req객체에 넣어준다.
  // 2. 인증 역할: 토큰이 없거나 맞지 않는 것은 막아버린다.
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user', user)
  }
};
