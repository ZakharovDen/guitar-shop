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
