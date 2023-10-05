import { EntityRepository, Repository } from "typeorm";
import { Board } from './board.entity'

// BoardRepository 클래스가 Board를 컨트롤하는 Repository임을 선언
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  
}