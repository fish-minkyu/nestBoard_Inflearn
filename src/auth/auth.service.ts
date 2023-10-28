import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    // 종속적 주입
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialsDto
    const user = await this.authRepository.findOne({ where: { username } })

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성(SecretKey + Payload)
      // Payload에는 중요한 정보를 넣어두면 안된다.
      // 왜냐하면 토큰을 이용해서 정보를 가져가기 쉽기 때문이다.
      const payload = { username }
      const accessToken = await this.jwtService.sign(payload)

      return { accessToken }
    } else {
      throw new UnauthorizedException('login failed')
    }
  }
}
