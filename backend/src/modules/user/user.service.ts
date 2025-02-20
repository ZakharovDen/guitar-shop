import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from 'src/core/interfaces/token.interface';
import { createJWTPayload } from 'src/helpers/jwt';
import { JwtService } from '@nestjs/jwt';

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

  public async createUserToken(dto: LoginUserDto): Promise<Token> {
    const user = await this.userRepository.findByEmail(dto.email);
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
