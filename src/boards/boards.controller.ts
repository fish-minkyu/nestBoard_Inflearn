import { Controller, Get, Post, Delete, Patch, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator'
import { User } from '../auth/user.entity'
import { Logger } from '@nestjs/common'

@Controller('boards')
@UseGuards(AuthGuard())
// dependency Injection, 종속성 주입
export class BoardsController {
  // 로거 객체 생성하기
  private logger = new Logger('BoardsController');

  constructor(private boardService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto,
  @GetUser() user: User): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`) // JSON.stringfy: 문자화 해주는 것
    return this.boardService.createBoard(createBoardDto, user)
  }

  @Get()
  getAllBoard(
    @GetUser() user: User
  ): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`)
    return this.boardService.getAllBoards(user)
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  // ParseIntPipe(Parameter-level)
  // : NestJS에 내장되어 있는 Pipe이다.
  // 파라미터가 정수인지 확인해주고 아니라면 에러를 반환해준다.
  deleteBoard(@Param('id', ParseIntPipe) id: number,
  @GetUser() user: User
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardService.updateBoardStatus(id, status)
  }
}
