import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnCommissionRequestModel } from './../../model/trn-commission-request.model';

@Injectable({
  providedIn: 'root'
})
export class TrnCommissionRequestService {

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

  public getCommissionRequestListByDateRange(dateStart: string, dateEnd: string): Observable<TrnCommissionRequestModel[]> {
    return new Observable<TrnCommissionRequestModel[]>((observer) => {
      let commissionRequestArray: TrnCommissionRequestModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnCommissionRequest/ListPerDates/" + dateStart + "/" + dateEnd, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              commissionRequestArray.push({
                Id: results[i].Id,
                CommissionRequestNumber: results[i].CommissionRequestNumber,
                CommissionRequestDate: results[i].CommissionRequestDate,
                BrokerId: results[i].BrokerId,
                Broker: results[i].Broker,
                SoldUnitId: results[i].SoldUnitId,
                SoldUnit: results[i].SoldUnit,
                CommissionNumber: results[i].CommissionNumber,
                Amount: results[i].Amount,
                Remarks: results[i].Remarks,
                PreparedBy: results[i].PreparedBy,
                PrepearedByUser: results[i].PrepearedByUser,
                CheckedBy: results[i].CheckedBy,
                CheckedByUser: results[i].CheckedByUser,
                ApprovedBy: results[i].ApprovedBy,
                ApprovedByUser: results[i].ApprovedByUser,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                CreatedBy: results[i].CreatedBy,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedBy: results[i].UpdatedBy,
                UpdatedDateTime: results[i].UpdatedDateTime
              });
            }
          }

          observer.next(commissionRequestArray);
          observer.complete();
        }
      );
    });
  }

  public getCommissionRequestDetail(id: number): Observable<TrnCommissionRequestModel> {
    return new Observable<TrnCommissionRequestModel>((observer) => {
      let trnCommissionRequestModel: TrnCommissionRequestModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnCommissionRequest/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnCommissionRequestModel = {
              Id: results["Id"],
              CommissionRequestNumber: results["CommissionRequestNumber"],
              CommissionRequestDate: results["CommissionRequestDate"],
              BrokerId: results["BrokerId"],
              Broker: results["Broker"],
              SoldUnitId: results["SoldUnitId"],
              SoldUnit: results["SoldUnit"],
              CommissionNumber: results["CommissionNumber"],
              Amount: results["Amount"],
              Remarks: results["Remarks"],
              PreparedBy: results["PreparedBy"],
              PrepearedByUser: results["PrepearedByUser"],
              CheckedBy: results["CheckedBy"],
              CheckedByUser: results["CheckedByUser"],
              ApprovedBy: results["ApprovedBy"],
              ApprovedByUser: results["ApprovedByUser"],
              Status: results["Status"],
              IsLocked: results["IsLocked"],
              CreatedBy: results["CreatedBy"],
              CreatedDateTime: results["CreatedDateTime"],
              UpdatedBy: results["UpdatedBy"],
              UpdatedDateTime: results["UpdatedDateTime"]
            }
          }

          observer.next(trnCommissionRequestModel);
          observer.complete();
        }
      );
    });
  }

  public addCommissionRequest(trnCommissionRequestModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnCommissionRequest/Add", JSON.stringify(trnCommissionRequestModel), this.options).subscribe(
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

  public saveCommissionRequest(trnCommissionRequestModel: TrnCommissionRequestModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCommissionRequest/Save", JSON.stringify(trnCommissionRequestModel), this.options).subscribe(
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

  public lockCommissionRequest(trnCommissionRequestModel: TrnCommissionRequestModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCommissionRequest/Lock", JSON.stringify(trnCommissionRequestModel), this.options).subscribe(
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

  public unlockCommissionRequest(trnCommissionRequestModel: TrnCommissionRequestModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCommissionRequest/UnLock", JSON.stringify(trnCommissionRequestModel), this.options).subscribe(
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

  public deleteCommissionRequest(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnCommissionRequest/delete/" + id, this.options).subscribe(
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
