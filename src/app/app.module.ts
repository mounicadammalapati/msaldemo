import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


export function MSALInstanceFactory():IPublicClientApplication
{
  return new PublicClientApplication({
    auth:{
      clientId:'1d14289b-c3ea-4564-a52a-5d5736a0c854',
      redirectUri:'https://localhost:4200',
      postLogoutRedirectUri:'https://localhost:4200'
      
    }
  })
}



export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
   protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
 // protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);
   protectedResourceMap.set("https://localhost:44375/weatherforecast",['api://1d14289b-c3ea-4564-a52a-5d5736a0c854/say.hello'])
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}


@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    RestrictedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [{
    provide:MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
MsalService,{
  provide:HTTP_INTERCEPTORS,
  useClass:MsalInterceptor,
  multi:true
},
{
  provide:MSAL_INTERCEPTOR_CONFIG,
  useFactory:MSALInterceptorConfigFactory
}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
