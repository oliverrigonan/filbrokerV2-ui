import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TrnCollectionModel } from './../../model/trn-collection.model';

import { TrnCollectionService } from './../../service/trn-collection/trn-collection.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-activity-collection-list',
  templateUrl: './activity-collection-list.component.html',
  styleUrls: ['./activity-collection-list.component.css']
})
export class ActivityCollectionListComponent implements OnInit {

  public collectionDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'CollectionNumber',
    'CollectionDate',
    'Customer',
    'Particulars',
    'IsLocked',
  ];

  public collectionDataSource: MatTableDataSource<TrnCollectionModel>;
  public collectionData: TrnCollectionModel[] = []

  @ViewChild('collectionPaginator') public collectionPaginator: MatPaginator;
  @ViewChild('collectionSort') public collectionSort: MatSort;

  public isButtonAddCollectionDisabled: boolean = false;

  constructor(
    private trnCollectionService: TrnCollectionService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public collectionListStartDateFilterFormControl = new FormControl(this.firstDay);
  public collectionEndDateFilterFormControl = new FormControl(this.lastDay);

  public collectionDateRangeFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.getCollectionData();
  }

  public getCollectionData(): void {
    this.collectionData = [];
    this.collectionDataSource = new MatTableDataSource(this.collectionData);
    this.collectionDataSource.paginator = this.collectionPaginator;
    this.collectionDataSource.sort = this.collectionSort;

    let collectionListStartDateFilterValue: string = new Date(this.collectionListStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let collectionEndDateFilterValue: string = new Date(this.collectionEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.trnCollectionService.getCollectionListByDateRange(collectionListStartDateFilterValue, collectionEndDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.collectionData = data;
          this.collectionDataSource = new MatTableDataSource(this.collectionData);
          this.collectionDataSource.paginator = this.collectionPaginator;
          this.collectionDataSource.sort = this.collectionSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public collectionFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.collectionDataSource.filter = filterValue.trim().toLowerCase();

    if (this.collectionDataSource.paginator) {
      this.collectionDataSource.paginator.firstPage();
    }
  }

  public buttonAddCollection(): void {
    this.isButtonAddCollectionDisabled = true;

    let currentDate = new Date();

    let trnCollectionModel: TrnCollectionModel = {
      Id: 0,
      CollectionNumber: "",
      CollectionDate: currentDate.toLocaleDateString(),
      CustomerId: 0,
      Customer: "",
      Particulars: "",
      PreparedBy: 0,
      CheckedBy: 0,
      ApprovedBy: 0,
      UpdatedBy: 0,
      IsLocked: false
    };

    this.trnCollectionService.addCollection(trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Collection was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/activity-collection-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddCollectionDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddCollectionDisabled = false;
        }

      }
    );
  }

  public buttonEditCollection(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/activity-collection-detail/' + id]);
  }

  public buttonDeleteCollection(currentData: any): void {
    let id = currentData.Id;

    const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
      width: '450px',
      data: {
        dialogDeleteTitle: "Delete Sold Unit",
        dialogDeleteMessage: "Are you sure you want to delete this collection number " + currentData.CollectionNumber,
        dialogDeleteId: id
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {

      if (result != null) {
        this.isSpinnerShow = true;
        this.isContentShow = false;

        this.trnCollectionService.deleteCollection(result).subscribe(
          data => {

            if (data[0] == true) {
              this.toastr.success('Collection was successfully deleted!', 'Delete Successful');
              this.getCollectionData();
            } else {
              this.toastr.error(data[1], 'Delete Failed');

              this.isSpinnerShow = false;
              this.isContentShow = true;
            }

          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.getCollectionData();
  }
}
