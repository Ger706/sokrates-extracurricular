import { Deserializable } from './deserializable.model';

export class Pathway implements Deserializable {

  checked: any;
  public pathway_id?: number | null;
  public pathway_name: string | null;
  public pathway_description: string | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
