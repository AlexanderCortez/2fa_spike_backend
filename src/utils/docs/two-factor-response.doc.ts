import { IApiResponse } from '@utils/interface/api-response.interface';
import { TwoFactorDoc } from '@utils/docs/two-factor.doc';

export class TwoFactorResponse implements IApiResponse<TwoFactorDoc> {
  data!: TwoFactorDoc;
}
