import { Module } from '@nestjs/common';
// import { UserController } from '@user-module/user.controller';
import { UserService } from '@user-module/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  // controllers: [UserController],
})
export class UserModule { }