import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from "typeorm";
import { Board } from './board.entity'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum'
import { User } from '../auth/user.entity'

// @EntityRepository() 대체 방법
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager())
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user
    })

    await this.save(board)
    return board
  }
}