import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstHouseModelModel } from './../../model/mst-house-model.model';

@Injectable({
  providedIn: 'root'
})
export class MstHouseModelService {

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

  public getHouseModelList(): Observable<MstHouseModelModel[]> {
    return new Observable<MstHouseModelModel[]>((observer) => {
      let houseModelArray: MstHouseModelModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstHouseModel/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              houseModelArray.push({
                Id: results[i].Id,
                HouseModelCode: results[i].HouseModelCode,
                HouseModel: results[i].HouseModel,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                TFA: results[i].TFA,
                Price: results[i].Price,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(houseModelArray);
          observer.complete();
        }
      );
    });
  }

  public getHouseModelListPerProject(projectId: number): Observable<MstHouseModelModel[]> {
    return new Observable<MstHouseModelModel[]>((observer) => {
      let houseModelArray: MstHouseModelModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstHouseModel/ListPerProjectId/" + projectId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              houseModelArray.push({
                Id: results[i].Id,
                HouseModelCode: results[i].HouseModelCode,
                HouseModel: results[i].HouseModel,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                TFA: results[i].TFA,
                Price: results[i].Price,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(houseModelArray);
          observer.complete();
        }
      );
    });
  }

  public getHouseModelDetail(id: number): Observable<MstHouseModelModel> {
    return new Observable<MstHouseModelModel>((observer) => {
      let mstHouseModelModel: MstHouseModelModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstHouseModel/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstHouseModelModel = {
              Id: results["Id"],
              HouseModelCode: results["HouseModelCode"],
              HouseModel: results["HouseModel"],
              ProjectId: results["ProjectId"],
              Project: results["Project"],
              TFA: results["TFA"],
              Price: results["Price"],
              IsLocked: results["IsLocked"]
            }
          }

          observer.next(mstHouseModelModel);
          observer.complete();
        }
      );
    });
  }

  public addHouseModel(trnHouseModelModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstHouseModel/Add", JSON.stringify(trnHouseModelModel), this.options).subscribe(
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

  public saveHouseModel(trnHouseModelModel: MstHouseModelModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstHouseModel/Save", JSON.stringify(trnHouseModelModel), this.options).subscribe(
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

  public deleteHouseModel(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstHouseModel/Delete/" + id, this.options).subscribe(
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
