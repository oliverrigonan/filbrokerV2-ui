import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnSoldUnitRequirementModel } from './../../model/trn-sold-unit-requirement.model';

@Injectable({
  providedIn: 'root'
})
export class TrnSoldUnitRequirementService {

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

  public getSoldUnitRequirementList(): Observable<TrnSoldUnitRequirementModel[]> {
    return new Observable<TrnSoldUnitRequirementModel[]>((observer) => {
      let soldUnitRequirementArray: TrnSoldUnitRequirementModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirement/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitRequirementArray.push({
                Id: results[i].Id,
                SoldUnitId: results[i].SoldUnitId,
                ChecklistRequirementId: results[i].ChecklistRequirementId,
                ChecklistRequirement: results[i].ChecklistRequirement,
                ChecklistRequirementNo: results[i].ChecklistRequirementNo,
                ChecklistCategory: results[i].ChecklistCategory,
                ChecklistType: results[i].ChecklistType,
                ChecklistWithAttachments: results[i].ChecklistWithAttachments,
                Attachment1: results[i].Attachment1,
                Attachment2: results[i].Attachment2,
                Attachment3: results[i].Attachment3,
                Attachment4: results[i].Attachment4,
                Attachment5: results[i].Attachment5,
                Remarks: results[i].Remarks,
                Status: results[i].Status,
                StatusDate: results[i].StatusDate
              });
            }
          }

          observer.next(soldUnitRequirementArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitRequirementListPerSoldUnit(soldUnitId: number): Observable<TrnSoldUnitRequirementModel[]> {
    return new Observable<TrnSoldUnitRequirementModel[]>((observer) => {
      let soldUnitRequirementArray: TrnSoldUnitRequirementModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirement/ListPerUnitSold/" + soldUnitId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitRequirementArray.push({
                Id: results[i].Id,
                SoldUnitId: results[i].SoldUnitId,
                ChecklistRequirementId: results[i].ChecklistRequirementId,
                ChecklistRequirement: results[i].ChecklistRequirement,
                ChecklistRequirementNo: results[i].ChecklistRequirementNo,
                ChecklistCategory: results[i].ChecklistCategory,
                ChecklistType: results[i].ChecklistType,
                ChecklistWithAttachments: results[i].ChecklistWithAttachments,
                Attachment1: results[i].Attachment1,
                Attachment2: results[i].Attachment2,
                Attachment3: results[i].Attachment3,
                Attachment4: results[i].Attachment4,
                Attachment5: results[i].Attachment5,
                Remarks: results[i].Remarks,
                Status: results[i].Status,
                StatusDate: results[i].StatusDate
              });
            }
          }

          observer.next(soldUnitRequirementArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitRequirementDetail(id: number): Observable<TrnSoldUnitRequirementModel> {
    return new Observable<TrnSoldUnitRequirementModel>((observer) => {
      let trnSoldUnitRequirementModel: TrnSoldUnitRequirementModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirement/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnSoldUnitRequirementModel = {
              Id: results["Id"],
              SoldUnitId: results["SoldUnitId"],
              ChecklistRequirementId: results["ChecklistRequirementId"],
              ChecklistRequirement: results["ChecklistRequirement"],
              ChecklistRequirementNo: results["ChecklistRequirementNo"],
              ChecklistCategory: results["ChecklistCategory"],
              ChecklistType: results["ChecklistType"],
              ChecklistWithAttachments: results["ChecklistWithAttachments"],
              Attachment1: results["Attachment1"],
              Attachment2: results["Attachment2"],
              Attachment3: results["Attachment3"],
              Attachment4: results["Attachment4"],
              Attachment5: results["Attachment5"],
              Remarks: results["Remarks"],
              Status: results["Status"],
              StatusDate: results["StatusDate"]
            }
          }

          observer.next(trnSoldUnitRequirementModel);
          observer.complete();
        }
      );
    });
  }

  public addSoldUnitRequirement(soldUnitId: number, checklistId: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirement/ListNewTrnSoldUnitRequirements/" + soldUnitId + "/" + checklistId, this.options).subscribe(
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

  public saveSoldUnitRequirement(trnSoldUnitRequirementModel: TrnSoldUnitRequirementModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnitRequirement/Save", JSON.stringify(trnSoldUnitRequirementModel), this.options).subscribe(
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

  public uploadSoldUnitRequirementAttachment(fileToUpload: any): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      let imageOptions: any = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        })
      };

      let input = new FormData();
      input.append("file", fileToUpload);

      this.httpClient.post(this.defaultAPIURLHost + "/api/Blob/Upload", input, imageOptions).subscribe(
        response => {
          observer.next([true, response[0]["FileUrl"].toString()]);
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
