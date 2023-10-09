// jwt.startegy를 다른 곳에서 사용할 수 있게 하기 위해

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from './auth.repository';

// '@Injectable()'를 사용한다.
@Injectable()
// 'PassportStrategy'란 클래스를 상속한다.
// 'PassportStrategy(Strategy)'는 JwtStrategy를 사용하기 위해 넣어준 것이다,
// 이건 passport-jwt 모듈에 Strategy를 import를 해준다는 의미이다.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // authRepository를 주입시키는 이유
    // : 토큰이 유효한지 확인한 다음에, payload 안에 유저 이름이 들어있다.
    // 유저 이름으로 유저 DB에 계정 정보를 가지고 올 것이다.
    // 그걸 구현하기 위해 authRepository를 주입하는 것이다.
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository
  ) {
    // 
    super({
      secretOrKey: 'SecretKey',
      // ExtractJwt.fromAuthHeaderAsBearerToken()
      // : 토큰이 헤더로 갈 때, Bearer 토큰 타입으로 넘어오고 유효한지 확인한다는 것이다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }
  
  async validate(payload) {
    const { username } = payload
    const user: User = await this.authRepository.findOne({ where: { username }})

    if(!user) {
      // user 정보가 없다면 'UnauthorizedException'으로 에러 발생
      throw new UnauthorizedException()
    }

    return user
  }

}