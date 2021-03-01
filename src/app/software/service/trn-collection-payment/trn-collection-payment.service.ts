import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnCollectionPaymentModel } from './../../model/trn-collection-payment.model';

@Injectable({
  providedIn: 'root'
})
export class TrnCollectionPaymentService {

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

  public getCollectionPaymentListPerCollection(collectionId: number): Observable<TrnCollectionPaymentModel[]> {
    return new Observable<TrnCollectionPaymentModel[]>((observer) => {
      let houseModelArray: TrnCollectionPaymentModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnCollectionPayment/CollectionPayment/" + collectionId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              houseModelArray.push({
                Id: results[i].Id,
                CollectionId: results[i].CollectionId,
                CollectionDate: "",
                CollectionManualNumber: "",
                CollectionCustomer: "",
                CollectionPreparedBy: "",
                SoldUnitId: results[i].SoldUnitId,
                SoldUnit: results[i].SoldUnit,
                SoldUnitEquityScheduleId: results[i].SoldUnitEquityScheduleId,
                SoldUnitEquitySchedule: results[i].SoldUnitEquitySchedule,
                Project: results[i].Project,
                PayType: results[i].PayType,
                Amount: results[i].Amount,
                Agent: results[i].Agent,
                Broker: results[i].Broker,
                CheckNumber: results[i].CheckNumber,
                CheckDate: results[i].CheckDate,
                CheckBank: results[i].CheckBank,
                OtherInformation: results[i].OtherInformation,
              });
            }
          }

          observer.next(houseModelArray);
          observer.complete();
        }
      );
    });
  }

  public getCollectionPaymentDetail(id: number): Observable<TrnCollectionPaymentModel> {
    return new Observable<TrnCollectionPaymentModel>((observer) => {
      let mstCollectionPaymentModel: TrnCollectionPaymentModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnCollectionPayment/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstCollectionPaymentModel = {
              Id: results["Id"],
              CollectionId: results["CollectionId"],
              CollectionDate: "",
              CollectionManualNumber: "",
              CollectionCustomer: "",
              CollectionPreparedBy: "",
              SoldUnitId: results["SoldUnitId"],
              SoldUnit: results["SoldUnit"],
              SoldUnitEquityScheduleId: results["SoldUnitEquityScheduleId"],
              SoldUnitEquitySchedule: results["SoldUnitEquitySchedule"],
              Project: results["Project"],
              PayType: results["PayType"],
              Amount: results["Amount"],
              Agent: results["Agent"],
              Broker: results["Broker"],
              CheckNumber: results["CheckNumber"],
              CheckDate: results["CheckDate"],
              CheckBank: results["CheckBank"],
              OtherInformation: results["OtherInformation"]
            }
          }

          observer.next(mstCollectionPaymentModel);
          observer.complete();
        }
      );
    });
  }

  public addCollectionPayment(trnCollectionPaymentModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnCollectionPayment/Add", JSON.stringify(trnCollectionPaymentModel), this.options).subscribe(
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

  public saveCollectionPayment(trnCollectionPaymentModel: TrnCollectionPaymentModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCollectionPayment/Update", JSON.stringify(trnCollectionPaymentModel), this.options).subscribe(
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

  public deleteCollectionPayment(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnCollectionPayment/Delete/" + id, this.options).subscribe(
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
