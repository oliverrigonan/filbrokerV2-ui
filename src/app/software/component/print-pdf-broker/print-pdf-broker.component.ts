import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-broker',
  templateUrl: './print-pdf-broker.component.html',
  styleUrls: ['./print-pdf-broker.component.css']
})
export class PrintPdfBrokerComponent implements OnInit {

  constructor(
    private printPdfBrokerDialog: MatDialogRef<PrintPdfBrokerComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfBrokerDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfBrokerDialogData.dialogTitle;
  public dialogData: any = this.printPdfBrokerDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfBroker(id).subscribe(
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
    this.printPdfBrokerDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }

}
