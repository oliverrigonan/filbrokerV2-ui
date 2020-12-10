import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstCustomerModel } from './../../model/mst-customer.model';

@Component({
  selector: 'app-global-sold-unit-list',
  templateUrl: './global-sold-unit-list.component.html',
  styleUrls: ['./global-sold-unit-list.component.css']
})
export class GlobalSoldUnitListComponent implements OnInit {

  constructor(
    private globalSoldUnitListDialog: MatDialogRef<GlobalSoldUnitListComponent>,
    @Inject(MAT_DIALOG_DATA) private globalSoldUnitListDialogData: any,
  ) { }

  public dialogTitle: string = this.globalSoldUnitListDialogData.dialogTitle;
  public dialogData: any = this.globalSoldUnitListDialogData.dialogData;

  public customerData: MstCustomerModel = this.dialogData.customerData;
  public customerReport: string = this.dialogData.customerReport;

  public buttonCloseClick(): void {
    this.globalSoldUnitListDialog.close(null);
  }

  ngOnInit(): void {

  }

}
