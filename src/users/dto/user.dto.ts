import { Exclude } from 'class-transformer';

export class User_Optimized {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User_Optimized>) {
    Object.assign(this, partial);
  }
}
