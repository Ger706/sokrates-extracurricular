import { Deserializable } from './deserializable.model';

export class SchoolLocation implements Deserializable {

  public school_location_id?: number | null;
  public school_id?: number | null;
  public uuid?: string | null;
  public school_address?: string | null;
  public school_phone?: string | null;
  public school_fax?: string | null;
  public school_email?: string | null;
  public school_web?: string | null;
  public school_short_address?: string | null;
  public school_name?: string | null;
  public npsn?: string | null;
  public nss?: string | null;
  public postal_code?: string | null;
  public kelurahan?: string | null;
  public city?: string | null;
  public province?: string | null;
  public kecamatan?: string | null;
  public timezone?: string | null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
