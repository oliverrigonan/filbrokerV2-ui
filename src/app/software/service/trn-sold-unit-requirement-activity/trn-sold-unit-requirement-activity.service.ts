import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnSoldUnitRequirementActivityModel } from './../../model/trn-sold-unit-requirement-activity.model';

@Injectable({
  providedIn: 'root'
})
export class TrnSoldUnitRequirementActivityService {

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

  public getSoldUnitRequirementActivityList(): Observable<TrnSoldUnitRequirementActivityModel[]> {
    return new Observable<TrnSoldUnitRequirementActivityModel[]>((observer) => {
      let houseModelArray: TrnSoldUnitRequirementActivityModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirementActivity/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              houseModelArray.push({
                Id: results[i].Id,
                SoldUnitRequirementId: results[i].SoldUnitRequirementId,
                ActivityDate: results[i].ActivityDate,
                Activity: results[i].Activity,
                Remarks: results[i].Remarks,
                UserId: results[i].UserId,
                User: results[i].User,
                ChecklistRequirement: results[i].ChecklistRequirement,
                SoldUnitNumber: results[i].SoldUnitNumber,
                Project: results[i].Project,
                UnitCode: results[i].UnitCode,
                Customer: results[i].Customer
              });
            }
          }

          observer.next(houseModelArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitRequirementActivityListPerProject(soldUnitRequirementId: number): Observable<TrnSoldUnitRequirementActivityModel[]> {
    return new Observable<TrnSoldUnitRequirementActivityModel[]>((observer) => {
      let houseModelArray: TrnSoldUnitRequirementActivityModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirementActivity/ListPerSoldUnitRequirement/" + soldUnitRequirementId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              houseModelArray.push({
                Id: results[i].Id,
                SoldUnitRequirementId: results[i].SoldUnitRequirementId,
                ActivityDate: results[i].ActivityDate,
                Activity: results[i].Activity,
                Remarks: results[i].Remarks,
                UserId: results[i].UserId,
                User: results[i].User,
                ChecklistRequirement: results[i].ChecklistRequirement,
                SoldUnitNumber: results[i].SoldUnitNumber,
                Project: results[i].Project,
                UnitCode: results[i].UnitCode,
                Customer: results[i].Customer
              });
            }
          }

          observer.next(houseModelArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitRequirementActivityDetail(id: number): Observable<TrnSoldUnitRequirementActivityModel> {
    return new Observable<TrnSoldUnitRequirementActivityModel>((observer) => {
      let trnSoldUnitRequirementActivityModel: TrnSoldUnitRequirementActivityModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirementActivity/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnSoldUnitRequirementActivityModel = {
              Id: results["Id"],
              SoldUnitRequirementId: results["SoldUnitRequirementId"],
              ActivityDate: results["ActivityDate"],
              Activity: results["Activity"],
              Remarks: results["Remarks"],
              UserId: results["UserId"],
              User: results["User"],
              ChecklistRequirement: results["ChecklistRequirement"],
              SoldUnitNumber: results["SoldUnitNumber"],
              Project: results["Project"],
              UnitCode: results["UnitCode"],
              Customer: results["Customer"]
            }
          }

          observer.next(trnSoldUnitRequirementActivityModel);
          observer.complete();
        }
      );
    });
  }

  public addSoldUnitRequirementActivity(trnSoldUnitRequirementActivityModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirementActivity/Add", JSON.stringify(trnSoldUnitRequirementActivityModel), this.options).subscribe(
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

  public saveSoldUnitRequirementActivity(trnSoldUnitRequirementActivityModel: TrnSoldUnitRequirementActivityModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirementActivity/Save", JSON.stringify(trnSoldUnitRequirementActivityModel), this.options).subscribe(
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

  public deleteSoldUnitRequirementActivity(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirementActivity/Delete/" + id, this.options).subscribe(
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
