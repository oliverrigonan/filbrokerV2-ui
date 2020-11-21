import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-sold-unit-contract',
  templateUrl: './print-pdf-sold-unit-contract.component.html',
  styleUrls: ['./print-pdf-sold-unit-contract.component.css']
})
export class PrintPdfSoldUnitContractComponent implements OnInit {

  constructor(
    private printPdfSoldUnitContractDialog: MatDialogRef<PrintPdfSoldUnitContractComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfSoldUnitContractDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfSoldUnitContractDialogData.dialogTitle;
  public dialogData: any = this.printPdfSoldUnitContractDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfSoldUnitContract(id).subscribe(
      data => {

        setTimeout(() => {
          var binaryData = [];
          binaryData.push(data);

          this.pdfSource = URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }));

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }, 500);

      }
    );
  }

  public buttonCloseClick(): void {
    this.printPdfSoldUnitContractDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }

}
