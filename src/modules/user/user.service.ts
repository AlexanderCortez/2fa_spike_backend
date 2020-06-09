import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { AuthBodyDTO } from '@auth-module/dto/auth-body.dto';
import { UserDoc } from '@utils/docs/user.doc';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async setTwoAuthSecretKey(id: number, secret: string): Promise<User> {
    const user = await this.findById(id);
    user.twoAuthKey = secret;
    return this.userRepository.save(user);
  }

  async create(entry: AuthBodyDTO): Promise<UserDoc> {
    const user = new User(entry);
    const newUser = await this.userRepository.save(user);
    return plainToClass(UserDoc, newUser, { excludeExtraneousValues: true });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email
      }
    });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      }
    });
  }

  async findAll(): Promise<UserDoc[]> {
    const users = await this.userRepository.find();
    const payload = plainToClass(UserDoc, users, { excludeExtraneousValues: true });
    return payload;
  }

  async enableOrDisableTwoFactor(id: number, enable: boolean): Promise<User> {
    const user = await this.findById(id);
    user.twoAuthEnabled = enable;
    return this.userRepository.save(user);
  }
}