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
    console.log('salt', salt)
    // 해시된 비밀번호 생성
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({ username, password: hashedPassword })

    
    try {
      // 생성하기 원하는 user 객체를 DB에 저장
      await this.save(user)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}