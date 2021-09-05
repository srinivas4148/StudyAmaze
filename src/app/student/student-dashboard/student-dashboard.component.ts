import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  subjectId : any;
  standardId: any;
  userId : any;
  practiceResults : any = [];
  testResults :any = [];
  questionsasked : any = [];
  solution : any = [];
  discussAccuracy: any=[];

  constructor(private student:StudentService,private router:Router) { }

  ngOnInit() {
    this.standardId=sessionStorage.getItem('standard');
    this.userId = sessionStorage.getItem('userid');
    this.student.getUserRoleDetails(this.userId).subscribe(
      (data:any)=>{
        console.log(data);
      }
    );
    this.student.getStudentDetails(this.userId).subscribe(
      (data:any)=>{
        console.log(data);
        sessionStorage.setItem('isId',data[0].isId);
        sessionStorage.setItem('instituteId',data[0].instiId);
        sessionStorage.setItem('section',data[0].section);
      }
    );
    this.student.getSubjectWisePercentage(this.userId,this.standardId).subscribe(
      (data:any)=>{
        console.log(data);
        this.practiceResults = data;
      }
    );
    this.student.getStandwisePercentages(this.standardId,this.userId).subscribe(
      (data:any)=>{
        console.log(data);
        this.testResults = data;
      }
    );
    this.student.getQuestionsCount(this.userId).subscribe(
      data => {
        console.log(data);
        this.questionsasked = data;
      }
    );
    this.student.getSolutionByUser(this.userId).subscribe(
      data =>{
        console.log(data);
        this.solution = data;
      }
    );
    this.student.getQuestionsByUser(this.userId).subscribe(
      data =>{
        console.log(data);
        this.discussAccuracy = data;
      }
    );
  }

  pmaccuracyClick(id,name,standard){
    this.subjectId=id;
    this.router.navigate(["student/pmathsaccuracy",id,name,standard]);
  }

  //discussions
  discussionaccuracy(){
    this.router.navigate(["student/discussionaccuracy"]);
  }

  solutions(){
    this.router.navigate(["student/solutions-report"]);
  }

  testaccuracy(id,name,stId){
    this.subjectId=id;
    // this.standardId=3;
    // this.topicId=1;
    this.router.navigate(["/student/testaccuracy",id,name,stId]);
  }

}
