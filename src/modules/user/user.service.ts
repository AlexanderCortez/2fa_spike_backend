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
}