import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstProjectModel } from './../../model/mst-project.model';

@Injectable({
  providedIn: 'root'
})
export class MstProjectService {

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

  public getProjectList(): Observable<MstProjectModel[]> {
    return new Observable<MstProjectModel[]>((observer) => {
      let projectArray: MstProjectModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstProject/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              projectArray.push({
                Id: results[i].Id,
                ProjectCode: results[i].ProjectCode,
                Project: results[i].Project,
                Address: results[i].Address,
                Status: results[i].Status,
                ProjectLogo: results[i].ProjectLogo,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(projectArray);
          observer.complete();
        }
      );
    });
  }

  public getProjectDetail(id: number): Observable<MstProjectModel> {
    return new Observable<MstProjectModel>((observer) => {
      let mstProjectModel: MstProjectModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstProject/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstProjectModel = {
              Id: results["Id"],
              ProjectCode: results["ProjectCode"],
              Project: results["Project"],
              Address: results["Address"],
              Status: results["Status"],
              ProjectLogo: results["ProjectLogo"],
              IsLocked: results["IsLocked"]
            }
          }

          observer.next(mstProjectModel);
          observer.complete();
        }
      );
    });
  }

  public addProject(trnProjectModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstProject/Add", JSON.stringify(trnProjectModel), this.options).subscribe(
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

  public saveProject(trnProjectModel: MstProjectModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstProject/Save", JSON.stringify(trnProjectModel), this.options).subscribe(
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

  public lockProject(trnProjectModel: MstProjectModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstProject/Lock", JSON.stringify(trnProjectModel), this.options).subscribe(
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

  public unlockProject(trnProjectModel: MstProjectModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstProject/UnLock", JSON.stringify(trnProjectModel), this.options).subscribe(
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

  public deleteProject(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstProject/delete/" + id, this.options).subscribe(
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
