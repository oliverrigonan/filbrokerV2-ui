import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-statement-of-account',
  templateUrl: './print-pdf-statement-of-account.component.html',
  styleUrls: ['./print-pdf-statement-of-account.component.css']
})
export class PrintPdfStatementOfAccountComponent implements OnInit {

  constructor(
    private printPdfStatementOfAccountDialog: MatDialogRef<PrintPdfStatementOfAccountComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfStatementOfAccountDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfStatementOfAccountDialogData.dialogTitle;
  public dialogData: any = this.printPdfStatementOfAccountDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfStatementOfAccount(id).subscribe(
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
    this.printPdfStatementOfAccountDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }

}
