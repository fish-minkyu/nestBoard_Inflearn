import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';


@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}

  // repository 패턴을 이용
  // async-await을 사용하지 않으므로 삭제해준다.
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto)
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find()
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: {id} })

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found
  }

  async deleteBoard(id: number): Promise<void> {
    // this.boardRepository.delete()
    // : Repository 계층까지 가지만 Repository 계층에 
    // delete() 메소드가 없는 것은 Repository class에게 상속을 받았기 때문
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)

    board.status = status
    await this.boardRepository.save(board)

    return board
  }
}
