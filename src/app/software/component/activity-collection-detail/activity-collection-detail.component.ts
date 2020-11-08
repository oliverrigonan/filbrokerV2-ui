import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstUserModel } from './../../model/mst-user.model';
import { TrnCollectionModel } from './../../model/trn-collection.model';

import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';
import { TrnCollectionService } from './../../service/trn-collection/trn-collection.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-collection-detail',
  templateUrl: './activity-collection-detail.component.html',
  styleUrls: ['./activity-collection-detail.component.css']
})
export class ActivityCollectionDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstCustomerService: MstCustomerService,
    private mstUserService: MstUserService,
    private trnCollectionService: TrnCollectionService,
    private toastr: ToastrService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstCustomerModel: MstCustomerModel[] = [];
  public mstUserModel: MstUserModel[] = [];
  public trnCollectionModel: TrnCollectionModel = new TrnCollectionModel();

  public isCollectionSaveButtonDisabled: boolean = false;
  public isCollectionLockButtonDisabled: boolean = false;
  public isCollectionUnlockButtonDisabled: boolean = false;

  public collectionDate: Date = new Date();

  public getCustomerList(): void {
    this.mstCustomerService.getCustomerList().subscribe(
      data => {
        this.mstCustomerModel = data;
        this.getUserList();
      }
    );
  }

  public getUserList(): void {
    this.mstUserService.getUserList().subscribe(
      data => {
        this.mstUserModel = data;

        let id = this.route.snapshot.params['id'];
        this.getCollectionDetail(id);
      }
    );
  }

  public getCollectionDetail(id: number): void {
    this.trnCollectionService.getCollectionDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnCollectionModel.Id = data.Id;
            this.trnCollectionModel.CollectionNumber = data.CollectionNumber;
            this.trnCollectionModel.CollectionDate = data.CollectionDate;
            this.trnCollectionModel.CustomerId = data.CustomerId;
            this.trnCollectionModel.Customer = data.Customer;
            this.trnCollectionModel.Particulars = data.Particulars;
            this.trnCollectionModel.PreparedBy = data.PreparedBy;
            this.trnCollectionModel.CheckedBy = data.CheckedBy;
            this.trnCollectionModel.ApprovedBy = data.ApprovedBy;
            this.trnCollectionModel.UpdatedBy = data.UpdatedBy;
            this.trnCollectionModel.IsLocked = data.IsLocked;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.isLockedButtons(this.trnCollectionModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public collectionDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.trnCollectionModel.CollectionDate = this.collectionDate.toString();
  }

  public disabledButtons(): void {
    this.isCollectionSaveButtonDisabled = true;
    this.isCollectionLockButtonDisabled = true;
    this.isCollectionUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isCollectionSaveButtonDisabled = isLocked;
    this.isCollectionLockButtonDisabled = isLocked;
    this.isCollectionUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveCollection(): void {
    this.disabledButtons();

    this.trnCollectionService.saveCollection(this.trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Collection was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.trnCollectionModel.IsLocked);
      }
    );
  }

  public buttonLockCollection(): void {
    this.trnCollectionModel.IsLocked = true;
    this.disabledButtons();

    this.trnCollectionService.lockCollection(this.trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Collection was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.trnCollectionModel.IsLocked = false;
        }

        this.isLockedButtons(this.trnCollectionModel.IsLocked);
      }
    );
  }

  public buttonUnlockCollection(): void {
    this.disabledButtons();

    this.trnCollectionService.unlockCollection(this.trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Collection was successfully unlocked!', 'Unlock Successful');
          this.trnCollectionModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.trnCollectionModel.IsLocked = true;
        }

        this.isLockedButtons(this.trnCollectionModel.IsLocked);
      }
    );
  }

  ngOnInit(): void {
    this.getCustomerList();
  }
}
