import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'school-program-table',
    styleUrls: ['school-program-table.component.scss'],
    templateUrl: 'school-program-table.component.html',
})
export class SchoolProgramTableComponent implements OnInit{
    searchText: string ='';
    category: any;
    dummyData: any;
    editingRow: any = null;
    editingColumn: any = null;
    constructor(){

    }
    ngOnInit(): void {
        this.setPage();
    }
    filter(event: any) {

    }

    setPage($event: any = null) {
        this.dummyData =  [
            {
                "school_activity_id": 1,
                "category_total": 35,
                "school_activity_name": "Extracurricular",
                "description": "Activities conducted outside the regular academic curriculum, like sports and arts.",
                "category_list": [
                    {
                        'category_id': 1,
                        'category_name': 'tes1',
                        'description': '',
                        'status': 'Active',

                    },
                    {
                        'category_id': 21,
                        'category_name': 'tes12',
                        'description': '',
                        'status': 'Active',
                    },
                    {
                        'category_id': 2,
                        'category_name': 'tes4',
                        'description': '',
                        'status': 'Active',
                    }
                ]
            },
            {
                "school_activity_id": 2,
                "category_total": 12,
                "school_activity_name": "Intracurricular",
                "description": "Activities integrated into the academic curriculum, like laboratory sessions and workshops.",
                "category_list": [
                    {
                        'category_id': 1,
                        'category_name': 'tes1',
                        'description': '',
                        'status': 'Active',
                    },
                    {
                        'category_id': 21,
                        'category_name': 'tes112121212',
                        'description': '',
                        'status': 'Active',
                    },
                    {
                        'category_id': 2,
                        'category_name': 'tes4222',
                        'description': '',
                        'status': 'Active',
                    }
                ]
            },
            {
                "school_activity_id": 3,
                "category_total": 9,
                "school_activity_name": "Lomba",
                "description": "Competitions organized to encourage participation in various skills and fields.",
                "category_list": [
                    {
                        'category_id': 1,
                        'category_name': 'tasasasa1',
                        'description': '',
                        'status': 'Active',
                    },
                    {
                        'category_id': 21,
                        'category_name': 't1212122',
                        'description': '',

                    },
                    {
                        'category_id': 2,
                        'category_name': 'tes4',
                        'description': '',
                    }
                ]
            },
            {
                "school_activity_id": 4,
                "category_total": 3,
                "school_activity_name": "Olimpiade",
                "description": "Olympiads or academic competitions focused on specific subjects like math and science.",
                "category_list": [
                    {
                        'category_id': 1,
                        'category_name': 'tes1',
                        'description': '',

                    },
                    {
                        'category_id': 21,
                        'category_name': 'tes12',
                        'description': '',
                    },
                    {
                        'category_id': 2,
                        'category_name': 'tes4',
                        'description': '',
                    }
                ]
            },
            {
                "school_activity_id": 4,
                "category_total": 3,
                "school_activity_name": "Courses",
                "description": "Yes this is a course, cry about it",
            }
        ]
    }

    isEditing(row: any, column: any): boolean {
        return this.editingRow === row && this.editingColumn == column;
    }

    startEdit(row: any, column: any): void {
        this.editingRow = row;
        this.editingColumn = column;
    }


    onEditComplete(row: any): void {
        this.editingRow = null;
        this.editingColumn = null;
        console.log('Updated category_name:', row.category_name);

    }
}

