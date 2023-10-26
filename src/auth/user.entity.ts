import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import { Board } from '../boards/board.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  username: string

  @Column()
  password: string

  // @OneToMany(1. type => Board, 2. board => board.user, 3. { eager: true })
  // 1. 'type => Board'
  // : User 엔티티와 연관된 다른 엔티티가 'Board'임을 나타낸다.
  // 2. 'board => board.user'
  // : 'Board' 엔티티 내부의 어떤 프로퍼티('User')가 이 관계에 연결되어 있는지 알려준다.
  // 또한, board는 클래스가 아닌 임시 변수명이다. 따라서 어떤 것으로 이름을 지어도 상관없다.
  // 중요한 것은 이 변수가 Board 인스턴스를 대변한다는 것이다
  // 3. { eager: true }
  // : true이면 연결된 엔티티의 정보를 불러온다는 것을 의미한다.
  @OneToMany(type => Board, board => board.user, { eager: true })
  boards: Board[]
}