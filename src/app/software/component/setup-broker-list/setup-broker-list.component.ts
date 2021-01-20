import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstBrokerModel } from './../../model/mst-broker.model';
import { MstBrokerService } from './../../service/mst-broker/mst-broker.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-setup-broker-list',
  templateUrl: './setup-broker-list.component.html',
  styleUrls: ['./setup-broker-list.component.css']
})
export class SetupBrokerListComponent implements OnInit {

  public brokerDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'BrokerCode',
    'Broker',
    'Address',
    'Status',
    'IsLocked',
    'Space'
  ];

  public brokerDataSource: MatTableDataSource<MstBrokerModel>;
  public brokerData: MstBrokerModel[] = []

  @ViewChild('brokerPaginator') public brokerPaginator: MatPaginator;
  @ViewChild('brokerSort') public brokerSort: MatSort;

  public isButtonAddBrokerDisabled: boolean = false;

  constructor(
    private mstBrokerService: MstBrokerService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public getBrokerData(): void {
    this.brokerData = [];
    this.brokerDataSource = new MatTableDataSource(this.brokerData);
    this.brokerDataSource.paginator = this.brokerPaginator;
    this.brokerDataSource.sort = this.brokerSort;

    this.mstBrokerService.getBrokerList().subscribe(
      data => {
        if (data.length > 0) {
          this.brokerData = data;
          this.brokerDataSource = new MatTableDataSource(this.brokerData);
          this.brokerDataSource.paginator = this.brokerPaginator;
          this.brokerDataSource.sort = this.brokerSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public brokerFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.brokerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.brokerDataSource.paginator) {
      this.brokerDataSource.paginator.firstPage();
    }
  }

  public buttonAddBroker(): void {
    this.isButtonAddBrokerDisabled = true;

    let currentDate = new Date();

    let mstBrokerModel: MstBrokerModel = {
      Id: 0,
      BrokerCode: "",
      LastName: "",
      FirstName: "",
      MiddleName: "",
      FullName: "",
      LicenseNumber: "",
      LicenseNumberValidUntil: "",
      BirthDate: currentDate.toLocaleDateString(),
      CivilStatus: "",
      Gender: "",
      Address: "",
      TelephoneNumber: "",
      MobileNumber: "",
      Religion: "",
      EmailAddress: "",
      Facebook: "",
      TIN: "",
      HLURBRegistrationNumber: "",
      RealtyFirm: "",
      RealtyFirmAddress: "",
      RealtyFirmTelephoneNumber: "",
      RealtyFirmMobileNumber: "",
      RealtyFirmFaxNumber: "",
      RealtyFirmEmailAddress: "",
      RealtyFirmWebsite: "",
      RealtyFirmTIN: "",
      RealtyFirmLicenseNumber: "",
      RealtyFirmLicenseNumberValidUntil: "",
      RealtyFormHLURBRegistrationNumber: "",
      Organization: "",
      Remarks: "",
      Picture: "",
      Attachment1: "",
      Attachment2: "",
      Attachment3: "",
      Attachment4: "",
      Attachment5: "",
      Status: "ACTIVE",
      IsLocked: false,
      Type: "BROKER / SALES AGENT"
    };

    this.mstBrokerService.addBroker(mstBrokerModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Broker was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/setup-broker-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddBrokerDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddBrokerDisabled = false;
        }

      }
    );
  }

  public buttonEditBroker(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/setup-broker-detail/' + id]);
  }

  public buttonDeleteBroker(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Broker",
          dialogDeleteMessage: "Are you sure you want to delete this broker " + currentData.FullName + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.mstBrokerService.deleteBroker(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Broker was successfully deleted!', 'Delete Successful');
                this.getBrokerData();
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
  }

  ngOnInit(): void {
    this.getBrokerData();
  }
}
