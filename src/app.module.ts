import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    // typeORM을 어플리케이션에서 사용할 수 있게 되었다.
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule
  ],

})
export class AppModule {}
