import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { MstBrokerModel } from './../../model/mst-broker.model';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { MstUserModel } from './../../model/mst-user.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { TrnCommissionRequestModel } from './../../model/trn-commission-request.model';

import { MstBrokerService } from './../../service/mst-broker/mst-broker.service';
import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { TrnCommissionRequestService } from './../../service/trn-commission-request/trn-commission-request.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-commission-request-detail',
  templateUrl: './activity-commission-request-detail.component.html',
  styleUrls: ['./activity-commission-request-detail.component.css']
})
export class ActivityCommissionRequestDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstBrokerService: MstBrokerService,
    private trnSoldUnitService: TrnSoldUnitService,
    private mstUserService: MstUserService,
    private sysDropdownService: SysDropdownService,
    private trnCommissionRequestService: TrnCommissionRequestService,
    private toastr: ToastrService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstBrokerModel: MstBrokerModel[] = [];
  public trnSoldUnitModel: TrnSoldUnitModel[] = [];
  public sysDropdownModelCommissionRequestNumber: SysDropdownModel[] = [];
  public mstUserModel: MstUserModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];
  public trnCommissionRequestModel: TrnCommissionRequestModel = new TrnCommissionRequestModel();

  public isCommissionRequestSaveButtonDisabled: boolean = false;
  public isCommissionRequestLockButtonDisabled: boolean = false;
  public isCommissionRequestUnlockButtonDisabled: boolean = false;

  public commissionRequestDate: Date = new Date();

  public getBrokerList(): void {
    this.mstBrokerService.getBrokerList().subscribe(
      data => {
        this.mstBrokerModel = data;
        this.getSoldUnitList();
      }
    );
  }

  public getSoldUnitList(): void {
    this.trnSoldUnitService.getSoldUnitList().subscribe(
      data => {
        this.trnSoldUnitModel = data;
        this.getDropdownListCommissionRequestNumber();
      }
    );
  }

  public getDropdownListCommissionRequestNumber(): void {
    this.sysDropdownService.getDropdownList("COMMISSION NUMBERS").subscribe(
      data => {
        this.sysDropdownModelCommissionRequestNumber = data;
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
    this.sysDropdownService.getDropdownList("COMMISSION STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getCommissionRequestDetail(id);
      }
    );
  }

  public getCommissionRequestDetail(id: number): void {
    this.trnCommissionRequestService.getCommissionRequestDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnCommissionRequestModel.Id = data.Id;
            this.trnCommissionRequestModel.CommissionRequestNumber = data.CommissionRequestNumber;
            this.trnCommissionRequestModel.CommissionRequestDate = data.CommissionRequestDate;
            this.trnCommissionRequestModel.BrokerId = data.BrokerId;
            this.trnCommissionRequestModel.Broker = data.Broker;
            this.trnCommissionRequestModel.SoldUnitId = data.SoldUnitId;
            this.trnCommissionRequestModel.SoldUnit = data.SoldUnit;
            this.trnCommissionRequestModel.CommissionNumber = data.CommissionNumber;
            this.trnCommissionRequestModel.Amount = data.Amount;
            this.trnCommissionRequestModel.Remarks = data.Remarks;
            this.trnCommissionRequestModel.PreparedBy = data.PreparedBy;
            this.trnCommissionRequestModel.PrepearedByUser = data.PrepearedByUser;
            this.trnCommissionRequestModel.CheckedBy = data.CheckedBy;
            this.trnCommissionRequestModel.CheckedByUser = data.CheckedByUser;
            this.trnCommissionRequestModel.ApprovedBy = data.ApprovedBy;
            this.trnCommissionRequestModel.ApprovedByUser = data.ApprovedByUser;
            this.trnCommissionRequestModel.Status = data.Status;
            this.trnCommissionRequestModel.IsLocked = data.IsLocked;
            this.trnCommissionRequestModel.CreatedBy = data.CreatedBy;
            this.trnCommissionRequestModel.CreatedDateTime = data.CreatedDateTime;
            this.trnCommissionRequestModel.UpdatedBy = data.UpdatedBy;
            this.trnCommissionRequestModel.UpdatedDateTime = data.UpdatedDateTime;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.isLockedButtons(this.trnCommissionRequestModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public commissionRequestDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.trnCommissionRequestModel.CommissionRequestDate = this.commissionRequestDate.toString();
  }

  public disabledButtons(): void {
    this.isCommissionRequestSaveButtonDisabled = true;
    this.isCommissionRequestLockButtonDisabled = true;
    this.isCommissionRequestUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isCommissionRequestSaveButtonDisabled = isLocked;
    this.isCommissionRequestLockButtonDisabled = isLocked;
    this.isCommissionRequestUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveCommissionRequest(): void {
    this.disabledButtons();

    this.trnCommissionRequestService.saveCommissionRequest(this.trnCommissionRequestModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Commission request was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.trnCommissionRequestModel.IsLocked);
      }
    );
  }

  public buttonLockCommissionRequest(): void {
    this.trnCommissionRequestModel.IsLocked = true;
    this.disabledButtons();

    this.trnCommissionRequestService.lockCommissionRequest(this.trnCommissionRequestModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Commission request was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.trnCommissionRequestModel.IsLocked = false;
        }

        this.isLockedButtons(this.trnCommissionRequestModel.IsLocked);
      }
    );
  }

  public buttonUnlockCommissionRequest(): void {
    this.disabledButtons();

    this.trnCommissionRequestService.unlockCommissionRequest(this.trnCommissionRequestModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Commission request was successfully unlocked!', 'Unlock Successful');
          this.trnCommissionRequestModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.trnCommissionRequestModel.IsLocked = true;
        }

        this.isLockedButtons(this.trnCommissionRequestModel.IsLocked);
      }
    );
  }

  ngOnInit(): void {
    this.getBrokerList();
  }
}
