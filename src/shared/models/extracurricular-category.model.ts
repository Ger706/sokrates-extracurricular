import { Deserializable } from './deserializable.model';

export class ExtracurricularCategory implements Deserializable {

  public excul_category_id?: number | null;
  public category_name: string | null;
  public category_description: string | null;
  public is_active: boolean | false;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
