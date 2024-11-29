import { Deserializable } from './deserializable.model';

export class AcademicYear implements Deserializable {

  public id?: number | null;
  public academic_year?: string | null;
  public period_id: number | null;
  public period_name: string | null;
  public angkatan: string | null;
  public current?: boolean;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
