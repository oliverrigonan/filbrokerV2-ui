import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstChecklistModel } from './../../model/mst-checklist.model';

@Injectable({
  providedIn: 'root'
})
export class MstChecklistService {

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

  public getChecklistList(): Observable<MstChecklistModel[]> {
    return new Observable<MstChecklistModel[]>((observer) => {
      let checklistArray: MstChecklistModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstChecklist/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              checklistArray.push({
                Id: results[i].Id,
                ChecklistCode: results[i].ChecklistCode,
                Checklist: results[i].Checklist,
                ChecklistDate: results[i].ChecklistDate,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                Remarks: results[i].Remarks,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(checklistArray);
          observer.complete();
        }
      );
    });
  }

  public getChecklistListPerProject(projectId: number): Observable<MstChecklistModel[]> {
    return new Observable<MstChecklistModel[]>((observer) => {
      let checklistArray: MstChecklistModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstChecklist/ListPerProjectId/" + projectId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              checklistArray.push({
                Id: results[i].Id,
                ChecklistCode: results[i].ChecklistCode,
                Checklist: results[i].Checklist,
                ChecklistDate: results[i].ChecklistDate,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                Remarks: results[i].Remarks,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(checklistArray);
          observer.complete();
        }
      );
    });
  }

  public getChecklistDetail(id: number): Observable<MstChecklistModel> {
    return new Observable<MstChecklistModel>((observer) => {
      let mstChecklistModel: MstChecklistModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstChecklist/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstChecklistModel = {
              Id: results["Id"],
              ChecklistCode: results["ChecklistCode"],
              Checklist: results["Checklist"],
              ChecklistDate: results["ChecklistDate"],
              ProjectId: results["ProjectId"],
              Project: results["Project"],
              Remarks: results["Remarks"],
              Status: results["Status"],
              IsLocked: results["IsLocked"]
            }
          }

          observer.next(mstChecklistModel);
          observer.complete();
        }
      );
    });
  }

  public addChecklist(trnChecklistModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstChecklist/Add", JSON.stringify(trnChecklistModel), this.options).subscribe(
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

  public saveChecklist(trnChecklistModel: MstChecklistModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstChecklist/Save", JSON.stringify(trnChecklistModel), this.options).subscribe(
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

  public lockChecklist(trnChecklistModel: MstChecklistModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstChecklist/Lock", JSON.stringify(trnChecklistModel), this.options).subscribe(
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

  public unlockChecklist(trnChecklistModel: MstChecklistModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstChecklist/UnLock", JSON.stringify(trnChecklistModel), this.options).subscribe(
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

  public deleteChecklist(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstChecklist/delete/" + id, this.options).subscribe(
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
