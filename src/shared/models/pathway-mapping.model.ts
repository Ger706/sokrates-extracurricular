import { Deserializable } from './deserializable.model';

export class PathwayMapping implements Deserializable {

  public year_pathway_relation_id?: number | null;
  public school_level_relation_id?: number | null;
  public school_location_id?: number | null;
  public school_name?: string | null;
  public school_address?: string | null;
  public school_short_address?: string | null;
  public school_level_id?: number | null;
  public school_level_name?: string | null;
  public year_level_id?: number | null;
  public year_level_name?: string | null;
  public pathway_id?: number | null;
  public pathway_name?: string | null;
  public order_number?: number | null;
  checked?: boolean;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
