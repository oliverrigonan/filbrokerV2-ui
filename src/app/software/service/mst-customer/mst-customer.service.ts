import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { MstCustomerModel } from './../../model/mst-customer.model';

@Injectable({
  providedIn: 'root'
})
export class MstCustomerService {

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

  public getCustomerList(): Observable<MstCustomerModel[]> {
    return new Observable<MstCustomerModel[]>((observer) => {
      let customerArray: MstCustomerModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstCustomer/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              customerArray.push({
                Id: results[i].Id,
                CustomerCode: results[i].CustomerCode,
                LastName: results[i].LastName,
                FirstName: results[i].FirstName,
                MiddleName: results[i].MiddleName,
                FullName: results[i].FullName,
                Gender: results[i].Gender,
                CivilStatus: results[i].CivilStatus,
                BirthDate: results[i].BirthDate,
                Citizen: results[i].Citizen,
                TIN: results[i].TIN,
                IdType: results[i].IdType,
                IdNumber: results[i].IdNumber,
                Address: results[i].Address,
                City: results[i].City,
                Province: results[i].Province,
                Country: results[i].Country,
                ZipCode: results[i].ZipCode,
                EmailAddress: results[i].EmailAddress,
                TelephoneNumber: results[i].TelephoneNumber,
                MobileNumber: results[i].MobileNumber,
                Employer: results[i].Employer,
                EmployerIndustry: results[i].EmployerIndustry,
                NoOfYearsEmployed: results[i].NoOfYearsEmployed,
                Position: results[i].Position,
                EmploymentStatus: results[i].EmploymentStatus,
                EmployerAddress: results[i].EmployerAddress,
                EmployerCity: results[i].EmployerCity,
                EmployerProvince: results[i].EmployerProvince,
                EmployerCountry: results[i].EmployerCountry,
                EmployerZipCode: results[i].EmployerZipCode,
                EmployerTelephoneNumber: results[i].EmployerTelephoneNumber,
                EmployerMobileNumber: results[i].EmployerMobileNumber,
                Picture: results[i].Picture,
                Attachment1: results[i].Attachment1,
                Attachment2: results[i].Attachment2,
                Attachment3: results[i].Attachment3,
                Attachment4: results[i].Attachment4,
                Attachment5: results[i].Attachment5,
                SpouseLastName: results[i].SpouseLastName,
                SpouseFirstName: results[i].SpouseFirstName,
                SpouseMiddleName: results[i].SpouseMiddleName,
                SpouseBirthDate: results[i].SpouseBirthDate,
                SpouseCitizen: results[i].SpouseCitizen,
                SpouseTIN: results[i].SpouseTIN,
                SpouseEmployer: results[i].SpouseEmployer,
                Remarks: results[i].Remarks,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked
              });
            }
          }

          observer.next(customerArray);
          observer.complete();
        }
      );
    });
  }

  public getCustomerDetail(id: number): Observable<MstCustomerModel> {
    return new Observable<MstCustomerModel>((observer) => {
      let mstCustomerModel: MstCustomerModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/MstCustomer/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            mstCustomerModel = {
              Id: results["Id"],
              CustomerCode: results["CustomerCode"],
              LastName: results["LastName"],
              FirstName: results["FirstName"],
              MiddleName: results["MiddleName"],
              FullName: results["FullName"],
              Gender: results["Gender"],
              CivilStatus: results["CivilStatus"],
              BirthDate: results["BirthDate"],
              Citizen: results["Citizen"],
              TIN: results["TIN"],
              IdType: results["IdType"],
              IdNumber: results["IdNumber"],
              Address: results["Address"],
              City: results["City"],
              Province: results["Province"],
              Country: results["Country"],
              ZipCode: results["ZipCode"],
              EmailAddress: results["EmailAddress"],
              TelephoneNumber: results["TelephoneNumber"],
              MobileNumber: results["MobileNumber"],
              Employer: results["Employer"],
              EmployerIndustry: results["EmployerIndustry"],
              NoOfYearsEmployed: results["NoOfYearsEmployed"],
              Position: results["Position"],
              EmploymentStatus: results["EmploymentStatus"],
              EmployerAddress: results["EmployerAddress"],
              EmployerCity: results["EmployerCity"],
              EmployerProvince: results["EmployerProvince"],
              EmployerCountry: results["EmployerCountry"],
              EmployerZipCode: results["EmployerZipCode"],
              EmployerTelephoneNumber: results["EmployerTelephoneNumber"],
              Picture: results["Picture"],
              EmployerMobileNumber: results["EmployerMobileNumber"],
              SpouseLastName: results["SpouseLastName"],
              SpouseFirstName: results["SpouseFirstName"],
              SpouseMiddleName: results["SpouseMiddleName"],
              SpouseBirthDate: results["SpouseBirthDate"],
              SpouseCitizen: results["SpouseCitizen"],
              SpouseTIN: results["SpouseTIN"],
              SpouseEmployer: results["SpouseEmployer"],
              Remarks: results["Remarks"],
              Attachment1: results["Attachment1"],
              Attachment2: results["Attachment2"],
              Attachment3: results["Attachment3"],
              Attachment4: results["Attachment4"],
              Attachment5: results["Attachment5"],
              Status: results["Status"],
              IsLocked: results["IsLocked"]
            }
          }

          observer.next(mstCustomerModel);
          observer.complete();
        }
      );
    });
  }

  public addCustomer(trnCustomerModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstCustomer/Add", JSON.stringify(trnCustomerModel), this.options).subscribe(
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

  public saveCustomer(trnCustomerModel: MstCustomerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstCustomer/Save", JSON.stringify(trnCustomerModel), this.options).subscribe(
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

  public lockCustomer(trnCustomerModel: MstCustomerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstCustomer/Lock", JSON.stringify(trnCustomerModel), this.options).subscribe(
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

  public unlockCustomer(trnCustomerModel: MstCustomerModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstCustomer/UnLock", JSON.stringify(trnCustomerModel), this.options).subscribe(
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

  public deleteCustomer(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/MstCustomer/Delete/" + id, this.options).subscribe(
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

  public uploadCustomerImage(fileToUpload: any): Observable<[boolean, string]> {
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

  public uploadCustomerAttachment(fileToUpload: any): Observable<[boolean, string]> {
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
