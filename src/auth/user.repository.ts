import { Repository, Entity, DataSource } from "typeorm";
import { User } from './user.entitiy'
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }
}