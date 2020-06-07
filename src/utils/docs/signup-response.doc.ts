import { IApiResponse } from '@utils/interface/api-response.interface';
import { UserDoc } from '@utils/docs/user.doc';

export class SignUpResponse implements IApiResponse<UserDoc> {
  data!: UserDoc;
}
