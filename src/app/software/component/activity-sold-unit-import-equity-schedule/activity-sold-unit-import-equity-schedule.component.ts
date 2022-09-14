import { Component, OnInit, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';

import { TrnSoldUnitEquityScheduleService } from './../../service/trn-sold-unit-equity-schedule/trn-sold-unit-equity-schedule.service';

import { ToastrService } from 'ngx-toastr';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { TrnSoldUnitEquityScheduleModel } from '../../model/trn-sold-unit-equity-schedule.model';

@Component({
  selector: 'app-activity-sold-unit-import-equity-schedule',
  templateUrl: './activity-sold-unit-import-equity-schedule.component.html',
  styleUrls: ['./activity-sold-unit-import-equity-schedule.component.css']
})
export class ActivitySoldUnitImportEquityScheduleComponent implements OnInit {

  constructor(
    private activitySoldUnitImportEquityScheduleDialog: MatDialogRef<ActivitySoldUnitImportEquityScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) private activitySoldUnitImportEquityScheduleDialogData: any,
    private toastr: ToastrService,
    public decimalPipe: DecimalPipe,
    private trnSoldUnitEquityScheduleService: TrnSoldUnitEquityScheduleService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activitySoldUnitImportEquityScheduleDialogData.dialogTitle;
  public dialogData: any = this.activitySoldUnitImportEquityScheduleDialogData.dialogData;

  public isButtonImportDisabled: boolean = false;

  public selectedFile: any = null;
  public soldUnitEquityScheduleData: TrnSoldUnitEquityScheduleModel[] = [];

  public onFileSelect(input: HTMLInputElement) {
    const files = input.files;

    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = (fileLoadedEvent: any) => {
        this.isButtonImportDisabled = true;
        let soldUnitEquitySchedules: TrnSoldUnitEquityScheduleModel[] = [];

        const textFromFileLoaded = fileLoadedEvent.target.result;
        let lines = textFromFileLoaded.split("\n");

        for (let l = 1; l < lines.length; l++) {
          let cols = lines[l].split(",");

          let paymentDate: string = new Date(cols[0]).toLocaleDateString("fr-CA");
          let checkDate: string = cols[6] != '' ? new Date(cols[6]).toLocaleDateString("fr-CA") : '';

          soldUnitEquitySchedules.push({
            Id: 0,
            SoldUnitId: this.dialogData.Id,
            PaymentDate: paymentDate,
            SoldUnitNumber: this.dialogData.SoldUnitNumber,
            SoldUnitCustomer: this.dialogData.Customer,
            Amortization: cols[2],
            CheckNumber: cols[5],
            CheckDate: checkDate,
            CheckBank: cols[7],
            Remarks: cols[1],
            PaidAmount: cols[3],
            BalanceAmount: cols[4]
          });
        }

        this.soldUnitEquityScheduleData = soldUnitEquitySchedules;
      };

      fileReader.readAsText(fileToRead, "UTF-8");

      setTimeout(() => {
        this.isButtonImportDisabled = false;
        console.log(this.soldUnitEquityScheduleData);
      }, 500);
    }
  }

  public buttonDownloadTemplateSoldUnitEquitySchedule(): void {
    let data: any[] = [
      {
        PaymentDate: "Payment Date",
        Remarks: "Remarks",
        Amortization: "Amortization",
        PaidAmount: "Paid Amount",
        BalanceAmount: "Balance Amount",
        CheckNumber: "Check Number",
        CheckDate: "Check Date",
        CheckBank: "Check Bank"
      }
    ];

    new Angular5Csv(data, 'PDC Report Template');
  }

  public buttonImportClick() {
    this.isButtonImportDisabled = true;

    if (this.dialogData != null) {
      let soldUnitId: number = this.dialogData.Id;

      this.trnSoldUnitEquityScheduleService.importSoldUnitEquitySchedule(soldUnitId, this.soldUnitEquityScheduleData).subscribe(
        data => {
          if (data[0] == true) {
            this.toastr.success('Equity schedule was successfully imported!', 'Import Successful');
            this.activitySoldUnitImportEquityScheduleDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Import Failed');
            this.isButtonImportDisabled = false;
          }
        }
      );
    } else {
      this.toastr.error('Sold Unit Record not found!', 'Import Failed');
      this.isButtonImportDisabled = false;
    }
  }

  public buttonCloseClick() {
    this.activitySoldUnitImportEquityScheduleDialog.close(null);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isSpinnerShow = false;
      this.isContentShow = true;
    }, 500);
  }
}
