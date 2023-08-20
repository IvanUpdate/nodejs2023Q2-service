import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor(message = 'User not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class UserCreateError extends HttpException {
  constructor(message = 'Error creating user') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class WrongPasswordError extends HttpException {
  constructor(message = 'Wrong password') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class ForbiddenRequestError extends HttpException {
  constructor(message = 'Forbidden request') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
