import { Deserializable } from './deserializable.model';

export class Token implements Deserializable {
  public access_token: string | null | undefined;
  public token_type: string | null;
  public expires_in: string | null;
  public ttl: number | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
