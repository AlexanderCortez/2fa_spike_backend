import { Injectable } from '@nestjs/common';
import { authenticator } from '@otplib/preset-default';
import * as qrcode from 'qrcode';
import { User } from '@entities/user.entity';
import { Generate2FADTO } from './dto/generate.dto';

@Injectable()
export class TwoFactorService {
  async generate(user: User): Promise<Generate2FADTO> {
    const secret: string = authenticator.generateSecret();
    const userEmail = user.email;
    const service = '2fa-generate';
    const otpauth = authenticator.keyuri(
      encodeURIComponent(userEmail),
      encodeURIComponent(service),
      secret
    );
    const qrImage = await qrcode.toDataURL(otpauth);
    return {
      secret,
      qrImage,
    };
  }

  validate(token: string, secret: string): boolean {
    const isValid = authenticator.check(token, secret);
    return isValid;
  }
}