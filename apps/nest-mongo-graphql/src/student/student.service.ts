import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: MongoRepository<StudentEntity>,
  ) {}

  public createStudent({ firstName, lastName }: CreateStudentInput) {
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  public getStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  public async getManyStudents(studentIds: string[]) {
    return this.studentRepository.findOne({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
