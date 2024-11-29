import { Deserializable } from './deserializable.model';

export class ExtracurricularParticipant implements Deserializable {

    public excul_registration_id?: number | null;
    public regist_id?: string | null;
    public student_id?: number | null;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
