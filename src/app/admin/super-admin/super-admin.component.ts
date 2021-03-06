import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  userId:any;
  Standards:any;
  Subjects:any;
  standardId:any=0;
  subjectId:any=0;
  questions:any=[];
  payload={
    standardId:0,
    subjectId:0
  }
  adminId: any;
  approvalStatus: any;
  qId: any;
  static:boolean=false;

  filterMetadata = { count: 0 };
  topics=<any>[];
  topic:any="";
  noDupTopics=[];

  constructor(private _location:Location,private admin:AdminService,private snackbar:MatSnackBar,private router:Router) { }

  ngOnInit() {
    this.userId=sessionStorage.getItem('userid');
    this.admin.getStandards()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Standards=data;
      }
    );   
  }

  onStandardChange(){
    console.log(this.standardId);
    this.admin.getSubjectsById(this.standardId)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Subjects=data;
      }
    );
  }

  onSubjectChange(){
    this.payload.standardId= this.standardId;
    this.payload.subjectId=this.subjectId;
    console.log(this.payload);
    this.admin.getQuestionsForApprovalSA(this.standardId,this.subjectId)
    .subscribe(
      data=>
      {
        console.log(data);
        this.questions=data;

        for(let i of this.questions){        
          this.topics.push(i.topic);        
        }
        console.log(this.topics);
        this.noDupTopics=Array.from(new Set(this.topics));
        console.log(this.noDupTopics);

        this.questions.reverse();
        if(this.questions.length == 0){
          this.static = true;
        }
      }
    );
  }

  
  approve(qId){
    let adminId = this.userId*1;
      let status = "APPROVED";
      const payload={};
      this.admin.dataApprovedBySA(adminId,status,qId,payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.status){
                    console.log("200");
                    this.snackbar.open("Question Approved",'close');
                  }
        },
        (error:any) => {
          console.log(error);
          console.log(error.status)
          if(error.status==500){
            this.snackbar.open(error.status + ' - Internal Server Error','close');
          }
          if(error.status == 417){
            this.snackbar.open(error.status + ' - You can not approve your question','close');
          }
        }
      );
  }

  edit(id){
    this.router.navigate(['/qas',id]);
  }

  oneMoreReview(qId){

    let adminId = this.userId*1;
      let status = "ONEMORE_REVIEW_IS_REQUIRED";
      const payload={};
      this.admin.dataApprovedBySA(adminId,status,qId,payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.status){
                    console.log("200");
                    this.snackbar.open("Question Approved",'close');
                  }
        },
        (error:any) => {
          console.log(error);
          console.log(error.status)
          if(error.status==500){
            this.snackbar.open(error.status + ' - Internal Server Error','close');
          }
          if(error.status == 417){
            this.snackbar.open(error.status + ' - You can not approve your question','close');
          }
        }
      );
   
  }

  modify(qId){
 
    let adminId = this.userId*1;
      let status = "MODIFY";
      const payload={};
      this.admin.dataApprovedBySA(adminId,status,qId,payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.status){
                    console.log("200");
                    this.snackbar.open("Question Approved",'close');
                  }
        },
        (error:any) => {
          console.log(error);
          console.log(error.status)
          if(error.status==500){
            this.snackbar.open(error.status + ' - Internal Server Error','close');
          }
          if(error.status == 417){
            this.snackbar.open(error.status + ' - You can not approve your question','close');
          }
        }
      );
  }

  duplicate(qId){
    let adminId = this.userId*1;
    let status = "DUPLICATE";
    const payload={};

    this.admin.dataApprovedBySA(adminId,status,qId,payload)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status){
                  console.log("200");
                  this.snackbar.open("Question Approved",'close');
                }
      },
      (error:any) => {
        console.log(error);
        console.log(error.status)
        if(error.status==500){
          this.snackbar.open(error.status + ' - Internal Server Error','close');
        }
        if(error.status == 417){
          this.snackbar.open(error.status + ' - You can not approve your question','close');
        }
      }
    );
   
  }
goBack(){
  this._location.back();
}
}
