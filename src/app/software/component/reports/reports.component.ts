import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public isButtonExportDisabled: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  public isSpinnerShow: boolean = false;
  public isContentShow: boolean = true;

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public startDateFilterFormControl = new FormControl(this.firstDay);
  public endDateFilterFormControl = new FormControl(this.lastDay);

  public dateRangeFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    
  }

  public buttonExport(): void {

  }

  ngOnInit(): void {

  }

}
