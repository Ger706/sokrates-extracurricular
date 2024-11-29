import { Deserializable } from './deserializable.model';

export class Extracurricular implements Deserializable {

    public excul_id?: number | null;
    public academic_year?: string | null;
    public period_id?: number | null;
    public extracurricular_name?: string | null;
    public extracurricular_description?: string | null;
    public extracurricular_desc?: string | null;
    public excul_category_id?: number | null;
    public activity_start_date?: string | null;
    public activity_end_date?: string | null;
    public activity_schedule_day?: string | null;
    public activity_schedule_time?: string | null;
    public venue?: string | null;
    public is_scoring?: boolean | false;
    public advisor?: string | null;
    public coach?: string | null;
    public minimum_participant?: number | null;
    public maximum_participant?: number | null;
    public participation_fee?: number | null;
    public is_deleted?: boolean | false;
    public term?: number | null;
    public is_attendance?: boolean | false;
    public status?: string | null;
    public parallel_class?: string | null;
    public has_coach?: boolean | false;
    public coach_id?: number | null;
    public staff_id?: number | null;
    public equipment_fee?: string | null;
    public venue_fee?: string | null;
    public other_fee?: string | null;
    public total_fee?: string | null;
    public extracurricular_fee?: string | null;
    public sessions?: string | null;
    public coach_fee?: string | null;
    public rule_id?: number | null;
    public max_registration_day?: string | null;
    public school_location_id?: number | null;
    public school?: any | null;
    public category?: any | null;
    public year_level?: any | null;
    public score_range?: any | null;
    public schedule?: any | null;
    public coach_supervisor?: any | null;
    public fullname_approver?: any | null;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
