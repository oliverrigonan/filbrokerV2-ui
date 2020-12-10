import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppSettings } from './app-settings';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    })
  ],
  providers: [
    AppSettings,
    DecimalPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
