import { Deserializable } from './deserializable.model';

export class SchoolActivityModel implements Deserializable {
    public school_activity_id?: number;
    public school_activity_name?: string | null;
    public description?: string | null;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
