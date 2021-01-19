import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnSoldUnitCoOwnerModel } from './../../model/trn-sold-unit-co-owner.model';

@Injectable({
  providedIn: 'root'
})
export class TrnSoldUnitCoOwnerService {

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

  public getSoldUnitCoOwnerListPerSoldUnit(soldUnitId: number): Observable<TrnSoldUnitCoOwnerModel[]> {
    return new Observable<TrnSoldUnitCoOwnerModel[]>((observer) => {
      let soldUnitCoOwnerArray: TrnSoldUnitCoOwnerModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/trnSoldUnitOwner/list/" + soldUnitId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitCoOwnerArray.push({
                Id: results[i].Id,
                SoldUnitId: results[i].SoldUnitId,
                CustomerId: results[i].CustomerId,
                CustomerCode: results[i].CustomerCode,
                Customer: results[i].Customer,
                Address: results[i].Address
              });
            }
          }

          observer.next(soldUnitCoOwnerArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitCoOwnerDetail(id: number): Observable<TrnSoldUnitCoOwnerModel> {
    return new Observable<TrnSoldUnitCoOwnerModel>((observer) => {
      let trnSoldUnitCoOwnerModel: TrnSoldUnitCoOwnerModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/trnSoldUnitOwner/detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnSoldUnitCoOwnerModel = {
              Id: results["Id"],
              SoldUnitId: results["SoldUnitId"],
              CustomerId: results["CustomerId"],
              CustomerCode: results["CustomerCode"],
              Customer: results["Customer"],
              Address: results["Address"]
            }
          }

          observer.next(trnSoldUnitCoOwnerModel);
          observer.complete();
        }
      );
    });
  }

  public addSoldUnitCoOwner(trnSoldUnitCoOwnerModel: TrnSoldUnitCoOwnerModel): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/trnSoldUnitOwner/add", JSON.stringify(trnSoldUnitCoOwnerModel), this.options).subscribe(
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

  public saveSoldUnitCoOwner(trnSoldUnitCoOwnerModel: TrnSoldUnitCoOwnerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/trnSoldUnitOwner/update", JSON.stringify(trnSoldUnitCoOwnerModel), this.options).subscribe(
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

  public deleteSoldUnitCoOwner(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/trnSoldUnitOwner/delete/" + id, this.options).subscribe(
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
