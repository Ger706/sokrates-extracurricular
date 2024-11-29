import { Token } from './token.model';
import { User } from './user.model';
import { Deserializable } from './deserializable.model';

export class Auth implements Deserializable {
  token: Token;

  token_next?: string;
  url_next?: string;

  user: User;
  mfa: string;
  roles: string[];
  setting: any;
  access: any;
  isInternalCandidate: any;
  survey_id: any;

  constructor(auth?: any) {
    this.token = new Token().deserialize(auth.token);
    this.user = new User().deserialize(auth.user);
    this.mfa = auth.mfa;
    this.roles = auth.roles;
    this.setting = auth.setting;
    this.access = auth.access;
    this.isInternalCandidate = auth.isInternalCandidate ? auth.isInternalCandidate : false;
    this.survey_id = auth.survey_id ? auth.survey_id : null;
    this.token_next = auth.token_next ? auth.token_next : null;
    this.url_next = auth.url_next ? auth.url_next : null;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    this.token = new Token().deserialize(input.token);
    this.user = new User().deserialize(input.user);
    return this;
  }
}
