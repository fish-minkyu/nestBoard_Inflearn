import { Repository, DataSource } from "typeorm";
import { User } from './user.entity'
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {username, password} = authCredentialsDto

    // salt 생성
    const salt = await bcrypt.genSalt()
    // 해시된 비밀번호 생성
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({ username, password: hashedPassword })

    try {
      // 생성하기 원하는 user 객체를 DB에 저장
      await this.save(user)
    } catch (error) {
      // 23505
      // : PostgreSQL DB에서 나타나는 데이터베이스 무결성 제약 조건을 위반할 때 발생하는 코드
      // Ex. DB에 중복된 유니크 제약 조건을 가진 열에 대해 중복값을 삽입하려고 할 때 발생
      if (error.code === '23505') {
        // ConflictException
        // : NestJS 프레임워크에서 제공중인 예외 클래스 중 하나, 데이터 충돌과 관련된 상황에서 사용이 된다.
        throw new ConflictException('Existing username')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}