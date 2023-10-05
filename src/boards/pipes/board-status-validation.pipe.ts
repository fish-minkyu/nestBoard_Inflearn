// 모든 pipe에는 PipeTransform이 있어야 한다.
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ] 
  
  // value은 status값이 찍힌다.
  // metadata는 { metatype: [Function: string], type: 'body', data: 'status' }
  // 단, 지금 metadata는 지금 사용하지 않아서 지워줬다.
  transform(value: any) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`)
    }

    return value
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status)
    return index !== -1
  }
}