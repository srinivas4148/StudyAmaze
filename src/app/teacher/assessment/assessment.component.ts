import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  assignments : any;

  constructor(private router:Router,private teacherservice:TeacherService) { }

  ngOnInit(): void {
    this.teacherservice.getAssignmentsByInstituteTeacher(sessionStorage.getItem('InstituteId'),sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.assignments=data;
      }
    );
  }

  goToReport(id){
    this.router.navigate(['teacher/assignment-report',id])
  }

}
