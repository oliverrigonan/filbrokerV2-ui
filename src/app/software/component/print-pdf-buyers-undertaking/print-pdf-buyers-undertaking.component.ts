import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-buyers-undertaking',
  templateUrl: './print-pdf-buyers-undertaking.component.html',
  styleUrls: ['./print-pdf-buyers-undertaking.component.css']
})
export class PrintPdfBuyersUndertakingComponent implements OnInit {

  constructor(
    private printPdfBuyersUndertakingDialog: MatDialogRef<PrintPdfBuyersUndertakingComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfBuyersUndertakingDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfBuyersUndertakingDialogData.dialogTitle;
  public dialogData: any = this.printPdfBuyersUndertakingDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfBuyersUndertaking(id).subscribe(
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
    this.printPdfBuyersUndertakingDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }
}
