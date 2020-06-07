import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersResponse } from '@utils/docs/users-response.doc';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiBearerAuth()
  async findAll(): Promise<UsersResponse> {
    const users = await this.userService.findAll();
    return {
      data: users,
    }
  }
}