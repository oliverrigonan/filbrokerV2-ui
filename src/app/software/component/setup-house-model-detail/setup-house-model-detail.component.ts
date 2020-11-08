import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstHouseModelModel } from './../../model/mst-house-model.model';

import { MstHouseModelService } from './../../service/mst-house-model/mst-house-model.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup-house-model-detail',
  templateUrl: './setup-house-model-detail.component.html',
  styleUrls: ['./setup-house-model-detail.component.css']
})
export class SetupHouseModelDetailComponent implements OnInit {

  constructor(
    private setupHouseModelDetailDialog: MatDialogRef<SetupHouseModelDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private setupHouseModelDetailDialogData: any,
    private toastr: ToastrService,
    private mstHouseModelService: MstHouseModelService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.setupHouseModelDetailDialogData.dialogTitle;
  public dialogData: any = this.setupHouseModelDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public mstHouseModelModel: MstHouseModelModel = new MstHouseModelModel();

  public getHouseModelDetail() {
    this.mstHouseModelService.getHouseModelDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstHouseModelModel.Id = data.Id;
            this.mstHouseModelModel.HouseModelCode = data.HouseModelCode;
            this.mstHouseModelModel.HouseModel = data.HouseModel;
            this.mstHouseModelModel.HouseModel = data.HouseModel;
            this.mstHouseModelModel.ProjectId = data.ProjectId;
            this.mstHouseModelModel.Project = data.Project;
            this.mstHouseModelModel.TFA = data.TFA;
            this.mstHouseModelModel.Price = data.Price;
            this.mstHouseModelModel.IsLocked = data.IsLocked;
          } else {
            this.mstHouseModelModel.ProjectId = this.dialogData.ProjectId;
            this.mstHouseModelModel.Project = this.dialogData.Project;
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }, 500);

      }
    );
  }

  public buttonSaveClick() {
    this.isButtonSaveConfirmationDisabled = true;

    if (this.dialogData.Id == 0) {
      this.mstHouseModelService.addHouseModel(this.mstHouseModelModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('House model was successfully added!', 'Add Successful');
            this.setupHouseModelDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.mstHouseModelService.saveHouseModel(this.mstHouseModelModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('House model was successfully updated!', 'Save Successful');
            this.setupHouseModelDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.setupHouseModelDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getHouseModelDetail();
  }

}
