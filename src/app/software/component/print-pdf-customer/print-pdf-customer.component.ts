import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-customer',
  templateUrl: './print-pdf-customer.component.html',
  styleUrls: ['./print-pdf-customer.component.css']
})
export class PrintPdfCustomerComponent implements OnInit {

  constructor(
    private printPdfCustomerDialog: MatDialogRef<PrintPdfCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfCustomerDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfCustomerDialogData.dialogTitle;
  public dialogData: any = this.printPdfCustomerDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfCustomer(id).subscribe(
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
    this.printPdfCustomerDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }

}
