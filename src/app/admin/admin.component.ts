import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  name : any;

  constructor(private router:Router) { }

  sideNavData = [
    {name : 'Dashboard', path:'/admin/dashboard'},
    {name : 'All Users', path:'/admin/all-users'},
    {name : 'All Questions', path:'/admin/all-qas-info'},
    {name : 'Add Roles', path:'/admin/add-role'},
    {name : 'Daily Challenge', path:'/admin/add-daily-challenge'},
    {name : 'General Admin', path:'/admin/general-admin'},
    {name : 'Subject Expert1', path:'/admin/subject-expert1'},
    {name : 'Subject Expert2', path:'/admin/subject-expert2'},
    {name : 'Super Admin', path:'/admin/super-admin'},
    {name : 'User Approval', path:'/admin/user-approval'},
    // {name : 'User Details', path:'/admin/user-details'}
  ];

  ngOnInit(): void {
    this.name = sessionStorage.getItem('username');
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login/admin-login']);
  }

}
