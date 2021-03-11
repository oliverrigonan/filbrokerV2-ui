import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstUserRights } from './../../model/mst-user-rights.model';
@Injectable({
  providedIn: 'root'
})
export class MstUserRightsService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient) { }

    public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  public getUserRightsList(): Observable<MstUserRights[]> {
    return new Observable<MstUserRights[]>((observer) => {
      let userRightsArray: MstUserRights[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUserRight/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              userRightsArray.push({
                Id: results[i].Id,
                UserId: results[i].UserId,
                PageId: results[i].PageId,
                Page: results[i].Page,
                PageURL: results[i].PageURL,
                CanEdit: results[i].CanEdit,
                CanSave: results[i].CanSave,
                CanLock: results[i].CanLock,
                CanUnLock: results[i].CanUnLock,
                CanPrint: results[i].CanPrint,
                CanDelete: results[i].CanDelete,
              });
            }
          }

          observer.next(userRightsArray);
          observer.complete();
        }
      );
    });
  }

  public getUserRightsListPerUser(UserId: number): Observable<MstUserRights[]> {
    return new Observable<MstUserRights[]>((observer) => {
      let userRightsArray: MstUserRights[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUserRight/ListPerUser/" + UserId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              userRightsArray.push({
                Id: results[i].Id,
                UserId: results[i].UserId,
                PageId: results[i].PageId,
                Page: results[i].Page,
                PageURL: results[i].PageURL,
                CanEdit: results[i].CanEdit,
                CanSave: results[i].CanSave,
                CanLock: results[i].CanLock,
                CanUnLock: results[i].CanUnLock,
                CanPrint: results[i].CanPrint,
                CanDelete: results[i].CanDelete,
              });
            }
          }

          observer.next(userRightsArray);
          observer.complete();
        }
      );
    });
  }

  public getUserRightsDetail(id: number): Observable<MstUserRights> {
    return new Observable<MstUserRights>((observer) => {
      let mstUserRightsModel: MstUserRights = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUserRight/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstUserRightsModel = {
              Id: results["Id"],
                UserId: results["UserId"],
                PageId: results["PageId"],
                Page: results["Page"],
                PageURL: results["PageURL"],
                CanEdit: results["CanEdit"],
                CanSave: results["CanSave"],
                CanLock: results["CanLock"],
                CanUnLock: results["CanUnLock"],
                CanPrint: results["CanPrint"],
                CanDelete: results["CanDelete"],
            }
          }

          observer.next(mstUserRightsModel);
          observer.complete();
        }
      );
    });
  }

  public getUserRightPerCurrentUser(page: string): Observable<MstUserRights> {
    return new Observable<MstUserRights>((observer) => {
      let mstUserRightsModel: MstUserRights = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUserRight/ListPerCurrentUser/" + page, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstUserRightsModel = {
              Id: results["Id"],
                UserId: results["UserId"],
                PageId: results["PageId"],
                Page: results["Page"],
                PageURL: results["PageURL"],
                CanEdit: results["CanEdit"],
                CanSave: results["CanSave"],
                CanLock: results["CanLock"],
                CanUnLock: results["CanUnLock"],
                CanPrint: results["CanPrint"],
                CanDelete: results["CanDelete"],
            }
          }

          observer.next(mstUserRightsModel);
          observer.complete();
        }
      );
    });
  }
  public addUserRights(mstUserRightsModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstUserRight/Add", JSON.stringify(mstUserRightsModel), this.options).subscribe(
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

  public saveUserRights(mstUserRightsModel: MstUserRights): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUserRight/Save", JSON.stringify(mstUserRightsModel), this.options).subscribe(
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

  public deleteUserRights(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstUserRight/Delete/" + id, this.options).subscribe(
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

