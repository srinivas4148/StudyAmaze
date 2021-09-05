import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-qsolution',
  templateUrl: './qsolution.component.html',
  styleUrls: ['./qsolution.component.css']
})
export class QsolutionComponent implements OnInit {

  questionData: any;
  standardName:any;
  subjectName:any;
  topicName:any;

  constructor(private student: StudentService,private _location:Location,private router:Router) { }
  // @ViewChild(MathjaxComponent) childView: MathjaxComponent;
  solution;
  qDetails;
  qDetailsId;
  actualCorrectAnswers = [];
  ngOnInit(): void {
    this.standardName=sessionStorage.getItem('standardName');
    this.subjectName=sessionStorage.getItem('subjectName');
    this.topicName=sessionStorage.getItem('topicName');
    let qid = sessionStorage.getItem("questionsView");
    this.student.getQuestionById(qid)
    .subscribe(
      data=>
      {
        console.log(data);
        this.questionData=data;
      }
    );
    this.student.getSolution(qid).subscribe(
      res=> {
        this.solution = res;
        console.log(this.solution);
        console.log("Solution object fetched from db: ", res)
      },
      err => console.log("Error while fetching the solution from db: ",err)
    )
  }

  goToQuestions(){
    this.router.navigate(['/pqtable']);
  }

  goToStandards(){
    this.router.navigate(['/study1']);
  }

  goToSubjects(){
    this.router.navigate(['/study1']);
  }

  goToTopics(){
    this.router.navigate(['/study1']);
  }

}
