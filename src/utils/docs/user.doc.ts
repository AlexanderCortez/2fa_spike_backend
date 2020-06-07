import { Expose } from 'class-transformer';

export class UserDoc {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  twoAuthEnabled: boolean;
}
