import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { SysPageModel } from './../../model/sys-page.model';

@Injectable({
  providedIn: 'root'
})
export class SysPageService {

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

  public getPageList(): Observable<SysPageModel[]> {
    return new Observable<SysPageModel[]>((observer) => {
      let pageArray: SysPageModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/SysPage/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              pageArray.push({
                Id: results[i].Id,
                Page: results[i].Page,
                Url: results[i].Url
              });
            }
          }

          observer.next(pageArray);
          observer.complete();
        }
      );
    });
  }
}
