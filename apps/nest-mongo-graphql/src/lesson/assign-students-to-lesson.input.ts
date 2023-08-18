import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLesson {
  @IsUUID()
  @Field(_type => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(_type => [ID])
  studentIds: string[];
}
