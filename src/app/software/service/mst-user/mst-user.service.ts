import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstUserModel } from './../../model/mst-user.model';

@Injectable({
  providedIn: 'root'
})
export class MstUserService {

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

  public getUserList(): Observable<MstUserModel[]> {
    return new Observable<MstUserModel[]>((observer) => {
      let userArray: MstUserModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              userArray.push({
                Id: results[i].Id,
                Username: results[i].Username,
                FullName: results[i].FullName,
                Password: results[i].Password,
                Status: results[i].Status
              });
            }
          }

          observer.next(userArray);
          observer.complete();
        }
      );
    });
  }

  public getUserDetail(id: number): Observable<MstUserModel> {
    return new Observable<MstUserModel>((observer) => {
      let mstUserModel: MstUserModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstUserModel = {
              Id: results["Id"],
              Username: results["Username"],
              FullName: results["FullName"],
              Password: results["Password"],
              Status: results["Status"]
            }
          }

          observer.next(mstUserModel);
          observer.complete();
        }
      );
    });
  }

  public addUser(trnUserModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstUser/Add", JSON.stringify(trnUserModel), this.options).subscribe(
        response => {
          let id = response;

          observer.next([true, id]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public saveUser(trnUserModel: MstUserModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUser/Save", JSON.stringify(trnUserModel), this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public lockUser(trnUserModel: MstUserModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUser/Lock", JSON.stringify(trnUserModel), this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public unlockUser(trnUserModel: MstUserModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUser/UnLock", JSON.stringify(trnUserModel), this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }

  public deleteUser(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstUser/delete/" + id, this.options).subscribe(
        response => {
          observer.next([true, ""]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }
}
