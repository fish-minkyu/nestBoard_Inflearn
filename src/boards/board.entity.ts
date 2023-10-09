import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from '../auth/user.entity'

// 게시물 entity 생성
// entity가 테이블로 변환이 된다.
// Entity 데코레이터 클래스, 이것이 없으면 타입스크립트는 이것이 Entity인지 알지 못한다
@Entity() 
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: BoardStatus

  @Column()
  userId: number // 이걸 추가해서 관계를 매핑한다.

  @ManyToOne(type => User, user => user.boards, { eager: false })
  @JoinColumn({ name: 'userId' }) // 이 부분도 추가하여 userId 컬럼과 관계를 매핑한다.
  user: User
}
