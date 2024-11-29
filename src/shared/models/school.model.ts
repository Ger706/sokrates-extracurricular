import { Deserializable } from './deserializable.model';
import { SchoolLocation } from './school-location';

export class School implements Deserializable {

  public school_id?: number | null;
  public school_name: string | null;
  public school_initial: string | null;
  public locations: Array<SchoolLocation> | null;

  constructor() {
    this.locations = [];
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
