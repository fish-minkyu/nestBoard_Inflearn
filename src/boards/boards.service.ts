import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from '../auth/user.entity'


@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}

  // repository 패턴을 이용
  // async-await을 사용하지 않으므로 삭제해준다.
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }

  async getAllBoards(
    user: User
  ): Promise<Board[]> {
    // this.boardRepository.createQueryBuilder('board')
    // : 쿼리 빌더 생성, 여기서 'board'는 별칭으로 사용된다.
    // 'board'말고도 아무 이름이나 와도 된다.
    const query = this.boardRepository.createQueryBuilder('board')

    // query.where('board.userId = :userId', {userId: user.id})
    // : ':userId'는 파라미터로 대체될 부분이다.
    // '{userId: user.id}'는 객체에서 'userId'라는 이름의 파라미터 값을 제공하고 있다.
    query.where('board.userId = :userId', {userId: user.id})

    const boards = await query.getMany()

    return boards
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: {id} })

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    // this.boardRepository.delete()
    // : Repository 계층까지 가지만 Repository 계층에 
    // delete() 메소드가 없는 것은 Repository class에게 상속을 받았기 때문
    const result = await this.boardRepository.delete({id, userId: user.id})

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
