import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from "typeorm";
import { Board } from './board.entity'

// @EntityRepository() 대체 방법
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager())
  }
}