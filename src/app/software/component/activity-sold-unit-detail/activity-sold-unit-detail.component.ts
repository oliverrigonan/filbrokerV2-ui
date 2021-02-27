import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstProjectModel } from './../../model/mst-project.model';
import { MstUnitModel } from './../../model/mst-unit.model';
import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstBrokerModel } from './../../model/mst-broker.model';
import { MstChecklistModel } from './../../model/mst-checklist.model';
import { MstUserModel } from './../../model/mst-user.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { TrnSoldUnitRequirementModel } from './../../model/trn-sold-unit-requirement.model';
import { TrnSoldUnitCoOwnerModel } from './../../model/trn-sold-unit-co-owner.model';
import { TrnSoldUnitEquityScheduleModel } from '../../model/trn-sold-unit-equity-schedule.model';


import { MstProjectService } from './../../service/mst-project/mst-project.service';
import { MstUnitService } from './../../service/mst-unit/mst-unit.service';
import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';
import { MstBrokerService } from './../../service/mst-broker/mst-broker.service';
import { MstChecklistService } from './../../service/mst-checklist/mst-checklist.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';
import { TrnSoldUnitRequirementService } from './../../service/trn-sold-unit-requirement/trn-sold-unit-requirement.service';
import { TrnSoldUnitCoOwnerService } from './../../service/trn-sold-unit-co-owner/trn-sold-unit-co-owner.service';
import { TrnSoldUnitEquityScheduleService } from './../../service/trn-sold-unit-equity-schedule/trn-sold-unit-equity-schedule.service';

import { ToastrService } from 'ngx-toastr';

import { ActivitySoldUnitRequirementDetailComponent } from './../activity-sold-unit-requirement-detail/activity-sold-unit-requirement-detail.component';
import { ConfirmationAddChecklistComponent } from './../confirmation-add-checklist/confirmation-add-checklist.component';

import { PrintPdfSoldUnitProposalComponent } from './../../component/print-pdf-sold-unit-proposal/print-pdf-sold-unit-proposal.component';
import { PrintPdfSoldUnitContractComponent } from './../../component/print-pdf-sold-unit-contract/print-pdf-sold-unit-contract.component';
import { ActivitySoldUnitCancelReasonComponent } from './../../component/activity-sold-unit-cancel-reason/activity-sold-unit-cancel-reason.component';
import { ActivitySoldUnitCoOwnerDetailComponent } from './../activity-sold-unit-co-owner-detail/activity-sold-unit-co-owner-detail.component';
import { ActivitySoldUnitEquityScheduleDetailComponent } from './../activity-sold-unit-equity-schedule-detail/activity-sold-unit-equity-schedule-detail.component';
import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';



@Component({
  selector: 'app-activity-sold-unit-detail',
  templateUrl: './activity-sold-unit-detail.component.html',
  styleUrls: ['./activity-sold-unit-detail.component.css']
})
export class ActivitySoldUnitDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstProjectService: MstProjectService,
    private mstUnitService: MstUnitService,
    private mstCustomerService: MstCustomerService,
    private mstBrokerService: MstBrokerService,
    private mstChecklistService: MstChecklistService,
    private mstUserService: MstUserService,
    private sysDropdownService: SysDropdownService,
    private trnSoldUnitService: TrnSoldUnitService,
    private trnSoldUnitRequirementService: TrnSoldUnitRequirementService,
    private trnSoldUnitCoOwnerService: TrnSoldUnitCoOwnerService,
    private activitySoldUnitRequirementDetailDialog: MatDialog,
    private confirmationAddChecklistDialog: MatDialog,
    private toastr: ToastrService,
    private decimalPipe: DecimalPipe,
    private printPdfSoldUnitProposalDialog: MatDialog,
    private printPdfSoldUnitContractDialog: MatDialog,
    private activitySoldUnitCancelReasonDialog: MatDialog,
    private activitySoldUnitCoOwnerDetailDialog: MatDialog,
    private confirmationDeleteDialog: MatDialog,
    private trnSoldUnitEquityScheduleService: TrnSoldUnitEquityScheduleService,
    private activitySoldUnitEquityScheduleDetailDialog: MatDialog,

  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstProjectModel: MstProjectModel[] = [];
  public mstUnitModel: MstUnitModel[] = [];
  public mstCustomerModel: MstCustomerModel[] = [];
  public mstBrokerModel: MstBrokerModel[] = [];
  public mstBrokerModelAgentType: MstBrokerModel[] = [];
  public mstBrokerModelBrokerType: MstBrokerModel[] = [];
  public mstChecklistModel: MstChecklistModel[] = [];
  public sysDropdownModelFinancingTypes: SysDropdownModel[] = [];
  public mstUserModel: MstUserModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];
  public trnSoldUnitModel: TrnSoldUnitModel = new TrnSoldUnitModel();


  public isSoldUnitSaveButtonDisabled: boolean = false;
  public isSoldUnitLockButtonDisabled: boolean = false;
  public isSoldUnitUnlockButtonDisabled: boolean = false;
  public isSoldUnitPrintButtonDisabled: boolean = false;
  public isSoldUnitCancelButtonDisabled: boolean = false;
  public isSoldUnitTransferButtonDisabled: boolean = false;

  public soldUnitDate: Date = new Date();

  public soldUnitRequirementDisplayedColumns: string[] = [
    'ButtonEdit',
    'ChecklistRequirementNo',
    'ChecklistRequirement',
    'ChecklistCategory',
    'ChecklistType',
    'ChecklistWithAttachments',
    'Status',
    'StatusDate',
    'Space'
  ];

  public soldUnitRequirementDataSource: MatTableDataSource<TrnSoldUnitRequirementModel>;
  public soldUnitRequirementData: TrnSoldUnitRequirementModel[] = []

  @ViewChild('soldUnitRequirementPaginator') public soldUnitRequirementPaginator: MatPaginator;
  @ViewChild('soldUnitRequirementSort') public soldUnitRequirementSort: MatSort;

  public isButtonAddSoldUnitRequirementDisabled: boolean = false;

  public soldUnitPrice: string = "0.00";
  public soldUnitTCP: string = "0.00";
  public soldUnitPriceDiscount: string = "0.00";
  public soldUnitTSP: string = "0.00";

  public soldUnitEquityPercent: string = "0.00";
  public soldUnitEquityValue: string = "0.00";
  public soldUnitDiscount: string = "0.00";
  public soldUnitDiscountEquity: string = "0.00";
  public soldUnitReservation: string = "0.00";
  public soldUnitNetEquity: string = "0.00";
  public soldUnitEquitySpotPayment1: string = "0.00";
  public soldUnitEquitySpotPayment2: string = "0.00";
  public soldUnitEquitySpotPayment3: string = "0.00";
  public soldUnitNetEquityBalance: string = "0.00";
  public soldUnitNetEquityInterest: string = "0.00";
  public soldUnitNetEquityNoOfPayments: string = "0.00";
  public soldUnitNetEquityAmortization: string = "0.00";
  public soldUnitBalance: string = "0.00";
  public soldUnitBalanceInterest: string = "0.00";
  public soldUnitBalanceNoOfPayments: string = "0.00";
  public soldUnitBalanceAmortization: string = "0.00";

  public soldUnitCoOwnerDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'CustomerCode',
    'Customer',
    'Address',
    'Space'
  ];

  public soldUnitCoOwnerDataSource: MatTableDataSource<TrnSoldUnitCoOwnerModel>;
  public soldUnitCoOwnerData: TrnSoldUnitCoOwnerModel[] = []

  @ViewChild('soldUnitCoOwnerPaginator') public soldUnitCoOwnerPaginator: MatPaginator;
  @ViewChild('soldUnitCoOwnerSort') public soldUnitCoOwnerSort: MatSort;

  public soldUnitEquityScheduleDisplayedColumns: string[] = [
    'ButtonEdit',
    'PaymentDate',
    'Amortization',
    'CheckNumber',
    'CheckDate',
    'CheckBank',
    'Remarks',
    'Space'
  ];
  public soldUnitEquityScheduleDataSource: MatTableDataSource<TrnSoldUnitEquityScheduleModel>;
  public soldUnitEquityScheduleData: TrnSoldUnitEquityScheduleModel[] = []

  @ViewChild('soldUnitEquitySchedulePaginator') public soldUnitEquitySchedulePaginator: MatPaginator;
  @ViewChild('soldUnitEquityScheduleSort') public soldUnitEquityScheduleSort: MatSort;

  public isButtonAddSoldUnitCoOwnerDisabled: boolean = false;

  public getProjectList(): void {
    this.mstProjectService.getProjectList().subscribe(
      data => {
        this.mstProjectModel = data;
        this.getCustomerList();
      }
    );
  }

  public projectSelectionChange(event: any): void {
    this.getUnitList();
  }

  public getUnitList(): void {
    this.mstUnitService.getUnitListPerProject(this.trnSoldUnitModel.ProjectId).subscribe(
      data => {
        this.mstUnitModel = data;
      }
    );
  }

  public unitSelectionChange(event: any): void {
    let price = this.mstUnitModel.filter(x => x.Id == this.trnSoldUnitModel.UnitId)[0].Price;

    this.trnSoldUnitModel.Price = price;
    this.soldUnitPrice = this.decimalPipe.transform(price, "1.2-2");

    this.trnSoldUnitModel.TSP = price;
    this.soldUnitTSP = this.decimalPipe.transform(price, "1.2-2");

    this.trnSoldUnitModel.TCP = price;
    this.soldUnitTCP = this.decimalPipe.transform(price, "1.2-2");

    let TSP = this.trnSoldUnitModel.TSP;
    let equityPercent = this.trnSoldUnitModel.EquityPercent;
    let equityValue = TSP * (equityPercent / 100);

    this.trnSoldUnitModel.EquityValue = equityValue;
    this.soldUnitEquityValue = this.decimalPipe.transform(equityValue, "1.2-2");

    this.computeAmount();
  }

  public getCustomerList(): void {
    this.mstCustomerService.getCustomerList().subscribe(
      data => {
        this.mstCustomerModel = data;
        this.getBrokerList();
      }
    );
  }

  public getBrokerList(): void {
    this.mstBrokerService.getBrokerListByType("REALTY FIRM").subscribe(
      data => {
        this.mstBrokerModel = data;
        this.getBrokerListByTypeAgent();
      }
    );
  }

  public getBrokerListByTypeAgent(): void {
    this.mstBrokerService.getBrokerListByType("AGENT").subscribe(
      data => {
        this.mstBrokerModelAgentType = data;
        this.getBrokerListByTypeBroker();
      }
    );
  }

  public getBrokerListByTypeBroker(): void {
    this.mstBrokerService.getBrokerListByType("BROKER").subscribe(
      data => {
        this.mstBrokerModelBrokerType = data;
        this.getCheckllistList();
      }
    );
  }

  public getCheckllistList(): void {
    this.mstChecklistService.getChecklistList().subscribe(
      data => {
        this.mstChecklistModel = data;
        this.getDropdownListFinancingTypes();
      }
    );
  }

  public getDropdownListFinancingTypes(): void {
    this.sysDropdownService.getDropdownList("FINANCING TYPE").subscribe(
      data => {
        this.sysDropdownModelFinancingTypes = data;
        this.getUserList();
      }
    );
  }

  public getUserList(): void {
    this.mstUserService.getUserList().subscribe(
      data => {
        this.mstUserModel = data;
        this.getDropdownList();
      }
    );
  }

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("SOLD UNIT STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getSoldUnitDetail(id);
      }
    );
  }

  public getSoldUnitDetail(id: number): void {
    this.trnSoldUnitService.getSoldUnitDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnSoldUnitModel.Id = data.Id;
            this.trnSoldUnitModel.SoldUnitNumber = data.SoldUnitNumber;
            this.trnSoldUnitModel.SoldUnitDate = data.SoldUnitDate;

            this.trnSoldUnitModel.ProjectId = data.ProjectId;
            this.trnSoldUnitModel.Project = data.Project;

            this.getUnitList();

            this.trnSoldUnitModel.UnitId = data.UnitId;
            this.trnSoldUnitModel.Unit = data.Unit;
            this.trnSoldUnitModel.CustomerId = data.CustomerId;
            this.trnSoldUnitModel.Customer = data.Customer;
            this.trnSoldUnitModel.BrokerId = data.BrokerId;
            this.trnSoldUnitModel.Broker = data.Broker;
            this.trnSoldUnitModel.Agent = data.Agent;
            this.trnSoldUnitModel.BrokerCoordinator = data.BrokerCoordinator;
            this.trnSoldUnitModel.ChecklistId = data.ChecklistId;
            this.trnSoldUnitModel.Checklist = data.Checklist;

            this.trnSoldUnitModel.Price = data.Price;
            this.soldUnitPrice = this.decimalPipe.transform(data.Price, "1.2-2");

            this.trnSoldUnitModel.TCP = data.TCP;
            this.soldUnitTCP = this.decimalPipe.transform(data.TCP, "1.2-2");

            this.trnSoldUnitModel.PriceDiscount = data.PriceDiscount;
            this.soldUnitPriceDiscount = this.decimalPipe.transform(data.PriceDiscount, "1.2-2");

            this.trnSoldUnitModel.TSP = data.TSP;
            this.soldUnitTSP = this.decimalPipe.transform(data.TSP, "1.2-2");

            this.trnSoldUnitModel.EquityPercent = data.EquityPercent;
            this.soldUnitEquityPercent = this.decimalPipe.transform(data.EquityPercent, "1.2-2");

            this.trnSoldUnitModel.EquityValue = data.EquityValue;
            this.soldUnitEquityValue = this.decimalPipe.transform(data.EquityValue, "1.2-2");

            this.trnSoldUnitModel.Discount = data.Discount;
            this.soldUnitDiscount = this.decimalPipe.transform(data.Discount, "1.2-2");

            this.trnSoldUnitModel.DiscountedEquity = data.DiscountedEquity;
            this.soldUnitDiscountEquity = this.decimalPipe.transform(data.DiscountedEquity, "1.2-2");

            this.trnSoldUnitModel.Reservation = data.Reservation;
            this.soldUnitReservation = this.decimalPipe.transform(data.Reservation, "1.2-2");

            this.trnSoldUnitModel.NetEquity = data.NetEquity;
            this.soldUnitNetEquity = this.decimalPipe.transform(data.NetEquity, "1.2-2");

            this.trnSoldUnitModel.EquitySpotPayment1 = data.EquitySpotPayment1;
            this.soldUnitEquitySpotPayment1 = this.decimalPipe.transform(data.EquitySpotPayment1, "1.2-2");

            this.trnSoldUnitModel.EquitySpotPayment2 = data.EquitySpotPayment2;
            this.soldUnitEquitySpotPayment2 = this.decimalPipe.transform(data.EquitySpotPayment2, "1.2-2");

            this.trnSoldUnitModel.EquitySpotPayment3 = data.EquitySpotPayment3;
            this.soldUnitEquitySpotPayment3 = this.decimalPipe.transform(data.EquitySpotPayment3, "1.2-2");

            this.trnSoldUnitModel.EquitySpotPayment1Pos = data.EquitySpotPayment1Pos;
            this.trnSoldUnitModel.EquitySpotPayment2Pos = data.EquitySpotPayment2Pos;
            this.trnSoldUnitModel.EquitySpotPayment3Pos = data.EquitySpotPayment3Pos;

            this.trnSoldUnitModel.NetEquityBalance = data.NetEquityBalance;
            this.soldUnitNetEquityBalance = this.decimalPipe.transform(data.NetEquityBalance, "1.2-2");

            this.trnSoldUnitModel.NetEquityInterest = data.NetEquityInterest;
            this.soldUnitNetEquityInterest = this.decimalPipe.transform(data.NetEquityInterest, "1.2-2");

            this.trnSoldUnitModel.NetEquityNoOfPayments = data.NetEquityNoOfPayments;
            this.soldUnitNetEquityNoOfPayments = this.decimalPipe.transform(data.NetEquityNoOfPayments, "1.0-0");

            this.trnSoldUnitModel.NetEquityAmortization = data.NetEquityAmortization;
            this.soldUnitNetEquityAmortization = this.decimalPipe.transform(data.NetEquityAmortization, "1.2-2");

            this.trnSoldUnitModel.Balance = data.Balance;
            this.soldUnitBalance = this.decimalPipe.transform(data.Balance, "1.2-2");

            this.trnSoldUnitModel.BalanceInterest = data.BalanceInterest;
            this.soldUnitBalanceInterest = this.decimalPipe.transform(data.BalanceInterest, "1.2-2");

            this.trnSoldUnitModel.BalanceNoOfPayments = data.BalanceNoOfPayments;
            this.soldUnitBalanceNoOfPayments = this.decimalPipe.transform(data.BalanceNoOfPayments, "1.0-0");

            this.trnSoldUnitModel.BalanceAmortization = data.BalanceAmortization;
            this.soldUnitBalanceAmortization = this.decimalPipe.transform(data.BalanceAmortization, "1.2-2");

            this.trnSoldUnitModel.TotalInvestment = data.TotalInvestment;
            this.trnSoldUnitModel.PaymentOptions = data.PaymentOptions;
            this.trnSoldUnitModel.Financing = data.Financing;
            this.trnSoldUnitModel.Remarks = data.Remarks;
            this.trnSoldUnitModel.FinancingType = data.FinancingType;
            this.trnSoldUnitModel.PreparedBy = data.PreparedBy;
            this.trnSoldUnitModel.PreparedByUser = data.PreparedByUser;
            this.trnSoldUnitModel.CheckedBy = data.CheckedBy;
            this.trnSoldUnitModel.CheckedByUser = data.CheckedByUser;
            this.trnSoldUnitModel.ApprovedBy = data.ApprovedBy;
            this.trnSoldUnitModel.ApprovedByUser = data.ApprovedByUser;
            this.trnSoldUnitModel.Status = data.Status;
            this.trnSoldUnitModel.IsLocked = data.IsLocked;
            this.trnSoldUnitModel.CreatedBy = data.CreatedBy;
            this.trnSoldUnitModel.CreatedDateTime = data.CreatedDateTime;
            this.trnSoldUnitModel.UpdatedBy = data.UpdatedBy;
            this.trnSoldUnitModel.UpdatedDateTime = data.UpdatedDateTime;
            this.trnSoldUnitModel.PriceBalance = data.PriceBalance;
            this.trnSoldUnitModel.PricePayment = data.PricePayment;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.getSoldUnitRequirementData();
            this.getSoldUnitCoOwnerData();
            this.getSoldUnitEquityScheduleData();

            this.isLockedButtons(this.trnSoldUnitModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public soldUnitDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.trnSoldUnitModel.SoldUnitDate = this.soldUnitDate.toString();
  }

  public disabledButtons(): void {
    this.isSoldUnitSaveButtonDisabled = true;
    this.isSoldUnitLockButtonDisabled = true;
    this.isSoldUnitUnlockButtonDisabled = true;
    this.isSoldUnitPrintButtonDisabled = true;
    this.isSoldUnitCancelButtonDisabled = true;
    this.isSoldUnitTransferButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isSoldUnitSaveButtonDisabled = isLocked;
    this.isSoldUnitLockButtonDisabled = isLocked;
    this.isSoldUnitUnlockButtonDisabled = !isLocked;
    this.isSoldUnitPrintButtonDisabled = false;
    this.isSoldUnitCancelButtonDisabled = !isLocked;
    this.isSoldUnitTransferButtonDisabled = !isLocked;
  }

  public onKeyPressNumberOnly(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      if (charCode === 46 && event.target.value.split('.').length === 2) {
        return false;
      } else {
        return true;
      }
    }
  }

  public onFocusNumberRemoveCommas(field: string) {
    if (field === "soldUnitPrice") {
      this.soldUnitPrice = this.soldUnitPrice.split(',').join("");
    }
    if (field === "soldUnitTCP") {
      this.soldUnitTCP = this.soldUnitTCP.split(',').join("");
    }
    if (field === "soldUnitPriceDiscount") {
      this.soldUnitPriceDiscount = this.soldUnitPriceDiscount.split(',').join("");
    }
    if (field === "soldUnitTSP") {
      this.soldUnitTSP = this.soldUnitTSP.split(',').join("");
    }
    if (field === "soldUnitEquityPercent") {
      this.soldUnitEquityPercent = this.soldUnitEquityPercent.split(',').join("");
    }
    if (field === "soldUnitEquityValue") {
      this.soldUnitEquityValue = this.soldUnitEquityValue.split(',').join("");
    }
    if (field === "soldUnitDiscount") {
      this.soldUnitDiscount = this.soldUnitDiscount.split(',').join("");
    }
    if (field === "soldUnitDiscountEquity") {
      this.soldUnitDiscountEquity = this.soldUnitDiscountEquity.split(',').join("");
    }
    if (field === "soldUnitReservation") {
      this.soldUnitReservation = this.soldUnitReservation.split(',').join("");
    }
    if (field === "soldUnitNetEquity") {
      this.soldUnitNetEquity = this.soldUnitNetEquity.split(',').join("");
    }
    if (field === "soldUnitEquitySpotPayment1") {
      this.soldUnitEquitySpotPayment1 = this.soldUnitEquitySpotPayment1.split(',').join("");
    }
    if (field === "soldUnitEquitySpotPayment2") {
      this.soldUnitEquitySpotPayment2 = this.soldUnitEquitySpotPayment2.split(',').join("");
    }
    if (field === "soldUnitEquitySpotPayment3") {
      this.soldUnitEquitySpotPayment3 = this.soldUnitEquitySpotPayment3.split(',').join("");
    }
    if (field === "soldUnitNetEquityBalance") {
      this.soldUnitNetEquityBalance = this.soldUnitNetEquityBalance.split(',').join("");
    }
    if (field === "soldUnitNetEquityInterest") {
      this.soldUnitNetEquityInterest = this.soldUnitNetEquityInterest.split(',').join("");
    }
    if (field === "soldUnitNetEquityNoOfPayments") {
      this.soldUnitNetEquityNoOfPayments = this.soldUnitNetEquityNoOfPayments.split(',').join("");
    }
    if (field === "soldUnitNetEquityAmortization") {
      this.soldUnitNetEquityAmortization = this.soldUnitNetEquityAmortization.split(',').join("");
    }
    if (field === "soldUnitBalance") {
      this.soldUnitBalance = this.soldUnitBalance.split(',').join("");
    }
    if (field === "soldUnitBalanceInterest") {
      this.soldUnitBalanceInterest = this.soldUnitBalanceInterest.split(',').join("");
    }
    if (field === "soldUnitBalanceNoOfPayments") {
      this.soldUnitBalanceNoOfPayments = this.soldUnitBalanceNoOfPayments.split(',').join("");
    }
    if (field === "soldUnitBalanceAmortization") {
      this.soldUnitBalanceAmortization = this.soldUnitBalanceAmortization.split(',').join("");
    }
  }

  public onaBlurNumberAddCommas(numberValue: string, field: string) {
    if (field === "soldUnitPrice") {
      this.soldUnitPrice = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.Price = parseFloat(this.soldUnitPrice.split(',').join(""));
    }
    if (field === "soldUnitTCP") {
      this.soldUnitTCP = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.TCP = parseFloat(this.soldUnitTCP.split(',').join(""));
    }
    if (field === "soldUnitPriceDiscount") {
      this.soldUnitPriceDiscount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.PriceDiscount = parseFloat(this.soldUnitPriceDiscount.split(',').join(""));
    }
    if (field === "soldUnitTSP") {
      this.soldUnitTSP = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.TSP = parseFloat(this.soldUnitTSP.split(',').join(""));
    }
    if (field === "soldUnitEquityPercent") {
      this.soldUnitEquityPercent = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.EquityPercent = parseFloat(this.soldUnitEquityPercent.split(',').join(""));
    }
    if (field === "soldUnitEquityValue") {
      this.soldUnitEquityValue = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.EquityValue = parseFloat(this.soldUnitEquityValue.split(',').join(""));
    }
    if (field === "soldUnitDiscount") {
      this.soldUnitDiscount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.Discount = parseFloat(this.soldUnitDiscount.split(',').join(""));
    }
    if (field === "soldUnitDiscountEquity") {
      this.soldUnitDiscountEquity = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.DiscountedEquity = parseFloat(this.soldUnitDiscountEquity.split(',').join(""));
    }
    if (field === "soldUnitReservation") {
      this.soldUnitReservation = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.Reservation = parseFloat(this.soldUnitReservation.split(',').join(""));
    }
    if (field === "soldUnitNetEquity") {
      this.soldUnitNetEquity = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.NetEquity = parseFloat(this.soldUnitNetEquity.split(',').join(""));
    }
    if (field === "soldUnitEquitySpotPayment1") {
      this.soldUnitEquitySpotPayment1 = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.EquitySpotPayment1 = parseFloat(this.soldUnitEquitySpotPayment1.split(',').join(""));
    }
    if (field === "soldUnitEquitySpotPayment2") {
      this.soldUnitEquitySpotPayment2 = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.EquitySpotPayment2 = parseFloat(this.soldUnitEquitySpotPayment2.split(',').join(""));
    }
    if (field === "soldUnitEquitySpotPayment3") {
      this.soldUnitEquitySpotPayment3 = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.EquitySpotPayment3 = parseFloat(this.soldUnitEquitySpotPayment3.split(',').join(""));
    }
    if (field === "soldUnitNetEquityBalance") {
      this.soldUnitNetEquityBalance = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.NetEquityBalance = parseFloat(this.soldUnitNetEquityBalance.split(',').join(""));
    }
    if (field === "soldUnitNetEquityInterest") {
      this.soldUnitNetEquityInterest = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.NetEquityInterest = parseFloat(this.soldUnitNetEquityInterest.split(',').join(""));
    }
    if (field === "soldUnitNetEquityNoOfPayments") {
      this.soldUnitNetEquityNoOfPayments = this.decimalPipe.transform(numberValue, "1.0-0");
      this.trnSoldUnitModel.NetEquityNoOfPayments = parseFloat(this.soldUnitNetEquityNoOfPayments.split(',').join(""));
    }
    if (field === "soldUnitNetEquityAmortization") {
      this.soldUnitNetEquityAmortization = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.NetEquityAmortization = parseFloat(this.soldUnitNetEquityAmortization.split(',').join(""));
    }
    if (field === "soldUnitBalance") {
      this.soldUnitBalance = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.Balance = parseFloat(this.soldUnitBalance.split(',').join(""));
    }
    if (field === "soldUnitBalanceInterest") {
      this.soldUnitBalanceInterest = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.BalanceInterest = parseFloat(this.soldUnitBalanceInterest.split(',').join(""));
    }
    if (field === "soldUnitBalanceNoOfPayments") {
      this.soldUnitBalanceNoOfPayments = this.decimalPipe.transform(numberValue, "1.0-0");
      this.trnSoldUnitModel.BalanceNoOfPayments = parseFloat(this.soldUnitBalanceNoOfPayments.split(',').join(""));
    }
    if (field === "soldUnitBalanceAmortization") {
      this.soldUnitBalanceAmortization = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnSoldUnitModel.BalanceAmortization = parseFloat(this.soldUnitBalanceAmortization.split(',').join(""));
    }
  }

  public onKeyUpComputeAmount(event: any, field: string) {
    let value = event.target.value;

    if (field === "soldUnitPrice") {
      this.trnSoldUnitModel.Price = value;
    }
    if (field === "soldUnitTCP") {
      this.trnSoldUnitModel.TCP = value;
    }
    if (field === "soldUnitPriceDiscount") {
      this.trnSoldUnitModel.PriceDiscount = value;
    }
    if (field === "soldUnitTSP") {
      this.trnSoldUnitModel.TSP = value;
    }
    if (field === "soldUnitEquityPercent") {
      this.trnSoldUnitModel.EquityPercent = value;
    }
    if (field === "soldUnitEquityValue") {
      this.trnSoldUnitModel.EquityValue = value;
    }
    if (field === "soldUnitDiscount") {
      this.trnSoldUnitModel.Discount = value;
    }
    if (field === "soldUnitDiscountEquity") {
      this.trnSoldUnitModel.DiscountedEquity = value;
    }
    if (field === "soldUnitReservation") {
      this.trnSoldUnitModel.Reservation = value;
    }
    if (field === "soldUnitNetEquity") {
      this.trnSoldUnitModel.NetEquity = value;
    }
    if (field === "soldUnitEquitySpotPayment1") {
      this.trnSoldUnitModel.EquitySpotPayment1 = value;
    }
    if (field === "soldUnitEquitySpotPayment2") {
      this.trnSoldUnitModel.EquitySpotPayment2 = value;
    }
    if (field === "soldUnitEquitySpotPayment3") {
      this.trnSoldUnitModel.EquitySpotPayment3 = value;
    }
    if (field === "soldUnitNetEquityBalance") {
      this.trnSoldUnitModel.NetEquityBalance = value;
    }
    if (field === "soldUnitNetEquityInterest") {
      this.trnSoldUnitModel.NetEquityInterest = value;
    }
    if (field === "soldUnitNetEquityNoOfPayments") {
      this.trnSoldUnitModel.NetEquityNoOfPayments = value;
    }
    if (field === "soldUnitNetEquityAmortization") {
      this.trnSoldUnitModel.NetEquityAmortization = value;
    }
    if (field === "soldUnitBalance") {
      this.trnSoldUnitModel.Balance = value;
    }
    if (field === "soldUnitBalanceInterest") {
      this.trnSoldUnitModel.BalanceInterest = value;
    }
    if (field === "soldUnitBalanceNoOfPayments") {
      this.trnSoldUnitModel.BalanceNoOfPayments = value;
    }
    if (field === "soldUnitBalanceAmortization") {
      this.trnSoldUnitModel.BalanceAmortization = value;
    }

    if (field === "soldUnitEquityPercent") {
      let TSP = this.trnSoldUnitModel.TSP;
      let equityPercent = event.target.value;
      let equityValue = TSP * (equityPercent / 100);

      this.trnSoldUnitModel.EquityValue = equityValue;
      this.soldUnitEquityValue = this.decimalPipe.transform(equityValue, "1.2-2");
    } else {
      if (field === "soldUnitEquityValue") {
        let TSP = this.trnSoldUnitModel.TSP;
        let equityValue = event.target.value;
        let equityPercent = (equityValue / TSP) * 100;

        this.trnSoldUnitModel.EquityPercent = equityPercent;
        this.soldUnitEquityPercent = this.decimalPipe.transform(equityPercent, "1.2-2");
      }
    }

    this.computeAmount();
  }

  public computeAmount(): void {
    let equityValue = this.trnSoldUnitModel.EquityValue;
    let discount = this.trnSoldUnitModel.Discount;
    let discountedEquity = equityValue - discount;

    this.trnSoldUnitModel.DiscountedEquity = discountedEquity;
    this.soldUnitDiscountEquity = this.decimalPipe.transform(discountedEquity, "1.2-2");

    let reservation = this.trnSoldUnitModel.Reservation;
    let netEquity = discountedEquity - reservation;

    this.trnSoldUnitModel.NetEquity = netEquity;
    this.soldUnitNetEquity = this.decimalPipe.transform(netEquity, "1.2-2");

    let equitySpotPayment1 = parseFloat(this.soldUnitEquitySpotPayment1.split(',').join(""));
    let equitySpotPayment2 = parseFloat(this.soldUnitEquitySpotPayment2.split(',').join(""));
    let equitySpotPayment3 = parseFloat(this.soldUnitEquitySpotPayment3.split(',').join(""));
    let netEquityBalance = netEquity - (equitySpotPayment1 + equitySpotPayment2 + equitySpotPayment3);

    this.trnSoldUnitModel.NetEquityBalance = netEquityBalance;
    this.soldUnitNetEquityBalance = this.decimalPipe.transform(netEquityBalance, "1.2-2");

    let netEquityInterest = this.trnSoldUnitModel.NetEquityInterest;
    let equityBalanceNoOfPayments = this.trnSoldUnitModel.NetEquityNoOfPayments;

    let netEquityValue = netEquityInterest > 0 ? netEquityBalance + (netEquityBalance * (netEquityInterest / 100)) : netEquityBalance;
    let netEquityAmortization = netEquityValue / equityBalanceNoOfPayments;

    this.trnSoldUnitModel.NetEquityAmortization = netEquityAmortization;
    this.soldUnitNetEquityAmortization = this.decimalPipe.transform(netEquityAmortization, "1.2-2");

    let TSP = this.trnSoldUnitModel.TSP;
    let balance = TSP - equityValue;

    this.trnSoldUnitModel.Balance = balance;
    this.soldUnitBalance = this.decimalPipe.transform(balance, "1.2-2");

    let balanceInterest = this.trnSoldUnitModel.BalanceInterest;
    let balanceNoOfPayments = this.trnSoldUnitModel.BalanceNoOfPayments;

    let balanceValue = balance * (balanceInterest / 100);
    let balanceAmortization = balanceValue / balanceNoOfPayments;

    this.trnSoldUnitModel.BalanceAmortization = balanceAmortization;
    this.soldUnitBalanceAmortization = this.decimalPipe.transform(balanceAmortization, "1.2-2");
  }

  public buttonSaveSoldUnit(): void {
    this.disabledButtons();

    this.trnSoldUnitService.saveSoldUnit(this.trnSoldUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Sold unit was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.trnSoldUnitModel.IsLocked);
      }
    );
  }

  public buttonLockSoldUnit(): void {
    this.trnSoldUnitModel.IsLocked = true;
    this.disabledButtons();

    this.trnSoldUnitService.lockSoldUnit(this.trnSoldUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Sold unit was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.trnSoldUnitModel.IsLocked = false;
        }

        this.isLockedButtons(this.trnSoldUnitModel.IsLocked);
      }
    );
  }

  public buttonUnlockSoldUnit(): void {
    this.disabledButtons();

    this.trnSoldUnitService.unlockSoldUnit(this.trnSoldUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Sold unit was successfully unlocked!', 'Unlock Successful');
          this.trnSoldUnitModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.trnSoldUnitModel.IsLocked = true;
        }

        this.isLockedButtons(this.trnSoldUnitModel.IsLocked);
      }
    );
  }

  public buttonPrintSoldUnit(): void {
    if (this.trnSoldUnitModel.IsLocked == true) {
      const openDialog = this.printPdfSoldUnitContractDialog.open(PrintPdfSoldUnitContractComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Contract",
          dialogData: this.trnSoldUnitModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    } else {
      const openDialog = this.printPdfSoldUnitProposalDialog.open(PrintPdfSoldUnitProposalComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Proposal",
          dialogData: this.trnSoldUnitModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    }
  }

  public buttonCancelSoldUnit(): void {
    const openDialog = this.activitySoldUnitCancelReasonDialog.open(ActivitySoldUnitCancelReasonComponent, {
      width: '800px',
      data: {
        dialogTitle: "Cancel Reason",
        dialogData: this.trnSoldUnitModel
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  public buttonTransferSoldUnit(): void {

  }

  public realtyFirmChange(event: any): void {
    let firm = "";
    if (this.mstBrokerModel.filter(d => d.Id == this.trnSoldUnitModel.BrokerId)[0] != null) {
      firm = this.mstBrokerModel.filter(d => d.Id == this.trnSoldUnitModel.BrokerId)[0].RealtyFirm;
    }

    let broker = "";
    if (this.mstBrokerModelBrokerType.filter(d => d.AssociatedFirm == firm)[0] != null) {
      broker = this.mstBrokerModelBrokerType.filter(d => d.AssociatedFirm == firm)[0].FullName;
    }

    let agent = "";
    if (this.mstBrokerModelAgentType.filter(d => d.AssociatedBroker == broker)[0] != null) {
      agent = this.mstBrokerModelAgentType.filter(d => d.AssociatedBroker == broker)[0].FullName;
    }

    this.trnSoldUnitModel.BrokerCoordinator = broker;
    this.trnSoldUnitModel.Agent = agent;

    console.log(firm);
    console.log(broker);
    console.log(agent);
  }

  public getSoldUnitRequirementData(): void {
    this.soldUnitRequirementData = [];
    this.soldUnitRequirementDataSource = new MatTableDataSource(this.soldUnitRequirementData);
    this.soldUnitRequirementDataSource.paginator = this.soldUnitRequirementPaginator;
    this.soldUnitRequirementDataSource.sort = this.soldUnitRequirementSort;

    this.trnSoldUnitRequirementService.getSoldUnitRequirementListPerSoldUnit(this.trnSoldUnitModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitRequirementData = data;
          this.soldUnitRequirementDataSource = new MatTableDataSource(this.soldUnitRequirementData);
          this.soldUnitRequirementDataSource.paginator = this.soldUnitRequirementPaginator;
          this.soldUnitRequirementDataSource.sort = this.soldUnitRequirementSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public soldUnitRequirementFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitRequirementDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitRequirementDataSource.paginator) {
      this.soldUnitRequirementDataSource.paginator.firstPage();
    }
  }

  public buttonAddSoldUnitRequirement(): void {
    if (this.trnSoldUnitModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      const openDialog = this.confirmationAddChecklistDialog.open(ConfirmationAddChecklistComponent, {
        width: '450px',
        data: {
          dialogAddChecklistTitle: "Add Checklist Requirements",
          dialogAddChecklistMessage: "Are you sure you want to add all requirements from selected checklist?"
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.trnSoldUnitRequirementService.addSoldUnitRequirement(this.trnSoldUnitModel.Id, this.trnSoldUnitModel.ChecklistId).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Checklist requirements were successfully added!', 'Add Checklist Requirements Successful');
                this.getSoldUnitRequirementData();
              } else {
                this.toastr.error(data[1], 'Add Checklist Requirements Failed');
              }

            }
          );
        }
      });
    }
  }

  public buttonEditSoldUnitRequirement(currentData: any): void {
    if (this.trnSoldUnitModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let id = currentData.Id;

      let mstSoldUnitRequirementModel: TrnSoldUnitRequirementModel = {
        Id: id,
        SoldUnitId: this.trnSoldUnitModel.Id,
        ChecklistRequirementId: 0,
        ChecklistRequirement: "",
        ChecklistRequirementNo: 0,
        ChecklistCategory: "",
        ChecklistType: "",
        ChecklistWithAttachments: false,
        Attachment1: "",
        Attachment2: "",
        Attachment3: "",
        Attachment4: "",
        Attachment5: "",
        Remarks: "",
        Status: "",
        StatusDate: "",
        SoldUnitNumber: "",
        SoldUnitDate: "",
        Project: "",
        Unit: "",
        Customer: ""
      };

      const openDialog = this.activitySoldUnitRequirementDetailDialog.open(ActivitySoldUnitRequirementDetailComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Edit Sold Unit Requirement",
          dialogData: mstSoldUnitRequirementModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getSoldUnitRequirementData();
        }
      });
    }
  }

  public getSoldUnitCoOwnerData(): void {
    this.soldUnitCoOwnerData = [];
    this.soldUnitCoOwnerDataSource = new MatTableDataSource(this.soldUnitCoOwnerData);
    this.soldUnitCoOwnerDataSource.paginator = this.soldUnitCoOwnerPaginator;
    this.soldUnitCoOwnerDataSource.sort = this.soldUnitCoOwnerSort;

    this.trnSoldUnitCoOwnerService.getSoldUnitCoOwnerListPerSoldUnit(this.trnSoldUnitModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitCoOwnerData = data;
          this.soldUnitCoOwnerDataSource = new MatTableDataSource(this.soldUnitCoOwnerData);
          this.soldUnitCoOwnerDataSource.paginator = this.soldUnitCoOwnerPaginator;
          this.soldUnitCoOwnerDataSource.sort = this.soldUnitCoOwnerSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public soldUnitCoOwnerFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitCoOwnerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitCoOwnerDataSource.paginator) {
      this.soldUnitCoOwnerDataSource.paginator.firstPage();
    }
  }

  public buttonAddSoldUnitCoOwner(): void {
    if (this.trnSoldUnitModel.Id == 0) {
      this.toastr.error("No sold unit requirement data found.", 'Add Failed');
    } else {
      let trnSoldUnitCoOwnerModel: TrnSoldUnitCoOwnerModel = {
        Id: 0,
        SoldUnitId: this.trnSoldUnitModel.Id,
        CustomerId: 0,
        CustomerCode: "",
        Customer: "",
        Address: ""
      };

      const openDialog = this.activitySoldUnitCoOwnerDetailDialog.open(ActivitySoldUnitCoOwnerDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Add Co-Owner",
          dialogData: trnSoldUnitCoOwnerModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getSoldUnitCoOwnerData();
        }
      });
    }
  }

  public buttonEditSoldUnitCoOwner(currentData: any): void {
    if (this.trnSoldUnitModel.Id == 0) {
      this.toastr.error("No sold unit data found.", 'Add Failed');
    } else {
      let id = currentData.Id;

      let trnSoldUnitCoOwnerModel: TrnSoldUnitCoOwnerModel = {
        Id: id,
        SoldUnitId: this.trnSoldUnitModel.Id,
        CustomerId: 0,
        CustomerCode: "",
        Customer: "",
        Address: ""
      };

      const openDialog = this.activitySoldUnitCoOwnerDetailDialog.open(ActivitySoldUnitCoOwnerDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Edit Co-Owner",
          dialogData: trnSoldUnitCoOwnerModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getSoldUnitCoOwnerData();
        }
      });
    }
  }

  public buttonDeleteSoldUnitCoOwner(currentData: any): void {
    if (this.trnSoldUnitModel.Id == 0) {
      this.toastr.error("No sold unit data found.", 'Add Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Co-Owner",
          dialogDeleteMessage: "Are you sure you want to delete this co-owner " + currentData.Activity + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.trnSoldUnitCoOwnerService.deleteSoldUnitCoOwner(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Co-Owner was successfully deleted!', 'Delete Successful');
                this.getSoldUnitCoOwnerData();
              } else {
                this.toastr.error(data[1], 'Delete Failed');
              }

            }
          );
        }
      });
    }
  }

  public getSoldUnitEquityScheduleData(): void {
    this.soldUnitEquityScheduleData = [];
    this.soldUnitEquityScheduleDataSource = new MatTableDataSource(this.soldUnitEquityScheduleData);
    this.soldUnitEquityScheduleDataSource.paginator = this.soldUnitEquitySchedulePaginator;
    this.soldUnitEquityScheduleDataSource.sort = this.soldUnitEquityScheduleSort;

    this.trnSoldUnitEquityScheduleService.getTrnSoldUnitEquitySchedule(this.trnSoldUnitModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitEquityScheduleData = data;
          this.soldUnitEquityScheduleDataSource = new MatTableDataSource(this.soldUnitEquityScheduleData);
          this.soldUnitEquityScheduleDataSource.paginator = this.soldUnitEquitySchedulePaginator;
          this.soldUnitEquityScheduleDataSource.sort = this.soldUnitEquityScheduleSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }


  public buttonAddSoldUnitEquitySchedule(): void {
    if (this.trnSoldUnitModel.Id == 0) {
      this.toastr.error("No sold unit requirement data found.", 'Add Failed');
    } else {
      this.trnSoldUnitEquityScheduleService.addSoldUnitEquitySchedule(this.trnSoldUnitModel.Id).subscribe(
        data => {
          if (data.length > 0) {
            this.getSoldUnitEquityScheduleData();
          }
        }
      );
    }
  }

  public buttonEditSoldUnitEquitySchedule(currentData: TrnSoldUnitEquityScheduleModel): void {
    if (this.trnSoldUnitModel.Id == 0) {
      this.toastr.error("No sold unit data found.", 'Add Failed');
    } else {
      let id = currentData.Id;

      let trnSoldUnitEquityScheduleModel: TrnSoldUnitEquityScheduleModel = {
        Id: id,
        SoldUnitId: this.trnSoldUnitModel.Id,
        PaymentDate: currentData.PaymentDate,
        Amortization: currentData.Amortization,
        CheckNumber: currentData.CheckNumber,
        CheckDate: currentData.CheckDate,
        CheckBank: currentData.CheckBank,
        Remarks: currentData.Remarks,
      };

      const openDialog = this.activitySoldUnitEquityScheduleDetailDialog.open(ActivitySoldUnitEquityScheduleDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Edit Equity Schedule",
          dialogData: trnSoldUnitEquityScheduleModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getSoldUnitEquityScheduleData();
        }
      });
    }
  }

  ngOnInit(): void {
    this.getProjectList();
  }
}
