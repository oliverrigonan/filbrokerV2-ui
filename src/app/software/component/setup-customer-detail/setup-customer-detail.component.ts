import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstCustomerModel } from './../../model/mst-customer.model';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';

import { PrintPdfCustomerComponent } from './../../component/print-pdf-customer/print-pdf-customer.component';

import { ToastrService } from 'ngx-toastr';

import { GlobalSoldUnitListComponent } from './../global-sold-unit-list/global-sold-unit-list.component';

@Component({
  selector: 'app-setup-customer-detail',
  templateUrl: './setup-customer-detail.component.html',
  styleUrls: ['./setup-customer-detail.component.css']
})
export class SetupCustomerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sysDropdownService: SysDropdownService,
    private mstCustomerService: MstCustomerService,
    private printPdfCustomerDialog: MatDialog,
    private toastr: ToastrService,
    private globalSoldUnitListDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstCustomerModel: MstCustomerModel = new MstCustomerModel();

  public sysDropdownModelCustomerStatus: SysDropdownModel[] = [];
  public sysDropdownModelCivilStatus: SysDropdownModel[] = [];
  public sysDropdownModelGender: SysDropdownModel[] = [];
  public sysDropdownModelIDType: SysDropdownModel[] = [];
  public sysDropdownModelEmploymentStatus: SysDropdownModel[] = [];

  public isCustomerSaveButtonDisabled: boolean = false;
  public isCustomerLockButtonDisabled: boolean = false;
  public isCustomerUnlockButtonDisabled: boolean = false;
  public isCustomerPrintButtonDisabled: boolean = false;

  public birthDate: Date = new Date();
  public spouseBirthDate: Date = new Date();

  @ViewChild("imageURL") public imageURL: any;
  public isUploadDisabled: boolean = false;

  public getDropdownListCustomerStatus(): void {
    this.sysDropdownService.getDropdownList("CUSTOMER STATUS").subscribe(
      data => {
        this.sysDropdownModelCustomerStatus = data;
        this.getDropdownListCivilStatus();
      }
    );
  }

  public getDropdownListCivilStatus(): void {
    this.sysDropdownService.getDropdownList("CIVIL STATUS").subscribe(
      data => {
        this.sysDropdownModelCivilStatus = data;
        this.getDropdownListGender();
      }
    );
  }

  public getDropdownListGender(): void {
    this.sysDropdownService.getDropdownList("GENDER").subscribe(
      data => {
        this.sysDropdownModelGender = data;
        this.getDropdownListIDType();
      }
    );
  }

  public getDropdownListIDType(): void {
    this.sysDropdownService.getDropdownList("ID TYPE").subscribe(
      data => {
        this.sysDropdownModelIDType = data;
        this.getDropdownListEmploymentStatus();
      }
    );
  }

  public getDropdownListEmploymentStatus(): void {
    this.sysDropdownService.getDropdownList("EMPLOYMENT STATUS").subscribe(
      data => {
        this.sysDropdownModelEmploymentStatus = data;

        let id = this.route.snapshot.params['id'];
        this.getCustomerDetail(id);
      }
    );
  }

  public getCustomerDetail(id: number): void {
    this.mstCustomerService.getCustomerDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstCustomerModel.Id = data.Id;
            this.mstCustomerModel.CustomerCode = data.CustomerCode;
            this.mstCustomerModel.LastName = data.LastName;
            this.mstCustomerModel.FirstName = data.FirstName;
            this.mstCustomerModel.MiddleName = data.MiddleName;
            this.mstCustomerModel.FullName = data.FullName;
            this.mstCustomerModel.Gender = data.Gender;
            this.mstCustomerModel.CivilStatus = data.CivilStatus;
            this.mstCustomerModel.BirthDate = data.BirthDate;
            this.birthDate = new Date(data.BirthDate);
            this.mstCustomerModel.Citizen = data.Citizen;
            this.mstCustomerModel.TIN = data.TIN;
            this.mstCustomerModel.IdType = data.IdType;
            this.mstCustomerModel.IdNumber = data.IdNumber;
            this.mstCustomerModel.Address = data.Address;
            this.mstCustomerModel.City = data.City;
            this.mstCustomerModel.Province = data.Province;
            this.mstCustomerModel.Country = data.Country;
            this.mstCustomerModel.ZipCode = data.ZipCode;
            this.mstCustomerModel.EmailAddress = data.EmailAddress;
            this.mstCustomerModel.TelephoneNumber = data.TelephoneNumber;
            this.mstCustomerModel.MobileNumber = data.MobileNumber;
            this.mstCustomerModel.Employer = data.Employer;
            this.mstCustomerModel.EmployerIndustry = data.EmployerIndustry;
            this.mstCustomerModel.NoOfYearsEmployed = data.NoOfYearsEmployed;
            this.mstCustomerModel.Position = data.Position;
            this.mstCustomerModel.EmploymentStatus = data.EmploymentStatus;
            this.mstCustomerModel.EmployerAddress = data.EmployerAddress;
            this.mstCustomerModel.EmployerCity = data.EmployerCity;
            this.mstCustomerModel.EmployerProvince = data.EmployerProvince;
            this.mstCustomerModel.EmployerCountry = data.EmployerCountry;
            this.mstCustomerModel.EmployerZipCode = data.EmployerZipCode;
            this.mstCustomerModel.EmployerTelephoneNumber = data.EmployerTelephoneNumber;
            this.mstCustomerModel.EmployerMobileNumber = data.EmployerMobileNumber;
            this.mstCustomerModel.Picture = data.Picture;
            this.mstCustomerModel.SpouseLastName = data.SpouseLastName;
            this.mstCustomerModel.SpouseFirstName = data.SpouseFirstName;
            this.mstCustomerModel.SpouseMiddleName = data.SpouseMiddleName;
            this.mstCustomerModel.SpouseBirthDate = data.SpouseBirthDate;
            this.spouseBirthDate = new Date(data.SpouseBirthDate);
            this.mstCustomerModel.SpouseCitizen = data.SpouseCitizen;
            this.mstCustomerModel.SpouseTIN = data.SpouseTIN;
            this.mstCustomerModel.SpouseEmployer = data.SpouseEmployer;
            this.mstCustomerModel.Remarks = data.Remarks;
            this.mstCustomerModel.Status = data.Status;
            this.mstCustomerModel.IsLocked = data.IsLocked;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.isLockedButtons(this.mstCustomerModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public birthDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.mstCustomerModel.BirthDate = this.birthDate.toString();
  }

  public spouseBirthDateDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.mstCustomerModel.SpouseBirthDate = this.spouseBirthDate.toString();
  }

  public disabledButtons(): void {
    this.isCustomerSaveButtonDisabled = true;
    this.isCustomerLockButtonDisabled = true;
    this.isCustomerUnlockButtonDisabled = true;
    this.isCustomerPrintButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isCustomerSaveButtonDisabled = isLocked;
    this.isCustomerLockButtonDisabled = isLocked;
    this.isCustomerUnlockButtonDisabled = !isLocked;
    this.isCustomerPrintButtonDisabled = !isLocked;
  }

  public inputFileChange(): void {
    let fi = this.imageURL.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
    }
  }

  public buttonUploadImage(): void {
    this.isUploadDisabled = true;

    let fi = this.imageURL.nativeElement;

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.mstCustomerService.uploadCustomerImage(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Photo was successfully uploaded!', 'Upload Successful');
              let imageURL = data[1];
              this.mstCustomerModel.Picture = imageURL;
              this.imageURL.nativeElement.value = "";
            } else {
              this.toastr.error(data[1], 'Upload Failed');
            }

            this.isUploadDisabled = false;
          }, 100);

        }
      );
    } else {
      this.toastr.error("No file chosen.", 'Upload Failed');
      this.isUploadDisabled = false;
    }
  }

  public buttonClearImage(): void {
    this.mstCustomerModel.Picture = "";
  }

  public buttonSaveCustomer(): void {
    this.disabledButtons();

    this.mstCustomerService.saveCustomer(this.mstCustomerModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Customer was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.mstCustomerModel.IsLocked);
      }
    );
  }

  public buttonLockCustomer(): void {
    this.mstCustomerModel.IsLocked = true;
    this.disabledButtons();

    this.mstCustomerService.lockCustomer(this.mstCustomerModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Customer was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.mstCustomerModel.IsLocked = false;
        }

        this.isLockedButtons(this.mstCustomerModel.IsLocked);
      }
    );
  }

  public buttonUnlockCustomer(): void {
    this.disabledButtons();

    this.mstCustomerService.unlockCustomer(this.mstCustomerModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Customer was successfully unlocked!', 'Unlock Successful');
          this.mstCustomerModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.mstCustomerModel.IsLocked = true;
        }

        this.isLockedButtons(this.mstCustomerModel.IsLocked);
      }
    );
  }

  public buttonPrintCustomer(): void {
    if (this.mstCustomerModel.IsLocked == false) {
      this.toastr.error("Cannot print an unlocked record.", 'Print Failed');
    } else {
      const openDialog = this.printPdfCustomerDialog.open(PrintPdfCustomerComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Customer",
          dialogData: this.mstCustomerModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    }
  }

  public buttonPrintBuyersUndertaking(): void {
    if (this.mstCustomerModel.IsLocked == false) {
      this.toastr.error("Cannot print an unlocked record.", 'Print Failed');
    } else {
      const openDialog = this.globalSoldUnitListDialog.open(GlobalSoldUnitListComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Buyers Undertaking. Select Sold Unit No.",
          dialogData: {
            customerData: this.mstCustomerModel,
            customerReport: "Buyers Undertaking"
          }
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    }
  }

  public buttonPrintReservationAgreement(): void {
    if (this.mstCustomerModel.IsLocked == false) {
      this.toastr.error("Cannot print an unlocked record.", 'Print Failed');
    } else {
      const openDialog = this.globalSoldUnitListDialog.open(GlobalSoldUnitListComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Reservation Agreement. Select Sold Unit No.",
          dialogData: {
            customerData: this.mstCustomerModel,
            customerReport: "Reservation Agreement"
          }
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    }
  }

  public buttonPrintComputationSheet(): void {
    if (this.mstCustomerModel.IsLocked == false) {
      this.toastr.error("Cannot print an unlocked record.", 'Print Failed');
    } else {
      const openDialog = this.globalSoldUnitListDialog.open(GlobalSoldUnitListComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Computation Sheet. Select Sold Unit No.",
          dialogData: {
            customerData: this.mstCustomerModel,
            customerReport: "Computation Sheet"
          }
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    }
  }

  ngOnInit(): void {
    this.getDropdownListCustomerStatus();
  }

}
