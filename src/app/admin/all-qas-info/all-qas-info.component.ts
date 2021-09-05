import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-qas-info',
  templateUrl: './all-qas-info.component.html',
  styleUrls: ['./all-qas-info.component.css']
})
export class AllQasInfoComponent implements OnInit {

  Questions:any;
  Users=<any>[];
  noDupUsers=[];
  type:any="";
  standards=<any>[];
  noDupStandards=[];
  standard:any="";
  standardName:any;
  subjectName:any;
  subjects=<any>[];
  noDupSubjects=[];
  subject:any="";
  username:any="";
  topics=<any>[];
  noDupTopics=[];
  topic:any="";
  status:any="";
  filterMetadata = { count: 0 };
  constructor(private admin:AdminService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.admin.allQasInfo()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Questions=data;
        for(let i of this.Questions){
          // console.log(i.userInfo.userName);
          this.Users.push(i.userInfo.userName);
          this.standards.push(i.standard);
          this.subjects.push(i.subject);
          this.topics.push(i.topic);
        }
        console.log(this.Users);
        console.log(this.standards);
        console.log(this.subjects);
        console.log(this.topics);
        this.noDupUsers=Array.from(new Set(this.Users));
        this.noDupStandards=Array.from(new Set(this.standards));
        this.noDupSubjects=Array.from(new Set(this.subjects));
        this.noDupTopics=Array.from(new Set(this.topics));
        console.log(this.noDupUsers);
        console.log(this.noDupStandards);
        console.log(this.noDupSubjects);
        console.log(this.noDupTopics);
      }
    );
  }

  // onStandardChange(){
  //   console.log(this.standard);
  //   this.standardName=this.standard.standard;
  //   this.admin.getSubjectsById(this.standard.standardId)
  //   .subscribe(
  //     (data:any)=>
  //     {
  //       console.log(data);
  //       this.subjects=data;
  //     }
  //   );
  // }

  watch(){
    console.log(this.username);
  }

  preview(id){
    this.router.navigate(['admin/preview-question',id])
  }

}
