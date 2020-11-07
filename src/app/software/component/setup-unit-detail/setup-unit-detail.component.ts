import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MstHouseModelModel } from './../../model/mst-house-model.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstUnitModel } from './../../model/mst-unit.model';

import { MstHouseModelService } from './../../service/mst-house-model/mst-house-model.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstUnitService } from './../../service/mst-unit/mst-unit.service';

import { ToastrService } from 'ngx-toastr';

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
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstUnitModel: MstUnitModel = new MstUnitModel();
  public mstHouseModelModel: MstHouseModelModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];

  public isUnitSaveButtonDisabled: boolean = false;
  public isUnitLockButtonDisabled: boolean = false;
  public isUnitUnlockButtonDisabled: boolean = false;

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
            this.mstUnitModel.TFA = data.TFA;
            this.mstUnitModel.Price = data.Price;
            this.mstUnitModel.TSP = data.TSP;
            this.mstUnitModel.Status = data.Status;
            this.mstUnitModel.IsLocked = data.IsLocked;

            this.getHouseModelList(this.mstUnitModel.ProjectId);
            
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

  ngOnInit(): void {
    this.getDropdownList();
  }

}
