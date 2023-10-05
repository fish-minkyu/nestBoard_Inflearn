import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';

// 다른 곳에서도 사용할 수 있게 기입한다.
@Module({
  imports: [
    // 이제 repository 사용 가능하다.
    TypeOrmModule.forFeature([BoardRepository])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
