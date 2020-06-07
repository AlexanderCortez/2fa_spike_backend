import { Injectable } from '@nestjs/common';
import { UserService } from '@user-module/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const matchPassword = bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        return user;
      }
    }
    return user;
  }

  async signIn(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}