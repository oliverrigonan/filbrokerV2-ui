import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { MstHouseModelModel } from './../../model/mst-house-model.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstUnitModel } from './../../model/mst-unit.model';

import { MstHouseModelService } from './../../service/mst-house-model/mst-house-model.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstUnitService } from './../../service/mst-unit/mst-unit.service';

import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { TrnSoldUnitModel } from '../../model/trn-sold-unit.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrnSoldUnitService } from '../../service/trn-sold-unit/trn-sold-unit.service';
import { MstUserRights } from './../../model/mst-user-rights.model';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';

@Component({
  selector: 'app-setup-unit-detail',
  templateUrl: './setup-unit-detail.component.html',
  styleUrls: ['./setup-unit-detail.component.css']
})
export class SetupUnitDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstHouseModelService: MstHouseModelService,
    private sysDropdownService: SysDropdownService,
    private mstUnitService: MstUnitService,
    private toastr: ToastrService,
    private decimalPipe: DecimalPipe,
    private trnSoldUnitService: TrnSoldUnitService,
    private mstUserRightsService: MstUserRightsService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;
  public isPageForbidden: boolean = false;

  public mstUnitModel: MstUnitModel = new MstUnitModel();
  public mstUserRights: MstUserRights = new MstUserRights();

  public mstHouseModelModel: MstHouseModelModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];

  public isUnitSaveButtonDisabled: boolean = false;
  public isUnitLockButtonDisabled: boolean = false;
  public isUnitUnlockButtonDisabled: boolean = false;

  public unitTLA: string = "0.00";
  public unitTFA: string = "0.00";

  public unitPrice: string = "0.00";
  public unitMiscellaneousFeeAmount: string = "0.00";
  public unitVATAmount: string = "0.00";
  public unitTSP: string = "0.00";

  public soldUnitDisplayedColumns: string[] = [
    'SoldUnitNumber',
    'SoldUnitDate',
    'Project',
    'Customer',
    'Broker',
    'Price',
    'PriceDiscount',
    'PricePayment',
    'PriceBalance',
    'Status',
    'IsLocked',
    'Space'
  ];

  public soldUnitDataSource: MatTableDataSource<TrnSoldUnitModel>;
  public soldUnitData: TrnSoldUnitModel[] = []

  @ViewChild('soldUnitPaginator') public soldUnitPaginator: MatPaginator;
  @ViewChild('soldUnitSort') public soldUnitSort: MatSort;

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("UNIT STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getUnitDetail(id);
      }
    );
  }

  public getUnitDetail(id: number): void {
    this.mstUnitService.getUnitDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUnitModel.Id = data.Id;
            this.mstUnitModel.UnitCode = data.UnitCode;
            this.mstUnitModel.Block = data.Block;
            this.mstUnitModel.Lot = data.Lot;
            this.mstUnitModel.ProjectId = data.ProjectId;
            this.mstUnitModel.Project = data.Project;
            this.mstUnitModel.HouseModelId = data.HouseModelId;
            this.mstUnitModel.HouseModel = data.HouseModel;

            this.mstUnitModel.TLA = data.TLA;
            this.unitTLA = this.decimalPipe.transform(data.TLA, "1.2-2");

            this.mstUnitModel.TFA = data.TFA;
            this.unitTFA = this.decimalPipe.transform(data.TFA, "1.2-2");

            this.mstUnitModel.Price = data.Price;
            this.unitPrice = this.decimalPipe.transform(data.Price, "1.2-2");

            this.mstUnitModel.MiscellaneousFeeRate = data.MiscellaneousFeeRate;
            this.mstUnitModel.MiscellaneousFeeAmount = data.MiscellaneousFeeAmount;
            this.unitMiscellaneousFeeAmount = this.decimalPipe.transform(data.MiscellaneousFeeAmount, "1.2-2");

            this.mstUnitModel.VATRate = data.VATRate;
            this.mstUnitModel.VATAmount = data.VATAmount;
            this.unitVATAmount = this.decimalPipe.transform(data.VATAmount, "1.2-2");

            this.mstUnitModel.TSP = data.TSP;
            this.unitTSP = this.decimalPipe.transform(data.TSP, "1.2-2");

            this.mstUnitModel.Status = data.Status;
            this.mstUnitModel.IsLocked = data.IsLocked;

            this.getHouseModelList(this.mstUnitModel.ProjectId);
            this.getSoldUnitData();

            this.isLockedButtons(this.mstUnitModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public getHouseModelList(projectId: number): void {
    this.mstHouseModelService.getHouseModelListPerProject(projectId).subscribe(
      data => {
        this.mstHouseModelModel = data;

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public disabledButtons(): void {
    this.isUnitSaveButtonDisabled = true;
    this.isUnitLockButtonDisabled = true;
    this.isUnitUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isUnitSaveButtonDisabled = isLocked;
    this.isUnitLockButtonDisabled = isLocked;
    this.isUnitUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveUnit(): void {
    this.disabledButtons();

    this.mstUnitService.saveUnit(this.mstUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Unit was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.mstUnitModel.IsLocked);
      }
    );
  }

  public buttonLockUnit(): void {
    this.mstUnitModel.IsLocked = true;
    this.disabledButtons();

    this.mstUnitService.lockUnit(this.mstUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Unit was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.mstUnitModel.IsLocked = false;
        }

        this.isLockedButtons(this.mstUnitModel.IsLocked);
      }
    );
  }

  public buttonUnlockUnit(): void {
    this.disabledButtons();

    this.mstUnitService.unlockUnit(this.mstUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Unit was successfully unlocked!', 'Unlock Successful');
          this.mstUnitModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.mstUnitModel.IsLocked = true;
        }

        this.isLockedButtons(this.mstUnitModel.IsLocked);
      }
    );
  }

  public onFocusNumberRemoveCommas(field: string) {
    if (field === "unitPrice") {
      this.unitPrice = this.unitPrice.split(',').join("");
    }
  }

  public onaBlurNumberAddCommas(numberValue: string, field: string) {
    if (field === "unitPrice") {
      this.unitPrice = this.decimalPipe.transform(numberValue, "1.2-2");
      this.mstUnitModel.Price = parseFloat(this.unitPrice.split(',').join(""));
    }
    if (field === "unitTLA") {
      this.unitTLA = this.decimalPipe.transform(numberValue, "1.2-2");
      this.mstUnitModel.TLA = parseFloat(this.unitTLA.split(',').join(""));
    }
    if (field === "unitTFA") {
      this.unitTFA = this.decimalPipe.transform(numberValue, "1.2-2");
      this.mstUnitModel.TFA = parseFloat(this.unitTFA.split(',').join(""));
    }
  }

  public onKeyUpComputeAmount(event: any, field: string) {
    let value = event.target.value;

    if (field === "unitPrice") {
      this.mstUnitModel.Price = value;
    }

    this.computeAmount();
  }

  public computeAmount(): void {
    console.log("wewew");

    let Price = this.mstUnitModel.Price;

    let MiscellaneousFeeRate = this.mstUnitModel.MiscellaneousFeeRate;
    let MiscellaneousFeeAmount = Price * (MiscellaneousFeeRate / 100);
    this.mstUnitModel.MiscellaneousFeeAmount = MiscellaneousFeeAmount;
    this.unitMiscellaneousFeeAmount = this.decimalPipe.transform(MiscellaneousFeeAmount, "1.2-2");

    let VATRate = this.mstUnitModel.VATRate;
    let VATAmount = Price * (VATRate / 100);
    this.mstUnitModel.VATAmount = VATAmount;
    this.unitVATAmount = this.decimalPipe.transform(VATAmount, "1.2-2");

    let TSP = parseFloat(this.unitPrice.split(',').join("")) + parseFloat(this.unitVATAmount.split(',').join("")) + parseFloat(this.unitMiscellaneousFeeAmount.split(',').join(""));
    this.mstUnitModel.TSP = TSP;
    this.unitTSP = this.decimalPipe.transform(TSP, "1.2-2");
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

  public getSoldUnitData(): void {
    this.soldUnitData = [];
    this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
    this.soldUnitDataSource.paginator = this.soldUnitPaginator;
    this.soldUnitDataSource.sort = this.soldUnitSort;

    this.trnSoldUnitService.getSoldUnitListByUnit(this.mstUnitModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitData = data;
          this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
          this.soldUnitDataSource.paginator = this.soldUnitPaginator;
          this.soldUnitDataSource.sort = this.soldUnitSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public soldUnitFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitDataSource.paginator) {
      this.soldUnitDataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.mstUserRights = {
      Id: 0,
      UserId: 0,
      PageId: 0,
      Page: "",
      PageURL: "",
      CanEdit: true,
      CanSave: true,
      CanLock: true,
      CanUnLock: true,
      CanPrint: true,
      CanDelete: true
    }

    this.mstUserRightsService.getUserRightPerCurrentUser("UNIT DETAIL").subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUserRights.Id = data.Id;
            this.mstUserRights.UserId = data.UserId;
            this.mstUserRights.PageId = data.PageId;
            this.mstUserRights.Page = data.Page;
            this.mstUserRights.PageURL = data.PageURL;
            this.mstUserRights.CanEdit = data.CanEdit;
            this.mstUserRights.CanSave = data.CanSave;
            this.mstUserRights.CanLock = data.CanLock;
            this.mstUserRights.CanUnLock = data.CanUnLock;
            this.mstUserRights.CanPrint = data.CanPrint;
            this.mstUserRights.CanDelete = data.CanDelete;

            this.getDropdownList();
          } else {
            this.isSpinnerShow = false;
            this.isPageForbidden = true;
          }
        }, 500);
      }
    );
  }

}
