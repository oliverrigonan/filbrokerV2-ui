import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnCollectionModel } from './../../model/trn-collection.model';

@Injectable({
  providedIn: 'root'
})
export class TrnCollectionService {

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

  public getCollectionListByDateRange(dateStart: string, dateEnd: string): Observable<TrnCollectionModel[]> {
    return new Observable<TrnCollectionModel[]>((observer) => {
      let collectionArray: TrnCollectionModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnCollection/CollectionFillterByDate/" + dateStart + "/" + dateEnd, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              collectionArray.push({
                Id: results[i].Id,
                CollectionNumber: results[i].CollectionNumber,
                CollectionDate: new Date(results[i].CollectionDate).toLocaleDateString(),
                CustomerId: results[i].CustomerId,
                Customer: results[i].Customer,
                Particulars: results[i].Particulars,
                PreparedBy: results[i].PreparedBy,
                CheckedBy: results[i].CheckedBy,
                ApprovedBy: results[i].ApprovedBy,
                UpdatedBy: results[i].UpdatedBy,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(collectionArray);
          observer.complete();
        }
      );
    });
  }

  public getCollectionDetail(id: number): Observable<TrnCollectionModel> {
    return new Observable<TrnCollectionModel>((observer) => {
      let trnCollectionModel: TrnCollectionModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnCollection/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnCollectionModel = {
              Id: results["Id"],
              CollectionNumber: results["CollectionNumber"],
              CollectionDate: results["CollectionDate"],
              CustomerId: results["CustomerId"],
              Customer: results["Customer"],
              Particulars: results["Particulars"],
              PreparedBy: results["PreparedBy"],
              CheckedBy: results["CheckedBy"],
              ApprovedBy: results["ApprovedBy"],
              UpdatedBy: results["UpdatedBy"],
              IsLocked: results["IsLocked"]
            }
          }

          observer.next(trnCollectionModel);
          observer.complete();
        }
      );
    });
  }

  public addCollection(trnCollectionModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnCollection/Add", JSON.stringify(trnCollectionModel), this.options).subscribe(
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

  public saveCollection(trnCollectionModel: TrnCollectionModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCollection/Save", JSON.stringify(trnCollectionModel), this.options).subscribe(
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

  public lockCollection(trnCollectionModel: TrnCollectionModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCollection/Lock", JSON.stringify(trnCollectionModel), this.options).subscribe(
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

  public unlockCollection(trnCollectionModel: TrnCollectionModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnCollection/UnLock", JSON.stringify(trnCollectionModel), this.options).subscribe(
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

  public deleteCollection(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnCollection/delete/" + id, this.options).subscribe(
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
