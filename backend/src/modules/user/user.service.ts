import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

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
    console.dir(userEntity);

    return userEntity;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

}
