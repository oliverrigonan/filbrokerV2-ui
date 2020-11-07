import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete',
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.css']
})
export class ConfirmationDeleteComponent implements OnInit {

  constructor(
    private confirmationDeleteDialog: MatDialogRef<ConfirmationDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private confirmationDeleteDialogData: any,
  ) { }

  public dialogDeleteTitle: string = this.confirmationDeleteDialogData.dialogDeleteTitle;
  public dialogDeleteMessage: string = this.confirmationDeleteDialogData.dialogDeleteMessage;
  public dialogDeleteId: number = this.confirmationDeleteDialogData.dialogDeleteId;

  public isButtonDeleteConfirmationDisabled: boolean = false;

  public buttonDeleteClick() {
    this.isButtonDeleteConfirmationDisabled = true;
    this.confirmationDeleteDialog.close(this.dialogDeleteId);
  }

  public buttonCloseClick() {
    this.confirmationDeleteDialog.close(null);
  }

  ngOnInit(): void {
    
  }

}
