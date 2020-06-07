import { IApiResponse } from '@utils/interface/api-response.interface';
import { Login } from '@utils/docs/login.doc';

export class LoginResponse implements IApiResponse<Login> {
  data!: Login;
}
