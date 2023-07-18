import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  users: UserTable;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface UserTable {
  id: Generated<number>;
  name: string;
  age: number;
  gender: Gender | null;
  created_at: ColumnType<Date>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
