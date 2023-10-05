import { Controller, Get, Post, Delete, Patch, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
// dependency Injection, 종속성 주입
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto)
  }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards()
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  // ParseIntPipe(Parameter-level)
  // : NestJS에 내장되어 있는 Pipe이다.
  // 파라미터가 정수인지 확인해주고 아니라면 에러를 반환해준다.
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.deleteBoard(id)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardService.updateBoardStatus(id, status)
  }
}
