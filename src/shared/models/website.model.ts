import { Deserializable } from './deserializable.model';

export class Website implements Deserializable {
  public id: number | null;
  public customer_id: number;
  public fqdn: string | null;
  public redirect_to: string | null;
  public force_https: boolean | null;
  public under_maintenance_since: string | null;
  public registered_products: any;
  public settings: any;
  public microservices: any;
  public has_product: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
