import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private router:Router,private loader: LoaderService,private spinner: NgxSpinnerService) { }

  Roles : any;
  subjectExpert1 : boolean = false;
  subjectExpert2 : boolean = false;
  isExpanded = false;
  isShowing = false;
  name : any;

  isLoading: Subject<boolean> = this.loader.isLoading;

  sideNavData = [
    {icon:'dashboard',name : 'Dashboard', path:'/student/dashboard'},
    {icon:'assessment',name:'Daily Challenge',path:'/student/daily-challenge' },
    {icon:'person',name : 'Profile', path:'/student/profile'},
    {icon:'menu_book',name : 'Study', path:'/student/study'},
    {icon:'forum',name:'Forums',path:'/student/forums' },
    {icon:'assignment',name:'Assignments',path:'/student/assignments'}
  ];

  ngOnInit(): void {
    this.spinner.show();
    this.name = sessionStorage.getItem('username');
    this.Roles = JSON.parse(sessionStorage.getItem('Roles'));
    console.log(this.Roles);
    if(this.Roles.length){
      this.Roles.forEach(element => {
        if(element.roleId == '10' || element.roleId == '12' || element.roleId == '14' || element.roleId == '16' || element.roleId == '24' || element.roleId == '26'){
          this.subjectExpert1 = true;
        }
        if(element.roleId == '11' || element.roleId == '13'|| element.roleId == '15' || element.roleId == '17' || element.roleId == '25' || element.roleId == '27'){
          this.subjectExpert2 = true;
        }
      });
    }
    if(this.subjectExpert1){
      this.sideNavData.push({ icon: 'science' ,name :'Subject Expert 1' , path :'/student/subject-expert1' })
    }
    if(this.subjectExpert2){
      this.sideNavData.push({ icon: 'science' ,name :'Subject Expert 2' , path :'/student/subject-expert2' })
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login/user-login']);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
