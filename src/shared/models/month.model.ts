import { Deserializable } from './deserializable.model';

export class MonthModel implements Deserializable {

  public month_code: string | null;
  public month_name: string | null;
  public month_year: string | null;
  public attendance_start: string | null;
  public attendance_end: string | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

