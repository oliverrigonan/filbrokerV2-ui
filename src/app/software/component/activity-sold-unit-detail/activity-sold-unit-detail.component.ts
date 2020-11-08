import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstBrokerModel } from './../../model/mst-broker.model';
import { MstChecklistModel } from './../../model/mst-checklist.model';
import { MstUserModel } from './../../model/mst-user.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';

import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';
import { MstBrokerService } from './../../service/mst-broker/mst-broker.service';
import { MstChecklistService } from './../../service/mst-checklist/mst-checklist.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-sold-unit-detail',
  templateUrl: './activity-sold-unit-detail.component.html',
  styleUrls: ['./activity-sold-unit-detail.component.css']
})
export class ActivitySoldUnitDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstCustomerService: MstCustomerService,
    private mstBrokerService: MstBrokerService,
    private mstChecklistService: MstChecklistService,
    private mstUserService: MstUserService,
    private sysDropdownService: SysDropdownService,
    private trnSoldUnitService: TrnSoldUnitService,
    private toastr: ToastrService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstCustomerModel: MstCustomerModel[] = [];
  public mstBrokerModel: MstBrokerModel[] = [];
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

  public getCustomerList(): void {
    this.mstCustomerService.getCustomerList().subscribe(
      data => {
        this.mstCustomerModel = data;
        this.getBrokerList();
      }
    );
  }

  public getBrokerList(): void {
    this.mstBrokerService.getBrokerList().subscribe(
      data => {
        this.mstBrokerModel = data;
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
            this.trnSoldUnitModel.PriceDiscount = data.PriceDiscount;
            this.trnSoldUnitModel.Price = data.Price;
            this.trnSoldUnitModel.TCP = data.TCP;
            this.trnSoldUnitModel.TSP = data.TSP;
            this.trnSoldUnitModel.EquityValue = data.EquityValue;
            this.trnSoldUnitModel.EquityPercent = data.EquityPercent;
            this.trnSoldUnitModel.EquitySpotPayment1 = data.EquitySpotPayment1;
            this.trnSoldUnitModel.EquitySpotPayment2 = data.EquitySpotPayment2;
            this.trnSoldUnitModel.EquitySpotPayment3 = data.EquitySpotPayment3;
            this.trnSoldUnitModel.EquitySpotPayment1Pos = data.EquitySpotPayment1Pos;
            this.trnSoldUnitModel.EquitySpotPayment2Pos = data.EquitySpotPayment2Pos;
            this.trnSoldUnitModel.EquitySpotPayment3Pos = data.EquitySpotPayment3Pos;
            this.trnSoldUnitModel.Discount = data.Discount;
            this.trnSoldUnitModel.DiscountedEquity = data.DiscountedEquity;
            this.trnSoldUnitModel.Reservation = data.Reservation;
            this.trnSoldUnitModel.NetEquity = data.NetEquity;
            this.trnSoldUnitModel.NetEquityBalance = data.NetEquityBalance;
            this.trnSoldUnitModel.NetEquityInterest = data.NetEquityInterest;
            this.trnSoldUnitModel.NetEquityNoOfPayments = data.NetEquityNoOfPayments;
            this.trnSoldUnitModel.NetEquityAmortization = data.NetEquityAmortization;
            this.trnSoldUnitModel.Balance = data.Balance;
            this.trnSoldUnitModel.BalanceInterest = data.BalanceInterest;
            this.trnSoldUnitModel.BalanceNoOfPayments = data.BalanceNoOfPayments;
            this.trnSoldUnitModel.BalanceAmortization = data.BalanceAmortization;
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

            this.isSpinnerShow = false;
            this.isContentShow = true;

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
    this.isSoldUnitPrintButtonDisabled = !isLocked;
    this.isSoldUnitCancelButtonDisabled = !isLocked;
    this.isSoldUnitTransferButtonDisabled = !isLocked;
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

  }

  public buttonCancelSoldUnit(): void {

  }

  public buttonTransferSoldUnit(): void {

  }

  ngOnInit(): void {
    this.getCustomerList();
  }
}
