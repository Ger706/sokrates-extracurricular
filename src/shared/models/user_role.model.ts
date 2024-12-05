import { Deserializable } from './deserializable.model';

export class UserRoleModel implements Deserializable {

  public user_role_id: number | null;
  public school_location_id: number | null;
  public school_level_id: number | null;
  public role_id: number | null;
  public role_value: any | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
