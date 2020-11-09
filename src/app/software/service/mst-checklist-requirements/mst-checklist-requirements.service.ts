import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstChecklistRequirementModel } from './../../model/mst-checklist-requirement.model';

@Injectable({
  providedIn: 'root'
})
export class MstChecklistRequirementsService {

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

  public getChecklistRequirementList(): Observable<MstChecklistRequirementModel[]> {
    return new Observable<MstChecklistRequirementModel[]>((observer) => {
      let checklistRequirementArray: MstChecklistRequirementModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstChecklistRequirement/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              checklistRequirementArray.push({
                Id: results[i].Id,
                ChecklistId: results[i].ChecklistId,
                Checklist: results[i].Checklist,
                RequirementNo: results[i].RequirementNo,
                Requirement: results[i].Requirement,
                Category: results[i].Category,
                Type: results[i].Type,
                WithAttachments: results[i].WithAttachments
              });
            }
          }

          observer.next(checklistRequirementArray);
          observer.complete();
        }
      );
    });
  }

  public getChecklistRequirementListPerProject(checklistId: number): Observable<MstChecklistRequirementModel[]> {
    return new Observable<MstChecklistRequirementModel[]>((observer) => {
      let checklistRequirementArray: MstChecklistRequirementModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstChecklistRequirement/ListPerChecklist/" + checklistId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              checklistRequirementArray.push({
                Id: results[i].Id,
                ChecklistId: results[i].ChecklistId,
                Checklist: results[i].Checklist,
                RequirementNo: results[i].RequirementNo,
                Requirement: results[i].Requirement,
                Category: results[i].Category,
                Type: results[i].Type,
                WithAttachments: results[i].WithAttachments
              });
            }
          }

          observer.next(checklistRequirementArray);
          observer.complete();
        }
      );
    });
  }

  public getChecklistRequirementDetail(id: number): Observable<MstChecklistRequirementModel> {
    return new Observable<MstChecklistRequirementModel>((observer) => {
      let mstChecklistRequirementModel: MstChecklistRequirementModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstChecklistRequirement/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstChecklistRequirementModel = {
              Id: results["Id"],
              ChecklistId: results["ChecklistId"],
              Checklist: results["Checklist"],
              RequirementNo: results["RequirementNo"],
              Requirement: results["Requirement"],
              Category: results["Category"],
              Type: results["Type"],
              WithAttachments: results["WithAttachments"]
            }
          }

          observer.next(mstChecklistRequirementModel);
          observer.complete();
        }
      );
    });
  }

  public addChecklistRequirement(trnChecklistRequirementModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstChecklistRequirement/Add", JSON.stringify(trnChecklistRequirementModel), this.options).subscribe(
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

  public saveChecklistRequirement(trnChecklistRequirementModel: MstChecklistRequirementModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstChecklistRequirement/Save", JSON.stringify(trnChecklistRequirementModel), this.options).subscribe(
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

  public deleteChecklistRequirement(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstChecklistRequirement/Delete/" + id, this.options).subscribe(
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
