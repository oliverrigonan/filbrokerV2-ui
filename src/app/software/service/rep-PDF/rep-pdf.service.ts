import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class RepPDFService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }),
    responseType: "blob"
  };

  public printPdfCustomer(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/Customer/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfBroker(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/Broker/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfChecklist(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/Checklist/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfSoldUnitProposal(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/SoldUnitProposal/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfSoldUnitContract(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/SoldUnitContract/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfSoldUnitEquitySchedule(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/SoldUnitEquitySchedule/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfBuyersUndertaking(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/BuyersUndertaking/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfReservationAgreement(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/ReservationAgreement/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfComputationSheet(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/ComputationSheet/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }

  public printPdfStatementOfAccount(id: number): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      this.httpClient.get(this.defaultAPIURLHost + "/api/PDF/StatementOfAccount/" + id, this.options).subscribe(
        response => {
          let results = new Blob([response], { type: 'application/pdf' });

          observer.next(results);
          observer.complete();
        }
      );
    });
  }
}
