import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-time-table',
  templateUrl: './add-time-table.component.html',
  styleUrls: ['./add-time-table.component.css']
})
export class AddTimeTableComponent implements OnInit {

  days : any = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  time : any = [
    {name:"Period 1",time:"9:30 - 10:45"},
    {name:"Period 2",time:"10:45 - 11:30"},
    {name:"Period 3",time:"11:30 - 12:45"}
    ];
  standard : any;
  standards : any;
  subjects : any;
  teachers : any = ["Varun","Srinu","Shivani","Vignesh","Venkat"];
  constructor(private common:StudentService) { }

  ngOnInit(): void {
    this.common.getStandards().subscribe(
      (data:any)=>{
        this.standards = data;
      }
    );
  }

  getSubjects(){
    this.common.getSubjectsById(this.standard).subscribe(
    (data:any)=>{
      console.log(data);
      this.subjects = data;
    }
    );
  }

  addTimeTable(){
    console.log("time table");
  }

}
