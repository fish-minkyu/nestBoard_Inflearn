import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    // 종속적 주입
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await this.authRepository.findOne({ where: { username } })

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success'
    } else {
      throw new UnauthorizedException('login failed')
    }
  }
}
