import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnSoldUnitEquityScheduleModel } from './../../model/trn-sold-unit-equity-schedule.model';


@Injectable({
  providedIn: 'root'
})
export class TrnSoldUnitEquityScheduleService {

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
  public getTrnSoldUnitEquitySchedule(soldUnitId: number): Observable<TrnSoldUnitEquityScheduleModel[]> {
    return new Observable<TrnSoldUnitEquityScheduleModel[]>((observer) => {
      let soldUnitEquityScheduleArray: TrnSoldUnitEquityScheduleModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitEquitySchedule/ListPerUnitSold/" + soldUnitId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitEquityScheduleArray.push({
                Id: results[i].Id,
                SoldUnitId: results[i].SoldUnitId,
                SoldUnitNumber: results[i].SoldUnitNumber,
                SoldUnitCustomer: results[i].SoldUnitCustomer,
                PaymentDate: results[i].PaymentDate,
                Amortization: results[i].Amortization,
                CheckNumber: results[i].CheckNumber,
                CheckDate: results[i].CheckDate,
                CheckBank: results[i].CheckBank,
                Remarks: results[i].Remarks,
                PaidAmount: results[i].PaidAmount,
                BalanceAmount: results[i].BalanceAmount
              });
            }
          }

          observer.next(soldUnitEquityScheduleArray);
          observer.complete();
        }
      );
    });
  }
  public getSoldUnitEquityScheduleDetail(id: number): Observable<TrnSoldUnitEquityScheduleModel> {
    return new Observable<TrnSoldUnitEquityScheduleModel>((observer) => {
      let soldUnitEquityScheduleModel: TrnSoldUnitEquityScheduleModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitEquitySchedule/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            soldUnitEquityScheduleModel = {
              Id: results["Id"],
              SoldUnitId: results["SoldUnitId"],
              SoldUnitNumber: results["SoldUnitNumber"],
              SoldUnitCustomer: results["SoldUnitCustomer"],
              PaymentDate: results["PaymentDate"],
              Amortization: results["Amortization"],
              CheckNumber: results["CheckNumber"],
              CheckDate: results["CheckDate"],
              CheckBank: results["CheckBank"],
              Remarks: results["Remarks"],
              PaidAmount: results["PaidAmount"],
              BalanceAmount: results["BalanceAmount"]
            }
          }

          observer.next(soldUnitEquityScheduleModel);
          observer.complete();
        }
      );
    });
  }

  public addSoldUnitEquitySchedule(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitEquitySchedule/ListNewTrnSoldUnitEquitySchedule/" + id, this.options).subscribe(
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

  public saveSoldUnitEquitySchedule(TrnSoldUnitEquitySchedule: TrnSoldUnitEquityScheduleModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnitEquitySchedule/Save", JSON.stringify(TrnSoldUnitEquitySchedule), this.options).subscribe(
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

  public importSoldUnitEquitySchedule(id: number, trnSoldUnitEquitySchedule: TrnSoldUnitEquityScheduleModel[]): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnSoldUnitEquitySchedule/ImportNewTrnSoldUnitEquitySchedule/" + id, JSON.stringify(trnSoldUnitEquitySchedule), this.options).subscribe(
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
}
