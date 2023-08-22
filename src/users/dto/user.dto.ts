//import { User } from '@prisma/client';

export type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export function formatUser(user: User) {
  const formatUser = {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
  delete formatUser.password;
  return formatUser;
}
