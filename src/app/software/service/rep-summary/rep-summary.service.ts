import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';

import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { TrnSoldUnitRequirementModel } from './../../model/trn-sold-unit-requirement.model';
import { TrnSoldUnitRequirementActivityModel } from './../../model/trn-sold-unit-requirement-activity.model';
import { TrnCommissionRequestModel } from './../../model/trn-commission-request.model';
import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstBrokerModel } from './../../model/mst-broker.model';

@Injectable({
  providedIn: 'root'
})
export class RepSummaryService {

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

  public getRepSummarySoldUnitListByDateRange(dateStart: string, dateEnd: string): Observable<TrnSoldUnitModel[]> {
    return new Observable<TrnSoldUnitModel[]>((observer) => {
      let soldUnitArray: TrnSoldUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListSoldUnitPerDates/" + dateStart + "/" + dateEnd, this.options).subscribe(
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
                PriceDiscount: results[i].PriceDiscount,
                Price: results[i].Price,
                TCP: results[i].TCP,
                TSP: results[i].TSP,
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

  public getRepSummaryAccountsReceivableListByDateAsOf(dateAsOf: string): Observable<TrnSoldUnitModel[]> {
    return new Observable<TrnSoldUnitModel[]>((observer) => {
      let soldUnitArray: TrnSoldUnitModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListSoldUnitPerDateAsOf/" + dateAsOf, this.options).subscribe(
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
                PriceDiscount: results[i].PriceDiscount,
                Price: results[i].Price,
                TCP: results[i].TCP,
                TSP: results[i].TSP,
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


  public getRepSummarySoldUnitRequirementListByDateRange(dateStart: string, dateEnd: string): Observable<TrnSoldUnitRequirementModel[]> {
    return new Observable<TrnSoldUnitRequirementModel[]>((observer) => {
      let soldUnitRequirementArray: TrnSoldUnitRequirementModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListSoldUnitChecklistPerDates/" + dateStart + "/" + dateEnd, this.options).subscribe(
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
                StatusDate: results[i].StatusDate,
                SoldUnitNumber: results[i].SoldUnitNumber,
                SoldUnitDate: results[i].SoldUnitDate,
                Project: results[i].Project,
                Unit: results[i].Unit,
                Customer: results[i].Customer
              });
            }
          }

          observer.next(soldUnitRequirementArray);
          observer.complete();
        }
      );
    });
  }

  public getRepSummarySoldUnitRequirementActivityListByDateRange(dateStart: string, dateEnd: string): Observable<TrnSoldUnitRequirementActivityModel[]> {
    return new Observable<TrnSoldUnitRequirementActivityModel[]>((observer) => {
      let houseModelArray: TrnSoldUnitRequirementActivityModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListSoldUnitRequirementActivityPerDates/" + dateStart + "/" + dateEnd, this.options).subscribe(
        response => {
          let results = response;

          if (results["length"] > 0) {
            for (let i = 0; i <= results["length"] - 1; i++) {
              houseModelArray.push({
                Id: results[i].Id,
                SoldUnitRequirementId: results[i].SoldUnitRequirementId,
                ActivityDate: results[i].ActivityDate,
                Activity: results[i].Activity,
                Remarks: results[i].Remarks,
                UserId: results[i].UserId,
                User: results[i].User,
                ChecklistRequirement: results[i].ChecklistRequirement,
                SoldUnitNumber: results[i].SoldUnitNumber,
                Project: results[i].Project,
                UnitCode: results[i].UnitCode,
                Customer: results[i].Customer
              });
            }
          }

          observer.next(houseModelArray);
          observer.complete();
        }
      );
    });
  }

  public getRepSummaryCommissionRequestListByDateRange(dateStart: string, dateEnd: string): Observable<TrnCommissionRequestModel[]> {
    return new Observable<TrnCommissionRequestModel[]>((observer) => {
      let commissionRequestArray: TrnCommissionRequestModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListCommissionRequestPerDates/" + dateStart + "/" + dateEnd, this.options).subscribe(
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
                UpdatedDateTime: results[i].UpdatedDateTime,
              });
            }
          }

          observer.next(commissionRequestArray);
          observer.complete();
        }
      );
    });
  }

  public getRepSummaryCustomerListByDateRange(dateStart: string, dateEnd: string): Observable<MstCustomerModel[]> {
    return new Observable<MstCustomerModel[]>((observer) => {
      let customerArray: MstCustomerModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListCustomerFilterByUpdateDateTime/" + dateStart + "/" + dateEnd, this.options).subscribe(
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

  public getRepSummaryBrokerListByDateRange(dateStart: string, dateEnd: string): Observable<MstBrokerModel[]> {
    return new Observable<MstBrokerModel[]>((observer) => {
      let brokerArray: MstBrokerModel[] = [];

      this.httpClient.get(this.defaultAPIURLHost + "/api/RepSummary/ListBrokerFilterByUpdateDateTime/" + dateStart + "/" + dateEnd, this.options).subscribe(
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
                Type: results[i].Type,
                AssociatedBroker: results[i].AssociatedBroker,
                AssociatedFirm: results[i].AssociatedFirm
              });
            }
          }

          observer.next(brokerArray);
          observer.complete();
        }
      );
    });
  }
}
