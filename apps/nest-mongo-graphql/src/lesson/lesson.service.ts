import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: MongoRepository<LessonEntity>,
  ) {}

  public async createLesson({ name, startDate, endDate, students }: CreateLessonInput) {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  public async getLesson(id: string): Promise<LessonEntity> {
    return this.lessonRepository.findOne({ where: { _id: id } });
  }

  public async getLessons(): Promise<LessonEntity[]> {
    return this.lessonRepository.find();
  }

  public async assignStudentsToLesson(lessonId: string, studentIds: string[]) {
    const lesson = await this.lessonRepository.findOne({ where: { _id: lessonId } });

    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepository.save(lesson);
  }
}
