import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstBrokerModel } from './../../model/mst-broker.model';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstBrokerService } from './../../service/mst-broker/mst-broker.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup-broker-detail',
  templateUrl: './setup-broker-detail.component.html',
  styleUrls: ['./setup-broker-detail.component.css']
})
export class SetupBrokerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sysDropdownService: SysDropdownService,
    private mstBrokerService: MstBrokerService,
    private toastr: ToastrService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstBrokerModel: MstBrokerModel = new MstBrokerModel();

  public sysDropdownModelBrokerStatus: SysDropdownModel[] = [];
  public sysDropdownModelCivilStatus: SysDropdownModel[] = [];
  public sysDropdownModelGender: SysDropdownModel[] = [];
  public sysDropdownModelIDType: SysDropdownModel[] = [];
  public sysDropdownModelEmploymentStatus: SysDropdownModel[] = [];

  public isBrokerSaveButtonDisabled: boolean = false;
  public isBrokerLockButtonDisabled: boolean = false;
  public isBrokerUnlockButtonDisabled: boolean = false;

  public birthDate: Date = new Date();

  @ViewChild("inputFileAttachment1") public inputFileAttachment1: any;
  @ViewChild("inputFileAttachment2") public inputFileAttachment2: any;
  @ViewChild("inputFileAttachment3") public inputFileAttachment3: any;
  @ViewChild("inputFileAttachment4") public inputFileAttachment4: any;
  @ViewChild("inputFileAttachment5") public inputFileAttachment5: any;
  public isUploadDisabled: boolean = false;

  public getDropdownListBrokerStatus(): void {
    this.sysDropdownService.getDropdownList("BROKER STATUS").subscribe(
      data => {
        this.sysDropdownModelBrokerStatus = data;
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

        let id = this.route.snapshot.params['id'];
        this.getBrokerDetail(id);
      }
    );
  }

  public getBrokerDetail(id: number): void {
    this.mstBrokerService.getBrokerDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstBrokerModel.Id = data.Id;
            this.mstBrokerModel.BrokerCode = data.BrokerCode;
            this.mstBrokerModel.LastName = data.LastName;
            this.mstBrokerModel.FirstName = data.FirstName;
            this.mstBrokerModel.MiddleName = data.MiddleName;
            this.mstBrokerModel.FullName = data.FullName;
            this.mstBrokerModel.LicenseNumber = data.LicenseNumber;
            this.mstBrokerModel.BirthDate = data.BirthDate;
            this.birthDate = new Date(data.BirthDate);
            this.mstBrokerModel.CivilStatus = data.CivilStatus;
            this.mstBrokerModel.Gender = data.Gender;
            this.mstBrokerModel.Address = data.Address;
            this.mstBrokerModel.TelephoneNumber = data.TelephoneNumber;
            this.mstBrokerModel.MobileNumber = data.MobileNumber;
            this.mstBrokerModel.Religion = data.Religion;
            this.mstBrokerModel.EmailAddress = data.EmailAddress;
            this.mstBrokerModel.Facebook = data.Facebook;
            this.mstBrokerModel.TIN = data.TIN;
            this.mstBrokerModel.RealtyFirm = data.RealtyFirm;
            this.mstBrokerModel.RealtyFirmAddress = data.RealtyFirmAddress;
            this.mstBrokerModel.RealtyFirmTelephoneNumber = data.RealtyFirmTelephoneNumber;
            this.mstBrokerModel.RealtyFirmMobileNumber = data.RealtyFirmMobileNumber;
            this.mstBrokerModel.RealtyFirmFaxNumber = data.RealtyFirmFaxNumber;
            this.mstBrokerModel.RealtyFirmEmailAddress = data.RealtyFirmEmailAddress;
            this.mstBrokerModel.RealtyFirmWebsite = data.RealtyFirmWebsite;
            this.mstBrokerModel.RealtyFirmTIN = data.RealtyFirmTIN;
            this.mstBrokerModel.Organization = data.Organization;
            this.mstBrokerModel.Remarks = data.Remarks;
            this.mstBrokerModel.Picture = data.Picture;
            this.mstBrokerModel.Attachment1 = data.Attachment1;
            this.mstBrokerModel.Attachment2 = data.Attachment2;
            this.mstBrokerModel.Attachment3 = data.Attachment3;
            this.mstBrokerModel.Attachment4 = data.Attachment4;
            this.mstBrokerModel.Attachment5 = data.Attachment5;
            this.mstBrokerModel.Status = data.Status;
            this.mstBrokerModel.IsLocked = data.IsLocked;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.isLockedButtons(this.mstBrokerModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public birthDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.mstBrokerModel.BirthDate = this.birthDate.toString();
  }

  public disabledButtons(): void {
    this.isBrokerSaveButtonDisabled = true;
    this.isBrokerLockButtonDisabled = true;
    this.isBrokerUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isBrokerSaveButtonDisabled = isLocked;
    this.isBrokerLockButtonDisabled = isLocked;
    this.isBrokerUnlockButtonDisabled = !isLocked;
  }

  public buttonUploadAttachment1(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment1.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.mstBrokerService.uploadBrokerAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.mstBrokerModel.Attachment1 = URL;
              this.inputFileAttachment1.nativeElement.value = "";
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

  public buttonClearAttachment1(): void {
    this.mstBrokerModel.Attachment1 = "";
  }

  public buttonViewAttachment1(): void {
    let win = window.open(this.mstBrokerModel.Attachment1, '_blank');
    win.focus();
  }

  public buttonUploadAttachment2(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment2.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.mstBrokerService.uploadBrokerAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.mstBrokerModel.Attachment2 = URL;
              this.inputFileAttachment2.nativeElement.value = "";
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

  public buttonClearAttachment2(): void {
    this.mstBrokerModel.Attachment2 = "";
  }

  public buttonViewAttachment2(): void {
    let win = window.open(this.mstBrokerModel.Attachment2, '_blank');
    win.focus();
  }

  public buttonUploadAttachment3(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment3.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.mstBrokerService.uploadBrokerAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.mstBrokerModel.Attachment3 = URL;
              this.inputFileAttachment3.nativeElement.value = "";
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

  public buttonClearAttachment3(): void {
    this.mstBrokerModel.Attachment3 = "";
  }

  public buttonViewAttachment3(): void {
    let win = window.open(this.mstBrokerModel.Attachment3, '_blank');
    win.focus();
  }

  public buttonUploadAttachment4(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment4.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.mstBrokerService.uploadBrokerAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.mstBrokerModel.Attachment4 = URL;
              this.inputFileAttachment4.nativeElement.value = "";
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

  public buttonClearAttachment4(): void {
    this.mstBrokerModel.Attachment4 = "";
  }

  public buttonViewAttachment4(): void {
    let win = window.open(this.mstBrokerModel.Attachment4, '_blank');
    win.focus();
  }

  public buttonUploadAttachment5(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment5.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.mstBrokerService.uploadBrokerAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.mstBrokerModel.Attachment5 = URL;
              this.inputFileAttachment5.nativeElement.value = "";
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

  public buttonClearAttachment5(): void {
    this.mstBrokerModel.Attachment5 = "";
  }

  public buttonViewAttachment5(): void {
    let win = window.open(this.mstBrokerModel.Attachment5, '_blank');
    win.focus();
  }

  public buttonSaveBroker(): void {
    this.disabledButtons();

    this.mstBrokerService.saveBroker(this.mstBrokerModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Broker was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.mstBrokerModel.IsLocked);
      }
    );
  }

  public buttonLockBroker(): void {
    this.mstBrokerModel.IsLocked = true;
    this.disabledButtons();

    this.mstBrokerService.lockBroker(this.mstBrokerModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Broker was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.mstBrokerModel.IsLocked = false;
        }

        this.isLockedButtons(this.mstBrokerModel.IsLocked);
      }
    );
  }

  public buttonUnlockBroker(): void {
    this.disabledButtons();

    this.mstBrokerService.unlockBroker(this.mstBrokerModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Broker was successfully unlocked!', 'Unlock Successful');
          this.mstBrokerModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.mstBrokerModel.IsLocked = true;
        }

        this.isLockedButtons(this.mstBrokerModel.IsLocked);
      }
    );
  }

  ngOnInit(): void {
    this.getDropdownListBrokerStatus();
  }
}
