import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';

@Injectable({
  providedIn: 'root'
})
export class TrnSoldUnitService {

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

  public getSoldUnitList(): Observable<TrnSoldUnitModel[]> {
    return new Observable<TrnSoldUnitModel[]>((observer) => {
      let soldUnitArray: TrnSoldUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnit/List", this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitArray.push({
                Id: results[i].Id,
                SoldUnitNumber: results[i].SoldUnitNumber,
                SoldUnitDate: results[i].SoldUnitDate,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                UnitId: results[i].UnitId,
                Unit: results[i].Unit,
                CustomerId: results[i].CustomerId,
                Customer: results[i].Customer,
                BrokerId: results[i].BrokerId,
                Broker: results[i].Broker,
                Agent: results[i].Agent,
                BrokerCoordinator: results[i].BrokerCoordinator,
                ChecklistId: results[i].ChecklistId,
                Checklist: results[i].Checklist,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATAmount: results[i].VATAmount,
                PriceDiscount: results[i].PriceDiscount,
                Price: results[i].Price,
                TCP: results[i].TCP,
                TSP: results[i].TSP,
                DownpaymentValue: results[i].DownpaymentValue,
                DownpaymentPercent: results[i].DownpaymentPercent,
                EquityValue: results[i].EquityValue,
                EquityPercent: results[i].EquityPercent,
                EquitySpotPayment1: results[i].EquitySpotPayment1,
                EquitySpotPayment2: results[i].EquitySpotPayment2,
                EquitySpotPayment3: results[i].EquitySpotPayment3,
                EquitySpotPayment1Pos: results[i].EquitySpotPayment1Pos,
                EquitySpotPayment2Pos: results[i].EquitySpotPayment2Pos,
                EquitySpotPayment3Pos: results[i].EquitySpotPayment3Pos,
                Discount: results[i].Discount,
                DiscountedEquity: results[i].DiscountedEquity,
                Reservation: results[i].Reservation,
                NetEquity: results[i].NetEquity,
                NetEquityBalance: results[i].NetEquityBalance,
                NetEquityInterest: results[i].NetEquityInterest,
                NetEquityNoOfPayments: results[i].NetEquityNoOfPayments,
                NetEquityAmortization: results[i].NetEquityAmortization,
                Balance: results[i].Balance,
                BalanceInterest: results[i].BalanceInterest,
                BalanceNoOfPayments: results[i].BalanceNoOfPayments,
                BalanceAmortization: results[i].BalanceAmortization,
                TotalInvestment: results[i].TotalInvestment,
                PaymentOptions: results[i].PaymentOptions,
                Financing: results[i].Financing,
                Remarks: results[i].Remarks,
                FinancingType: results[i].FinancingType,
                PreparedBy: results[i].PreparedBy,
                PreparedByUser: results[i].PreparedByUser,
                CheckedBy: results[i].CheckedBy,
                CheckedByUser: results[i].CheckedByUser,
                ApprovedBy: results[i].ApprovedBy,
                ApprovedByUser: results[i].ApprovedByUser,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                CreatedBy: results[i].CreatedBy,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedBy: results[i].UpdatedBy,
                UpdatedDateTime: results[i].UpdatedDateTime,
                PriceBalance: results[i].PriceBalance,
                PricePayment: results[i].PricePayment
              });
            }
          }

          observer.next(soldUnitArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitListByDateRange(dateStart: string, dateEnd: string): Observable<TrnSoldUnitModel[]> {
    return new Observable<TrnSoldUnitModel[]>((observer) => {
      let soldUnitArray: TrnSoldUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnit/ListPerDates/" + dateStart + "/" + dateEnd, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitArray.push({
                Id: results[i].Id,
                SoldUnitNumber: results[i].SoldUnitNumber,
                SoldUnitDate: results[i].SoldUnitDate,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                UnitId: results[i].UnitId,
                Unit: results[i].Unit,
                CustomerId: results[i].CustomerId,
                Customer: results[i].Customer,
                BrokerId: results[i].BrokerId,
                Broker: results[i].Broker,
                Agent: results[i].Agent,
                BrokerCoordinator: results[i].BrokerCoordinator,
                ChecklistId: results[i].ChecklistId,
                Checklist: results[i].Checklist,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATAmount: results[i].VATAmount,
                PriceDiscount: results[i].PriceDiscount,
                Price: results[i].Price,
                TCP: results[i].TCP,
                TSP: results[i].TSP,
                DownpaymentValue: results[i].DownpaymentValue,
                DownpaymentPercent: results[i].DownpaymentPercent,
                EquityValue: results[i].EquityValue,
                EquityPercent: results[i].EquityPercent,
                EquitySpotPayment1: results[i].EquitySpotPayment1,
                EquitySpotPayment2: results[i].EquitySpotPayment2,
                EquitySpotPayment3: results[i].EquitySpotPayment3,
                EquitySpotPayment1Pos: results[i].EquitySpotPayment1Pos,
                EquitySpotPayment2Pos: results[i].EquitySpotPayment2Pos,
                EquitySpotPayment3Pos: results[i].EquitySpotPayment3Pos,
                Discount: results[i].Discount,
                DiscountedEquity: results[i].DiscountedEquity,
                Reservation: results[i].Reservation,
                NetEquity: results[i].NetEquity,
                NetEquityBalance: results[i].NetEquityBalance,
                NetEquityInterest: results[i].NetEquityInterest,
                NetEquityNoOfPayments: results[i].NetEquityNoOfPayments,
                NetEquityAmortization: results[i].NetEquityAmortization,
                Balance: results[i].Balance,
                BalanceInterest: results[i].BalanceInterest,
                BalanceNoOfPayments: results[i].BalanceNoOfPayments,
                BalanceAmortization: results[i].BalanceAmortization,
                TotalInvestment: results[i].TotalInvestment,
                PaymentOptions: results[i].PaymentOptions,
                Financing: results[i].Financing,
                Remarks: results[i].Remarks,
                FinancingType: results[i].FinancingType,
                PreparedBy: results[i].PreparedBy,
                PreparedByUser: results[i].PreparedByUser,
                CheckedBy: results[i].CheckedBy,
                CheckedByUser: results[i].CheckedByUser,
                ApprovedBy: results[i].ApprovedBy,
                ApprovedByUser: results[i].ApprovedByUser,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                CreatedBy: results[i].CreatedBy,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedBy: results[i].UpdatedBy,
                UpdatedDateTime: results[i].UpdatedDateTime,
                PriceBalance: results[i].PriceBalance,
                PricePayment: results[i].PricePayment
              });
            }
          }

          observer.next(soldUnitArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitListByCustomer(customerId: number): Observable<TrnSoldUnitModel[]> {
    return new Observable<TrnSoldUnitModel[]>((observer) => {
      let soldUnitArray: TrnSoldUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnit/ListPerCustomer/" + customerId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitArray.push({
                Id: results[i].Id,
                SoldUnitNumber: results[i].SoldUnitNumber,
                SoldUnitDate: results[i].SoldUnitDate,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                UnitId: results[i].UnitId,
                Unit: results[i].Unit,
                CustomerId: results[i].CustomerId,
                Customer: results[i].Customer,
                BrokerId: results[i].BrokerId,
                Broker: results[i].Broker,
                Agent: results[i].Agent,
                BrokerCoordinator: results[i].BrokerCoordinator,
                ChecklistId: results[i].ChecklistId,
                Checklist: results[i].Checklist,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATAmount: results[i].VATAmount,
                PriceDiscount: results[i].PriceDiscount,
                Price: results[i].Price,
                TCP: results[i].TCP,
                TSP: results[i].TSP,
                DownpaymentValue: results[i].DownpaymentValue,
                DownpaymentPercent: results[i].DownpaymentPercent,
                EquityValue: results[i].EquityValue,
                EquityPercent: results[i].EquityPercent,
                EquitySpotPayment1: results[i].EquitySpotPayment1,
                EquitySpotPayment2: results[i].EquitySpotPayment2,
                EquitySpotPayment3: results[i].EquitySpotPayment3,
                EquitySpotPayment1Pos: results[i].EquitySpotPayment1Pos,
                EquitySpotPayment2Pos: results[i].EquitySpotPayment2Pos,
                EquitySpotPayment3Pos: results[i].EquitySpotPayment3Pos,
                Discount: results[i].Discount,
                DiscountedEquity: results[i].DiscountedEquity,
                Reservation: results[i].Reservation,
                NetEquity: results[i].NetEquity,
                NetEquityBalance: results[i].NetEquityBalance,
                NetEquityInterest: results[i].NetEquityInterest,
                NetEquityNoOfPayments: results[i].NetEquityNoOfPayments,
                NetEquityAmortization: results[i].NetEquityAmortization,
                Balance: results[i].Balance,
                BalanceInterest: results[i].BalanceInterest,
                BalanceNoOfPayments: results[i].BalanceNoOfPayments,
                BalanceAmortization: results[i].BalanceAmortization,
                TotalInvestment: results[i].TotalInvestment,
                PaymentOptions: results[i].PaymentOptions,
                Financing: results[i].Financing,
                Remarks: results[i].Remarks,
                FinancingType: results[i].FinancingType,
                PreparedBy: results[i].PreparedBy,
                PreparedByUser: results[i].PreparedByUser,
                CheckedBy: results[i].CheckedBy,
                CheckedByUser: results[i].CheckedByUser,
                ApprovedBy: results[i].ApprovedBy,
                ApprovedByUser: results[i].ApprovedByUser,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                CreatedBy: results[i].CreatedBy,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedBy: results[i].UpdatedBy,
                UpdatedDateTime: results[i].UpdatedDateTime,
                PriceBalance: results[i].PriceBalance,
                PricePayment: results[i].PricePayment
              });
            }
          }

          observer.next(soldUnitArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitListByUnit(unitId: number): Observable<TrnSoldUnitModel[]> {
    return new Observable<TrnSoldUnitModel[]>((observer) => {
      let soldUnitArray: TrnSoldUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnit/ListPerUnit/" + unitId, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              soldUnitArray.push({
                Id: results[i].Id,
                SoldUnitNumber: results[i].SoldUnitNumber,
                SoldUnitDate: results[i].SoldUnitDate,
                ProjectId: results[i].ProjectId,
                Project: results[i].Project,
                UnitId: results[i].UnitId,
                Unit: results[i].Unit,
                CustomerId: results[i].CustomerId,
                Customer: results[i].Customer,
                BrokerId: results[i].BrokerId,
                Broker: results[i].Broker,
                Agent: results[i].Agent,
                BrokerCoordinator: results[i].BrokerCoordinator,
                ChecklistId: results[i].ChecklistId,
                Checklist: results[i].Checklist,
                MiscellaneousFeeAmount: results[i].MiscellaneousFeeAmount,
                VATAmount: results[i].VATAmount,
                PriceDiscount: results[i].PriceDiscount,
                Price: results[i].Price,
                TCP: results[i].TCP,
                TSP: results[i].TSP,
                DownpaymentValue: results[i].DownpaymentValue,
                DownpaymentPercent: results[i].DownpaymentPercent,
                EquityValue: results[i].EquityValue,
                EquityPercent: results[i].EquityPercent,
                EquitySpotPayment1: results[i].EquitySpotPayment1,
                EquitySpotPayment2: results[i].EquitySpotPayment2,
                EquitySpotPayment3: results[i].EquitySpotPayment3,
                EquitySpotPayment1Pos: results[i].EquitySpotPayment1Pos,
                EquitySpotPayment2Pos: results[i].EquitySpotPayment2Pos,
                EquitySpotPayment3Pos: results[i].EquitySpotPayment3Pos,
                Discount: results[i].Discount,
                DiscountedEquity: results[i].DiscountedEquity,
                Reservation: results[i].Reservation,
                NetEquity: results[i].NetEquity,
                NetEquityBalance: results[i].NetEquityBalance,
                NetEquityInterest: results[i].NetEquityInterest,
                NetEquityNoOfPayments: results[i].NetEquityNoOfPayments,
                NetEquityAmortization: results[i].NetEquityAmortization,
                Balance: results[i].Balance,
                BalanceInterest: results[i].BalanceInterest,
                BalanceNoOfPayments: results[i].BalanceNoOfPayments,
                BalanceAmortization: results[i].BalanceAmortization,
                TotalInvestment: results[i].TotalInvestment,
                PaymentOptions: results[i].PaymentOptions,
                Financing: results[i].Financing,
                Remarks: results[i].Remarks,
                FinancingType: results[i].FinancingType,
                PreparedBy: results[i].PreparedBy,
                PreparedByUser: results[i].PreparedByUser,
                CheckedBy: results[i].CheckedBy,
                CheckedByUser: results[i].CheckedByUser,
                ApprovedBy: results[i].ApprovedBy,
                ApprovedByUser: results[i].ApprovedByUser,
                Status: results[i].Status,
                IsLocked: results[i].IsLocked,
                CreatedBy: results[i].CreatedBy,
                CreatedDateTime: results[i].CreatedDateTime,
                UpdatedBy: results[i].UpdatedBy,
                UpdatedDateTime: results[i].UpdatedDateTime,
                PriceBalance: results[i].PriceBalance,
                PricePayment: results[i].PricePayment
              });
            }
          }

          observer.next(soldUnitArray);
          observer.complete();
        }
      );
    });
  }

  public getSoldUnitDetail(id: number): Observable<TrnSoldUnitModel> {
    return new Observable<TrnSoldUnitModel>((observer) => {
      let trnSoldUnitModel: TrnSoldUnitModel = null;

      this.httpClient.get(this.defaultAPIURLHost + "/api/TrnSoldUnit/Detail/" + id, this.options).subscribe(
        response => {
          let results = response;

          if (results != null) {
            trnSoldUnitModel = {
              Id: results["Id"],
              SoldUnitNumber: results["SoldUnitNumber"],
              SoldUnitDate: results["SoldUnitDate"],
              ProjectId: results["ProjectId"],
              Project: results["Project"],
              UnitId: results["UnitId"],
              Unit: results["Unit"],
              CustomerId: results["CustomerId"],
              Customer: results["Customer"],
              BrokerId: results["BrokerId"],
              Broker: results["Broker"],
              Agent: results["Agent"],
              BrokerCoordinator: results["BrokerCoordinator"],
              ChecklistId: results["ChecklistId"],
              Checklist: results["Checklist"],
              MiscellaneousFeeAmount: results["MiscellaneousFeeAmount"],
              VATAmount: results["VATAmount"],
              PriceDiscount: results["PriceDiscount"],
              Price: results["Price"],
              TCP: results["TCP"],
              TSP: results["TSP"],
              DownpaymentValue: results["DownpaymentValue"],
              DownpaymentPercent: results["DownpaymentPercent"],
              EquityValue: results["EquityValue"],
              EquityPercent: results["EquityPercent"],
              EquitySpotPayment1: results["EquitySpotPayment1"],
              EquitySpotPayment2: results["EquitySpotPayment2"],
              EquitySpotPayment3: results["EquitySpotPayment3"],
              EquitySpotPayment1Pos: results["EquitySpotPayment1Pos"],
              EquitySpotPayment2Pos: results["EquitySpotPayment2Pos"],
              EquitySpotPayment3Pos: results["EquitySpotPayment3Pos"],
              Discount: results["Discount"],
              DiscountedEquity: results["DiscountedEquity"],
              Reservation: results["Reservation"],
              NetEquity: results["NetEquity"],
              NetEquityBalance: results["NetEquityBalance"],
              NetEquityInterest: results["NetEquityInterest"],
              NetEquityNoOfPayments: results["NetEquityNoOfPayments"],
              NetEquityAmortization: results["NetEquityAmortization"],
              Balance: results["Balance"],
              BalanceInterest: results["BalanceInterest"],
              BalanceNoOfPayments: results["BalanceNoOfPayments"],
              BalanceAmortization: results["BalanceAmortization"],
              TotalInvestment: results["TotalInvestment"],
              PaymentOptions: results["PaymentOptions"],
              Financing: results["Financing"],
              Remarks: results["Remarks"],
              FinancingType: results["FinancingType"],
              PreparedBy: results["PreparedBy"],
              PreparedByUser: results["PreparedByUser"],
              CheckedBy: results["CheckedBy"],
              CheckedByUser: results["CheckedByUser"],
              ApprovedBy: results["ApprovedBy"],
              ApprovedByUser: results["ApprovedByUser"],
              Status: results["Status"],
              IsLocked: results["IsLocked"],
              CreatedBy: results["CreatedBy"],
              CreatedDateTime: results["CreatedDateTime"],
              UpdatedBy: results["UpdatedBy"],
              UpdatedDateTime: results["UpdatedDateTime"],
              PriceBalance: results["PriceBalance"],
              PricePayment: results["PricePayment"]
            }
          }

          observer.next(trnSoldUnitModel);
          observer.complete();
        }
      );
    });
  }

  public addSoldUnit(trnSoldUnitModel: any): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/TrnSoldUnit/Add", JSON.stringify(trnSoldUnitModel), this.options).subscribe(
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

  public saveSoldUnit(trnSoldUnitModel: TrnSoldUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnit/Save", JSON.stringify(trnSoldUnitModel), this.options).subscribe(
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

  public lockSoldUnit(trnSoldUnitModel: TrnSoldUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnit/Lock", JSON.stringify(trnSoldUnitModel), this.options).subscribe(
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

  public unlockSoldUnit(trnSoldUnitModel: TrnSoldUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnit/UnLock", JSON.stringify(trnSoldUnitModel), this.options).subscribe(
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

  public cancelSoldUnit(trnSoldUnitModel: TrnSoldUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnit/Cancel", JSON.stringify(trnSoldUnitModel), this.options).subscribe(
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

  public transferSoldUnit(trnSoldUnitModel: TrnSoldUnitModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.put(this.defaultAPIURLHost + "/api/TrnSoldUnit/Transfer", JSON.stringify(trnSoldUnitModel), this.options).subscribe(
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

  public deleteSoldUnit(id: number): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      this.httpClient.delete(this.defaultAPIURLHost + "/api/TrnSoldUnit/delete/" + id, this.options).subscribe(
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
