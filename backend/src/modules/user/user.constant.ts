export const AuthUserErrorMessage = {
  Exists: 'User with this email exists',
  NotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
} as const;

// export const AUTH_USER_EXISTS = 'User with this email exists';
// export const AUTH_USER_NOT_FOUND = 'User not found';
// export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const SALT_ROUNDS = 10;

export const UserFieldDescription = {
  Email: { description: 'Электронная почта', example: 'example@mail.com' },
  Name: { description: 'Имя пользователя', example: 'Иванов Иван' },
  Password: { description: 'Пароль', example: 'Pa$$w0rd' },
} as const;

export const UserValidateValue = {
  Password: {
    MinLength: 6,
    MaxLength: 12,
  },
  Name: {
    MinLength: 1,
    MaxLength: 15,
  },
} as const;

export const UserValidateMessage = {
  Email: 'The email is not valid',
  Password: `Min length for password is ${UserValidateValue.Password.MinLength}, max is ${UserValidateValue.Password.MaxLength}`,
  Name: `Min length for name is ${UserValidateValue.Name.MinLength}, max is ${UserValidateValue.Name.MaxLength}`,
} as const;
