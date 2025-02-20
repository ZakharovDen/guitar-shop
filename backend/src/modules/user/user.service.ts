import { ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from 'src/core/interfaces/token.interface';
import { createJWTPayload } from 'src/helpers/jwt';
import { JwtService } from '@nestjs/jwt';
import { AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './user.constant';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    const { email, name, password } = dto;
    const newUser = {
      email, name, passwordHash: ''
    };
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException('Пользователь с таким email уже существует.');
    }
    const userEntity = await new UserEntity(newUser).setPassword(password)
    await this.userRepository.save(userEntity);
    // TODO: send email
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async createUserToken(user: UserEntity): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
