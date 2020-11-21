import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RepPDFService } from './../../service/rep-PDF/rep-pdf.service';

@Component({
  selector: 'app-print-pdf-sold-unit-proposal',
  templateUrl: './print-pdf-sold-unit-proposal.component.html',
  styleUrls: ['./print-pdf-sold-unit-proposal.component.css']
})
export class PrintPdfSoldUnitProposalComponent implements OnInit {

  constructor(
    private printPdfSoldUnitProposalDialog: MatDialogRef<PrintPdfSoldUnitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) private printPdfSoldUnitProposalDialogData: any,
    private repPDFService: RepPDFService
  ) { }

  public dialogTitle: string = this.printPdfSoldUnitProposalDialogData.dialogTitle;
  public dialogData: any = this.printPdfSoldUnitProposalDialogData.dialogData;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public pdfSource: string = "";

  public print(): void {
    let id = this.dialogData.Id;

    this.repPDFService.printPdfSoldUnitProposal(id).subscribe(
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
    this.printPdfSoldUnitProposalDialog.close(null);
  }

  ngOnInit(): void {
    this.print();
  }

}
