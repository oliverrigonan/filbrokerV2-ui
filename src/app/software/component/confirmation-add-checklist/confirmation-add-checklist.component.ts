import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-add-checklist',
  templateUrl: './confirmation-add-checklist.component.html',
  styleUrls: ['./confirmation-add-checklist.component.css']
})
export class ConfirmationAddChecklistComponent implements OnInit {

  constructor(
    private confirmationAddChecklistDialog: MatDialogRef<ConfirmationAddChecklistComponent>,
    @Inject(MAT_DIALOG_DATA) private confirmationAddChecklistDialogData: any,
  ) { }

  public dialogAddChecklistTitle: string = this.confirmationAddChecklistDialogData.dialogAddChecklistTitle;
  public dialogAddChecklistMessage: string = this.confirmationAddChecklistDialogData.dialogAddChecklistMessage;

  public isButtonAddChecklistConfirmationDisabled: boolean = false;

  public buttonAddChecklistClick() {
    this.isButtonAddChecklistConfirmationDisabled = true;
    this.confirmationAddChecklistDialog.close(200);
  }

  public buttonCloseClick() {
    this.confirmationAddChecklistDialog.close(null);
  }

  ngOnInit(): void {

  }
}
