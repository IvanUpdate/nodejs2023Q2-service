import { Exclude } from 'class-transformer';
import { User } from 'src/database/database.service';

export class User_Optimized implements User {
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
