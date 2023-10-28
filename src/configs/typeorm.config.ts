// typeorm 설정 파일
// postgres 설정 파일

import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import * as config from 'config'

// default.yml의 'db' 가지고 오기
const dbConfig = config.get('db')

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT ||dbConfig.port, 
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  // entities
  // : 엔티티를 이용해서 DB 테이블을 생성해준다. 그래서 엔티티 파일이 어디에 있는지 설정해준다.
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize
  // : true값을 주면 애플리케이션을 다시 실행할 때 
  // entity 안에서 수정된 컬럼의 길이 타입 변경값 등을 해당 테이블을 Drop한 후 다시 생성해준다.
  synchronize: dbConfig.synchronize
}