import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { timeStamp } from 'console';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent implements OnInit {

  constructor(private msalservice:MsalService) { }

  ngOnInit() {
  }
  getName():string{
    return this.msalservice.instance.getActiveAccount().name;
  }
}
