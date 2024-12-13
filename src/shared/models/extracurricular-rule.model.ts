import { Deserializable } from './deserializable.model';

export class ExtracurricularRule implements Deserializable {

    public rule_id?: number | null;
    public rule_description: string | null;
    public minimum_excul_selection: number | null;
    public maximum_excul_selection: number | null;
    public status: boolean | false;
    school_location: any;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
