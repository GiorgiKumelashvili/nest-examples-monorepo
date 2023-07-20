import { Kysely, sql } from 'kysely';
import { faker } from '@faker-js/faker';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { EnvService, InjectEnv } from '@nest-examples/shared';
import { InjectKysely } from './database/database.decorator';
import { Database, Gender } from './entities.schema';

@Controller()
export class AppController {
  constructor(
    @InjectKysely()
    private readonly db: Kysely<Database>,

    @InjectEnv()
    private readonly envService: EnvService,
  ) {}

  @Get()
  getData() {
    return {
      tables: this.db.introspection.getTables(),
      dbPort: this.envService.get('DATABASE_PORT'),
    };
  }

  @Get('user/create-db')
  async createDatabase() {
    try {
      const createEnum = await sql`
      CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
    `.execute(this.db);

      console.log('done creating enum: ' + createEnum);

      const createTable = await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        age INTEGER NOT NULL,
        gender gender_enum NOT NULL,
        created_at DATE NOT NULL
      );
    `.execute(this.db);

      console.log('done creating table: ' + createTable);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('user/fill')
  async fillDatabase() {
    return this.db.transaction().execute(t => {
      return t
        .insertInto('users')
        .values(
          Array.from({ length: 10 }, () => {
            const array = Object.values(Gender);
            const randomIndex = Math.floor(Math.random() * array.length);

            return {
              age: faker.number.int({ min: 12, max: 100 }),
              created_at: faker.date.anytime(),
              gender: array[randomIndex],
              name: 'John',
            };
          }),
        )
        .returningAll()
        .execute();
    });
  }

  @Get('user/all')
  async getAll() {
    const users = await this.db.selectFrom('users').selectAll().orderBy('id').execute();

    // playing around
    const firstUser = users.shift();

    return {
      firstUser: { ...firstUser, customDateUTC: firstUser.created_at.toUTCString() },
      users,
    };
  }

  @Get('user/update/:id')
  async updateName(@Param('id') id: string, @Query('name') name: string) {
    const resp = await this.db.updateTable('users').set({ name }).where('id', '=', id).executeTakeFirst();

    return {
      numUpdatedRows: resp.numUpdatedRows.toString(),
    };
  }
}
