import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-reservation-agreement',
  templateUrl: './print-pdf-reservation-agreement.component.html',
  styleUrls: ['./print-pdf-reservation-agreement.component.css']
})
export class PrintPdfReservationAgreementComponent implements OnInit {

  constructor(
    private printPdfReservationAgreementDialog: MatDialogRef<PrintPdfReservationAgreementComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfReservationAgreementDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfReservationAgreementDialogData.dialogTitle;
  public dialogData: any = this.printPdfReservationAgreementDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfReservationAgreement(id).subscribe(
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
    this.printPdfReservationAgreementDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }
}
