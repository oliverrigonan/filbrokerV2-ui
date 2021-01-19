import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstUnitModel } from './../../model/mst-unit.model';

@Injectable({
  providedIn: 'root'
})
export class MstUnitService {

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

  public getUnitList(): Observable<MstUnitModel[]> {
    return new Observable<MstUnitModel[]>((observer) => {
      let unitArray: MstUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUnit/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              unitArray.push({
                Id: results[i].Id,
                UnitCode: results[i].UnitCode,
                Block: results[i].Block,
                Lot: results[i].Lot,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                HouseModelId: results[i].HouseModelId,
                HouseModel: results[i].HouseModel,
                TLA: results[i].TLA,
                TFA: results[i].TFA,
                Price: results[i].Price,
                MiscellaneousFeeRate: results[i].MiscellaneousFeeRate,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATRate: results[i].VATRate,
                VATAmount: results[i].VATAmount,
                TSP: results[i].TSP,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(unitArray);
          observer.complete();
        }
      );
    });
  }

  public getUnitListPerProject(projectId: number): Observable<MstUnitModel[]> {
    return new Observable<MstUnitModel[]>((observer) => {
      let unitArray: MstUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUnit/ListPerProjectId/" + projectId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              unitArray.push({
                Id: results[i].Id,
                UnitCode: results[i].UnitCode,
                Block: results[i].Block,
                Lot: results[i].Lot,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                HouseModelId: results[i].HouseModelId,
                HouseModel: results[i].HouseModel,
                TLA: results[i].TLA,
                TFA: results[i].TFA,
                Price: results[i].Price,
                MiscellaneousFeeRate: results[i].MiscellaneousFeeRate,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATRate: results[i].VATRate,
                VATAmount: results[i].VATAmount,
                TSP: results[i].TSP,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(unitArray);
          observer.complete();
        }
      );
    });
  }

  public getUnitListOpenPerProject(projectId: number): Observable<MstUnitModel[]> {
    return new Observable<MstUnitModel[]>((observer) => {
      let unitArray: MstUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUnit/OpenListPerProjectId/" + projectId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              unitArray.push({
                Id: results[i].Id,
                UnitCode: results[i].UnitCode,
                Block: results[i].Block,
                Lot: results[i].Lot,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                HouseModelId: results[i].HouseModelId,
                HouseModel: results[i].HouseModel,
                TLA: results[i].TLA,
                TFA: results[i].TFA,
                Price: results[i].Price,
                MiscellaneousFeeRate: results[i].MiscellaneousFeeRate,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATRate: results[i].VATRate,
                VATAmount: results[i].VATAmount,
                TSP: results[i].TSP,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(unitArray);
          observer.complete();
        }
      );
    });
  }

  public getUnitDetail(id: number): Observable<MstUnitModel> {
    return new Observable<MstUnitModel>((observer) => {
      let mstUnitModel: MstUnitModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstUnit/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstUnitModel = {
              Id: results["Id"],
              UnitCode: results["UnitCode"],
              Block: results["Block"],
              Lot: results["Lot"],
              ProjectId: results["ProjectId"],
              Project: results["Project"],
              HouseModelId: results["HouseModelId"],
              HouseModel: results["HouseModel"],
              TLA: results["TLA"],
              TFA: results["TFA"],
              Price: results["Price"],
              MiscellaneousFeeRate: results["MiscellaneousFeeRate"],
              MiscellaneousFeeAmount: results["MiscellaneousFeeAmount"],
              VATRate: results["VATRate"],
              VATAmount: results["VATAmount"],
              TSP: results["TSP"],
              Status: results["Status"],
              IsLocked: results["IsLocked"]
            }
          }

          observer.next(mstUnitModel);
          observer.complete();
        }
      );
    });
  }

  public addUnit(trnUnitModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstUnit/Add", JSON.stringify(trnUnitModel), this.options).subscribe(
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

  public saveUnit(trnUnitModel: MstUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUnit/Save", JSON.stringify(trnUnitModel), this.options).subscribe(
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

  public lockUnit(trnUnitModel: MstUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUnit/Lock", JSON.stringify(trnUnitModel), this.options).subscribe(
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

  public unlockUnit(trnUnitModel: MstUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstUnit/UnLock", JSON.stringify(trnUnitModel), this.options).subscribe(
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

  public deleteUnit(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstUnit/delete/" + id, this.options).subscribe(
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
