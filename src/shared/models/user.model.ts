import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  public id: number | null;
  // public user_id: number | null;
  // public fullname: string | null;
  // public username: string | null;
  // public email: string | null;
  public uuid: string | null;
  // public has_verified_email: boolean;

  public staff_id?: number | null;
  // public student_id?: number | null;
  // public student_hash_id?: number | null;
  // public candidate_id?: number | null;
  public school_location_id?: number | null;
  public school_level_id?: number | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
