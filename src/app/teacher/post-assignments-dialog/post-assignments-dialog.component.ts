import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-post-assignments-dialog',
  templateUrl: './post-assignments-dialog.component.html',
  styleUrls: ['./post-assignments-dialog.component.css']
})
export class PostAssignmentsDialogComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  constructor( public dialogRef: MatDialogRef<PostAssignmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private teacherservice:TeacherService,private student:StudentService,private snackbar:MatSnackBar) { }

  public title : any ;
  public teacherInfo : any= {
    instiId : 16,
    teacherId : null,
    teacherName : null,
    subject : null,
    exp : null
  }
  generatedId : any ;
  public teacherDetails : any ;
  public Teachers : any = [];
  isForEdit : boolean = false;
  assignmentForm : FormGroup;
  standards = [];
  subjects = [];
  topics = [];
  assignmentInfo : any;
  Questions=[];
  question: any;
  isEditable :boolean;
  postAssignment : boolean =false;
  reviewAssignment : any;
  notFulFilled : boolean =true;

  ngOnInit(): void {
    console.log(this.data)
    if(this.data){
      this.teacherservice.getAssignmentById(this.data).subscribe(
        (data:any)=>{
          this.reviewAssignment = data;
        }
      );
      console.log("edit");
      this.isForEdit = true;
      this.isEditable = true;
      this.teacherservice.getAssignmentById(this.data)
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.assignmentInfo = data;
          if(data['Assignment Info'].noOfQuestions != data.Questions.length){
            this.postAssignment = true;
          }
          this.student.getSubjectsById(data['Assignment Info'].stdId)
          .subscribe(
            (data:any)=>{
              this.subjects=data;
            }
          );
          this.student.getTopicById(data['Assignment Info'].stdId,data['Assignment Info'].subjectId)
          .subscribe(
            (data:any)=>{
              this.topics=data;
            }
          );
          this.assignmentForm = new FormGroup({
            aid:new FormControl(data['Assignment Info'].aid,Validators.required),
            title:new FormControl(data['Assignment Info'].title,Validators.required),
            stdId:new FormControl(data['Assignment Info'].stdId,Validators.required),
            subjectId:new FormControl(data['Assignment Info'].subjectId,Validators.required),
            topic:new FormControl(data['Assignment Info'].topic,Validators.required),
            section:new FormControl(data['Assignment Info'].section,Validators.required),
            noOfQuestions:new FormControl(data['Assignment Info'].noOfQuestions,Validators.required),
            marks:new FormControl(data['Assignment Info'].marks,Validators.required),
            startDate:new FormControl(data['Assignment Info'].startDate,Validators.required),
            endDate:new FormControl(data['Assignment Info'].endDate,Validators.required),
            teacherIdFk:new FormControl(sessionStorage.getItem('userid'),Validators.required),
            instiIdFk:new FormControl(sessionStorage.getItem('InstituteId'),Validators.required)
          });
          this.Questions = data.Questions;
        }
      );
    }
    else
    {
      console.log("add");
    }
    this.assignmentForm = new FormGroup({
      title:new FormControl('',Validators.required),
      stdId:new FormControl('',Validators.required),
      subjectId:new FormControl('',Validators.required),
      topic:new FormControl('',Validators.required),
      section:new FormControl('',Validators.required),
      noOfQuestions:new FormControl('',Validators.required),
      marks:new FormControl('',Validators.required),
      startDate:new FormControl('',Validators.required),
      endDate:new FormControl('',Validators.required),
      teacherIdFk:new FormControl(sessionStorage.getItem('userid'),Validators.required),
      instiIdFk:new FormControl(sessionStorage.getItem('InstituteId'),Validators.required)
    });
    this.student.getStandards()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.standards=data;
      }
    );
  }

  fetchSubjects(){
    console.log(this.assignmentForm.value);
    this.student.getSubjectsById(this.assignmentForm.get('stdId').value)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.subjects=data;
      }
    );
  }

  fetchTopics(){
    this.student.getTopicById(this.assignmentForm.get('stdId').value,this.assignmentForm.get('subjectId').value)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.topics=data;
      }
    );
  }

  addAssignment(){
    // this.teacherservice.addAssignment()
  }

  addorUpdateAssignment(){
    console.log(this.assignmentForm.value);
    if(this.isForEdit){
      this.teacherservice.addAssignment(this.assignmentForm.value)
      .subscribe(
        (data:any)=>{
          console.log(data);
          if(data.status){
            this.snackbar.open('Updated successfully','close',{duration: 3000});
            this.dialogRef.close();
          }else{
            this.snackbar.open('Something went wrong','close',{duration: 3000});
          }
        }
      );
    }else{
    this.teacherservice.addAssignment(this.assignmentForm.value)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.id){
          this.generatedId = data.id
          this.snackbar.open("Added Successfully",'close',{duration: 3000});
          this.stepper.next();
        }else{
          this.snackbar.open("Something went wrong",'close',{duration: 3000})
        }
      }
    );
    } 
  }

  getAssignmentInfo(){
    if(this.data){
      this.generatedId = this.data;
    }
    this.teacherservice.getAssignmentById(this.generatedId).subscribe(
      (data:any)=>{
        console.log(data);
        this.reviewAssignment = data;
        if(data['Assignment Info'].noOfQuestions == data.Questions.length){
          this.notFulFilled = false;
          console.log(this.notFulFilled)
        }
      }
    );
  }

  addQuestion(){
    let question = {
      // "aqId":0,	
      "assignmentIdfk":this.generatedId,
      "question":this.question
    }
    this.teacherservice.addAssignmentQuestions(question)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.snackbar.open("Question Added",'close',{duration: 3000});
          this.teacherservice.getAssignmentById(this.generatedId)
          .subscribe(
            (data:any)=>{
              this.Questions = data.Questions;
              if(data['Assignment Info'].noOfQuestions != data.Questions.length){
                this.postAssignment = true;
              }
            }
          );
          this.question = "";
        }else{
          this.snackbar.open("Something went wrong",'close',{duration:3000})
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  publishAssignment(i){
    console.log(i["Assignment Info"]);
    let payload ={
      "aid": i["Assignment Info"].aid,
      "endDate": i["Assignment Info"].endDate,
      "instiIdFk": i["Assignment Info"].instiIdFk,
      "marks": i["Assignment Info"].marks,
      "noOfQuestions": i["Assignment Info"].noOfQuestions,
      "section": i["Assignment Info"].section,
      "startDate": i["Assignment Info"].startDate,
      "stdId": i["Assignment Info"].stdId,
      "subjectId": i["Assignment Info"].subjectId,
      "teacherIdFk": i["Assignment Info"].teacherIdFk,
      "title": i["Assignment Info"].title,
      "topic": i["Assignment Info"].topic
    };
    this.teacherservice.rolloutAssignment(payload).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.snackbar.open('Assignment published','close',{duration: 3000});
          this.dialogRef.close();
        }
      }
    );
  }

}
