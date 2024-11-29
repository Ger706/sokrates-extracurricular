import { Deserializable } from './deserializable.model';

export class AcademicCalendar implements Deserializable {

  public academic_calendar_id?: number | null;
  public academic_year?: string | null;
  public period_id: string | null;
  public period_name: string | null;
  public school_name?: string | null;
  public school_address?: string | null;
  public school_level_name?: string | null;
  public year_level_name?: string | null;
  public start_date?: string | null;
  public end_date?: string | null;
  public attendance_start_date?: string | null;
  public attendance_end_date?: string | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
