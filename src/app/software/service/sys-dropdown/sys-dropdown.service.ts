import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { SysDropdownModel } from './../../model/sys-dropdown.model';

@Injectable({
  providedIn: 'root'
})
export class SysDropdownService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  public getDropdownList(category: string): Observable<SysDropdownModel[]> {
    return new Observable<SysDropdownModel[]>((observer) => {
      let dropdownArray: SysDropdownModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/SysDropDown/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              if (results[i].Category == category) {
                dropdownArray.push({
                  Id: results[i].Id,
                  Category: results[i].Category,
                  Description: results[i].Description,
                  Value: results[i].Value
                });
              }
            }
          }

          observer.next(dropdownArray);
          observer.complete();
        }
      );
    });
  }
}
