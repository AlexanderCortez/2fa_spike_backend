import { IApiResponse } from '@utils/interface/api-response.interface';
import { UserDoc } from './user.doc';

export class UsersResponse implements IApiResponse<UserDoc[]> {
  data!: UserDoc[];
}
