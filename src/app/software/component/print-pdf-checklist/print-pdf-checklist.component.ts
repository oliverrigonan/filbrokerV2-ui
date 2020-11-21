import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-checklist',
  templateUrl: './print-pdf-checklist.component.html',
  styleUrls: ['./print-pdf-checklist.component.css']
})
export class PrintPdfChecklistComponent implements OnInit {

  constructor(
    private printPdfChecklistDialog: MatDialogRef<PrintPdfChecklistComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfChecklistDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfChecklistDialogData.dialogTitle;
  public dialogData: any = this.printPdfChecklistDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfChecklist(id).subscribe(
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
    this.printPdfChecklistDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }

}
