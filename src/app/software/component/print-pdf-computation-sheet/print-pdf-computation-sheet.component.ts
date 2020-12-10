import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-computation-sheet',
  templateUrl: './print-pdf-computation-sheet.component.html',
  styleUrls: ['./print-pdf-computation-sheet.component.css']
})
export class PrintPdfComputationSheetComponent implements OnInit {

  constructor(
    private printPdfComputationSheetDialog: MatDialogRef<PrintPdfComputationSheetComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfComputationSheetDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfComputationSheetDialogData.dialogTitle;
  public dialogData: any = this.printPdfComputationSheetDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfComputationSheet(id).subscribe(
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
    this.printPdfComputationSheetDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }
}
