import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ChildComponentComponent } from './home/child-component/childcomponent';
import { MissionServiceService } from './service/missionservice';
import { PopupComponent } from './common/popup-component/popupcomponent';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponentComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [HttpClientModule, MissionServiceService],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule { }
