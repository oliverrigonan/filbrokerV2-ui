import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstBrokerModel } from './../../model/mst-broker.model';

@Injectable({
  providedIn: 'root'
})
export class MstBrokerService {

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

  public getBrokerList(): Observable<MstBrokerModel[]> {
    return new Observable<MstBrokerModel[]>((observer) => {
      let brokerArray: MstBrokerModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstBroker/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              brokerArray.push({
                Id: results[i].Id,
                BrokerCode: results[i].BrokerCode,
                LastName: results[i].LastName,
                FirstName: results[i].FirstName,
                MiddleName: results[i].MiddleName,
                FullName: results[i].FullName,
                LicenseNumber: results[i].LicenseNumber,
                LicenseNumberValidUntil: results[i].LicenseNumberValidUntil,
                BirthDate: results[i].BirthDate,
                CivilStatus: results[i].CivilStatus,
                Gender: results[i].Gender,
                Address: results[i].Address,
                TelephoneNumber: results[i].TelephoneNumber,
                MobileNumber: results[i].MobileNumber,
                Religion: results[i].Religion,
                EmailAddress: results[i].EmailAddress,
                Facebook: results[i].Facebook,
                TIN: results[i].TIN,
                HLURBRegistrationNumber: results[i].HLURBRegistrationNumber,
                RealtyFirm: results[i].RealtyFirm,
                RealtyFirmAddress: results[i].RealtyFirmAddress,
                RealtyFirmTelephoneNumber: results[i].RealtyFirmTelephoneNumber,
                RealtyFirmMobileNumber: results[i].RealtyFirmMobileNumber,
                RealtyFirmFaxNumber: results[i].RealtyFirmFaxNumber,
                RealtyFirmEmailAddress: results[i].RealtyFirmEmailAddress,
                RealtyFirmWebsite: results[i].RealtyFirmWebsite,
                RealtyFirmTIN: results[i].RealtyFirmTIN,
                RealtyFirmLicenseNumber: results[i].RealtyFirmLicenseNumber,
                RealtyFirmLicenseNumberValidUntil: results[i].RealtyFirmLicenseNumberValidUntil,
                RealtyFormHLURBRegistrationNumber: results[i].RealtyFormHLURBRegistrationNumber,
                Organization: results[i].Organization,
                Remarks: results[i].Remarks,
                Picture: results[i].Picture,
                Attachment1: results[i].Attachment1,
                Attachment2: results[i].Attachment2,
                Attachment3: results[i].Attachment3,
                Attachment4: results[i].Attachment4,
                Attachment5: results[i].Attachment5,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                Type: results[i].Type
              });
            }
          }

          observer.next(brokerArray);
          observer.complete();
        }
      );
    });
  }

  public getBrokerDetail(id: number): Observable<MstBrokerModel> {
    return new Observable<MstBrokerModel>((observer) => {
      let mstBrokerModel: MstBrokerModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstBroker/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstBrokerModel = {
              Id: results["Id"],
              BrokerCode: results["BrokerCode"],
              LastName: results["LastName"],
              FirstName: results["FirstName"],
              MiddleName: results["MiddleName"],
              FullName: results["FullName"],
              LicenseNumber: results["LicenseNumber"],
              LicenseNumberValidUntil: results["LicenseNumberValidUntil"],
              BirthDate: results["BirthDate"],
              CivilStatus: results["CivilStatus"],
              Gender: results["Gender"],
              Address: results["Address"],
              TelephoneNumber: results["TelephoneNumber"],
              MobileNumber: results["MobileNumber"],
              Religion: results["Religion"],
              EmailAddress: results["EmailAddress"],
              Facebook: results["Facebook"],
              TIN: results["TIN"],
              HLURBRegistrationNumber: results["HLURBRegistrationNumber"],
              RealtyFirm: results["RealtyFirm"],
              RealtyFirmAddress: results["RealtyFirmAddress"],
              RealtyFirmTelephoneNumber: results["RealtyFirmTelephoneNumber"],
              RealtyFirmMobileNumber: results["RealtyFirmMobileNumber"],
              RealtyFirmFaxNumber: results["RealtyFirmFaxNumber"],
              RealtyFirmEmailAddress: results["RealtyFirmEmailAddress"],
              RealtyFirmWebsite: results["RealtyFirmWebsite"],
              RealtyFirmTIN: results["RealtyFirmTIN"],
              RealtyFirmLicenseNumber: results["RealtyFirmLicenseNumber"],
              RealtyFirmLicenseNumberValidUntil: results["RealtyFirmLicenseNumberValidUntil"],
              RealtyFormHLURBRegistrationNumber: results["RealtyFormHLURBRegistrationNumber"],
              Organization: results["Organization"],
              Remarks: results["Remarks"],
              Picture: results["Picture"],
              Attachment1: results["Attachment1"],
              Attachment2: results["Attachment2"],
              Attachment3: results["Attachment3"],
              Attachment4: results["Attachment4"],
              Attachment5: results["Attachment5"],
              Status: results["Status"],
              IsLocked: results["IsLocked"],
              Type: results["Type"]
            }
          }

          observer.next(mstBrokerModel);
          observer.complete();
        }
      );
    });
  }

  public addBroker(trnBrokerModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstBroker/Add", JSON.stringify(trnBrokerModel), this.options).subscribe(
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

  public saveBroker(trnBrokerModel: MstBrokerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstBroker/Save", JSON.stringify(trnBrokerModel), this.options).subscribe(
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

  public lockBroker(trnBrokerModel: MstBrokerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstBroker/Lock", JSON.stringify(trnBrokerModel), this.options).subscribe(
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

  public unlockBroker(trnBrokerModel: MstBrokerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstBroker/UnLock", JSON.stringify(trnBrokerModel), this.options).subscribe(
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

  public deleteBroker(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstBroker/Delete/" + id, this.options).subscribe(
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

  public uploadBrokerAttachment(fileToUpload: any): Observable<[boolean, string]> {
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
