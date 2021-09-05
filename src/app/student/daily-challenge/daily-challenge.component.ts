import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-daily-challenge',
  templateUrl: './daily-challenge.component.html',
  styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent implements OnInit {
  showMyContainer;
  showMyContainerA;
  showMyContainerB;
  showMyContainerC;
  showMyContainerD;
  index:any;
  visibleIndex=-1;
  solndiv: any;
  date: any;
  TodayChallengeData :any= [];
  qid: any;
  questionDetails:boolean=false;
  userId:any
  status: boolean;
  yesterday:any;
  historyDate:any;
  latest_date: any;
  HistoryChallengeData: any=[];
  // TodayChallengeQuestion: any=[];
  constructor(private router:Router,private student:StudentService,private datepipe:DatePipe,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    this.yesterday =this.datepipe.transform(dte, 'yyyy-MM-dd');
    const today = new Date()
    today.toDateString()
    this.date = new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.userId=sessionStorage.getItem("userid");
    console.log(latest_date);
    console.log(this.date);
    
    this.student.retriveQuestionsBasedOnDate(latest_date,this.userId).subscribe(
      data =>{
        console.log(data);
        this.TodayChallengeData=data;
        console.log(this.TodayChallengeData);
      }
    )

  }

  showSol(ind){
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
    this.solndiv=!this.solndiv;
  }

gotoQ(qid,status){
  if(!status){
      this.router.navigate(["student/dchallengeqview",qid]); 
  }else{
    // this.toastr.warningToastr("You have already attempted this question");
    
  }
}

displayDate(){
  console.log(this.historyDate);
  this.student.retriveQuestionsBasedOnDate(this.historyDate,this.userId).subscribe(
    (data:any) =>{
      console.log(data);
      if(!data.length){
        this.snackbar.open('No History','close',{duration: 3000})
      }
      this.HistoryChallengeData = data;
      console.log(this.TodayChallengeData);
    }
  )

}

flipcardDialychallenge(){
  this.questionDetails=true;
  console.log(this.questionDetails)
}
}
