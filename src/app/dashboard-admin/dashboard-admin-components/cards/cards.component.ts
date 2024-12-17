import { Component, OnInit } from '@angular/core';

interface cards {
  image: string;
  btn: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cards: cards [] = [
    {
      image: "assets/images/excul4.jpg",
      btn: "warn",
      title: 'Create an School Program',
      description: 'Add a new school-program-activity to the system. Provide essential details information to create a new event for students to participate in.'

    },
    {
      image: "assets/images/excul2.jpg",
      btn: "primary",
      title: 'View School Program Participants',
      description: 'View a list of students or participants enrolled in a particular school-program-activity. You can see their details for better management and tracking.'
    },
    {
      image: "assets/images/excul3.jpg",
      btn: "accent",
      title: 'Set School Program Activity Schedule',
      description: 'Define the schedule for an school-program-activity. This ensures that the school-program-activity is organized and participants can plan accordingly.'
    },
  ]

}
