import { Deserializable } from './deserializable.model';

export class ClassModel implements Deserializable {

    public class_id?: number | null;
    public period_id?: number | null;
    public class_name?: string | null;
    public pairing_key?: string | null;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
