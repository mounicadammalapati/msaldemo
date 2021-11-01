import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'msal-demo';
  apiResponse:string;
  constructor(private msalservice:MsalService,private httpClient:HttpClient)
  {
     
  }

  ngOnInit()
  {
//     if("2"+"3"=="5"){
//       console.log("i m in if statememnt");
//     }
//    else{
//     console.log("i m in else statememnt");
//    }
   
//  const myline="Rajiv Bagai";
//  var mynums=[];
//  var str=`$(58+55)`;
//  console.log(str);
//  for(var i=0;i<myline.length;i++)
//  {
//    let c=myline.charAt(i);
  
   
//    if(myline.indexOf(c)!=myline.lastIndexOf(c))
//    {
//      mynums.push(i);
//      console.log(i);
//    }
//  }
  }
  // ngOnInit():void{
  //   this.msalservice.instance.handleRedirectPromise().then(
  //     res=>{
  //       if(res!=null && res.account!=null)
  //       {
  //         this.msalservice.instance.setActiveAccount(res.account);
  //       }
  //     }
  //   )
  // }

  isLoggedIn():boolean{
    return this.msalservice.instance.getActiveAccount()!=null;
  }

  login() 
  {
    //this.msalservice.loginRedirect();
     this.msalservice.loginPopup().subscribe((response:AuthenticationResult)=>{
       this.msalservice.instance.setActiveAccount(response.account);
     });
  }
  
  logout()
  {
    this.msalservice.logout();
  }

  callProfile()
  {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe(response=>{
      this.apiResponse=JSON.stringify(response);
    });
  }

  callApi()
  {
    this.httpClient.get("https://localhost:44375/weatherforecast").subscribe(response=>{
        this.apiResponse=JSON.stringify(response);
    });
  }
} 
