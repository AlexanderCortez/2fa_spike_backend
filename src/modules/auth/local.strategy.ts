import { Strategy } from 'passport-strategy';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@auth-module/auth.service';
import { AuthBodyDTO } from '@auth-module/dto/auth-body.dto';
import { UserDoc } from '@utils/docs/user.doc';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService
  ) {
    super();
  }

  async authenticate({ body }) {
    const params: AuthBodyDTO = body;
    try {
      const result = await this.validate(params.email, params.password);
      this.success(result);
    } catch (err) {
      this.fail(err);
    }
  }

  async validate(email: string, pass: string): Promise<UserDoc> {
    const user = await this.authService.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('User or password are incorrect');
    }
    return plainToClass(UserDoc, user, { excludeExtraneousValues: true });
  }
}