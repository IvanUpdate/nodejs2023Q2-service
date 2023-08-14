import { User } from '@prisma/client';

export function formatUser(user: User) {
  const formatUser = {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
  delete formatUser.password;
  console.log(formatUser);
  return formatUser;
}
