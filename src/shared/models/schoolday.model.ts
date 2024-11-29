import { Deserializable } from './deserializable.model';

export class Schoolday implements Deserializable {

    public schoolday_id?: number | null;
    public schoolday_name?: string | null;
    public checked?: boolean;
    public academic_calendar_schoolday_relation_id?: number | null;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
