import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-cancel',
  templateUrl: './confirmation-cancel.component.html',
  styleUrls: ['./confirmation-cancel.component.css']
})
export class ConfirmationCancelComponent implements OnInit {

  constructor(
    private confirmationCancelDialog: MatDialogRef<ConfirmationCancelComponent>,
    @Inject(MAT_DIALOG_DATA) private confirmationCancelDialogData: any,
  ) { }

  public dialogCancelTitle: string = this.confirmationCancelDialogData.dialogCancelTitle;
  public dialogCancelMessage: string = this.confirmationCancelDialogData.dialogCancelMessage;
  public dialogCancelId: number = this.confirmationCancelDialogData.dialogCancelId;

  public isButtonCancelConfirmationDisabled: boolean = false;

  public buttonCancelClick() {
    this.isButtonCancelConfirmationDisabled = true;
    this.confirmationCancelDialog.close(this.dialogCancelId);
  }

  public buttonCloseClick() {
    this.confirmationCancelDialog.close(null);
  }

  ngOnInit(): void {

  }

}
