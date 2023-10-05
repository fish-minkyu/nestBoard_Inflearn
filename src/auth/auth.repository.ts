import { Repository, DataSource } from "typeorm";
import { User } from './user.entity'
import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from './dto/auth-credential.dto'

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {username, password} = authCredentialsDto
    const user = this.create({ username, password })

    // 생성하기 원하는 user 객체를 DB에 저장
    await this.save(user)
  }
}