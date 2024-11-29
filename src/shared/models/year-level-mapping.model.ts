import { Deserializable } from './deserializable.model';

export class YearLevelMapping implements Deserializable {

  public school_level_relation_id?: number | null;
  public school_location_id?: number | null;
  public school_id?: number | null;
  public school_name?: string | null;
  public school_address?: string | null;
  public school_short_address?: string | null;
  public school_level_id?: number | null;
  public school_level_name?: string | null;
  public year_level_id?: number | null;
  public year_level_name?: string | null;
  public order_number?: number | null;
  public checked: any;
  public used?: any;
  public instances?: any;


  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
