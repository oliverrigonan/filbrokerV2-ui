import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

import { MstUserRights } from './../../model/mst-user-rights.model';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';
@Component({
  selector: 'app-setup-customer-list',
  templateUrl: './setup-customer-list.component.html',
  styleUrls: ['./setup-customer-list.component.css']
})
export class SetupCustomerListComponent implements OnInit {

  public customerDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'CustomerCode',
    'Customer',
    'EmailAddress',
    'TelephoneNumber',
    'MobileNumber',
    'Status',
    'IsLocked',
    'Space'
  ];

  public customerDataSource: MatTableDataSource<MstCustomerModel>;
  public customerData: MstCustomerModel[] = []

  @ViewChild('customerPaginator') public customerPaginator: MatPaginator;
  @ViewChild('customerSort') public customerSort: MatSort;

  public isButtonAddCustomerDisabled: boolean = false;

  constructor(
    private mstCustomerService: MstCustomerService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private mstUserRightsService: MstUserRightsService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;
  public isPageForbidden: boolean = false;


  public mstUserRights: MstUserRights = new MstUserRights();

  public getCustomerData(): void {
    this.customerData = [];
    this.customerDataSource = new MatTableDataSource(this.customerData);
    this.customerDataSource.paginator = this.customerPaginator;
    this.customerDataSource.sort = this.customerSort;

    this.mstCustomerService.getCustomerList().subscribe(
      data => {
        if (data.length > 0) {
          this.customerData = data;
          this.customerDataSource = new MatTableDataSource(this.customerData);
          this.customerDataSource.paginator = this.customerPaginator;
          this.customerDataSource.sort = this.customerSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;

      }
    );
  }

  public customerFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.customerDataSource.paginator) {
      this.customerDataSource.paginator.firstPage();
    }
  }

  public buttonAddCustomer(): void {
    this.isButtonAddCustomerDisabled = true;

    let currentDate = new Date();

    let mstCustomerModel: MstCustomerModel = {
      Id: 0,
      CustomerCode: "",
      LastName: "",
      FirstName: "",
      MiddleName: "",
      FullName: "",
      Gender: "",
      CivilStatus: "",
      BirthDate: currentDate.toLocaleDateString(),
      Citizen: "",
      TIN: "",
      IdType: "",
      IdNumber: "",
      Address: "",
      City: "",
      Province: "",
      Country: "",
      ZipCode: "",
      EmailAddress: "",
      TelephoneNumber: "",
      MobileNumber: "",
      Employer: "",
      EmployerIndustry: "",
      NoOfYearsEmployed: 0,
      Position: "",
      EmploymentStatus: "",
      EmployerAddress: "",
      EmployerCity: "",
      EmployerProvince: "",
      EmployerCountry: "",
      EmployerZipCode: "",
      EmployerTelephoneNumber: "",
      EmployerMobileNumber: "",
      Picture: "",
      Attachment1: "",
      Attachment2: "",
      Attachment3: "",
      Attachment4: "",
      Attachment5: "",
      SpouseLastName: "",
      SpouseFirstName: "",
      SpouseMiddleName: "",
      SpouseBirthDate: currentDate.toLocaleDateString(),
      SpouseCitizen: "",
      SpouseTIN: "",
      SpouseEmployer: "",
      Remarks: "",
      Status: "ACTIVE",
      IsLocked: false,
      BusinessName: "",
      BusinessAddress: "",
      BusinessType: "",
      BusinessPosition: ""
    };

    this.mstCustomerService.addCustomer(mstCustomerModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Customer was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/setup-customer-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddCustomerDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddCustomerDisabled = false;
        }

      }
    );
  }

  public buttonEditCustomer(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/setup-customer-detail/' + id]);
  }

  public buttonDeleteCustomer(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Customer",
          dialogDeleteMessage: "Are you sure you want to delete this customer " + currentData.FullName + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.mstCustomerService.deleteCustomer(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Customer was successfully deleted!', 'Delete Successful');
                this.getCustomerData();
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
    this.mstUserRights = {
      Id: 0,
      UserId: 0,
      PageId: 0,
      Page: "",
      PageURL: "",
      CanEdit: true,
      CanSave: true,
      CanLock: true,
      CanUnLock: true,
      CanPrint: true,
      CanDelete: true
    }

    this.mstUserRightsService.getUserRightPerCurrentUser("CUSTOMER LIST").subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUserRights.Id = data.Id;
            this.mstUserRights.UserId = data.UserId;
            this.mstUserRights.PageId = data.PageId;
            this.mstUserRights.Page = data.Page;
            this.mstUserRights.PageURL = data.PageURL;
            this.mstUserRights.CanEdit = data.CanEdit;
            this.mstUserRights.CanSave = data.CanSave;
            this.mstUserRights.CanLock = data.CanLock;
            this.mstUserRights.CanUnLock = data.CanUnLock;
            this.mstUserRights.CanPrint = data.CanPrint;
            this.mstUserRights.CanDelete = data.CanDelete;

            if (data.CanEdit == false && data.CanDelete == false) {
              this.customerDisplayedColumns = [
                'CustomerCode',
                'Customer',
                'EmailAddress',
                'TelephoneNumber',
                'MobileNumber',
                'Status',
                'IsLocked',
                'Space'
              ];
            } else {
              if (data.CanEdit == false) {
                this.customerDisplayedColumns = [
                  'ButtonDelete',
                  'CustomerCode',
                  'Customer',
                  'EmailAddress',
                  'TelephoneNumber',
                  'MobileNumber',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              } else if (data.CanDelete == false) {
                this.customerDisplayedColumns = [
                  'ButtonEdit',
                  'CustomerCode',
                  'Customer',
                  'EmailAddress',
                  'TelephoneNumber',
                  'MobileNumber',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              } else {
                this.customerDisplayedColumns = [
                  'ButtonEdit',
                  'ButtonDelete',
                  'CustomerCode',
                  'Customer',
                  'EmailAddress',
                  'TelephoneNumber',
                  'MobileNumber',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              }
            }
            this.getCustomerData();
          } else {
            this.isSpinnerShow = false;
            this.isPageForbidden = true;
          }
        }, 500);
      }
    );
  }
}
