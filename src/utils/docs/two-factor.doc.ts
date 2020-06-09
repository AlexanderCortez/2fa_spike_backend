import { Expose } from 'class-transformer';

export class TwoFactorDoc {
  @Expose()
  qrImage: string;

  @Expose()
  secret: string;
}