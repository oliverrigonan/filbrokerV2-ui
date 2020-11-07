import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstProjectModel } from './../../model/mst-project.model';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstProjectService } from './../../service/mst-project/mst-project.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup-project-detail',
  templateUrl: './setup-project-detail.component.html',
  styleUrls: ['./setup-project-detail.component.css']
})
export class SetupProjectDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sysDropdownService: SysDropdownService,
    private mstProjectService: MstProjectService,
    private toastr: ToastrService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstProjectModel: MstProjectModel = new MstProjectModel();
  public sysDropdownModel: SysDropdownModel[] = [];

  public isProjectSaveButtonDisabled: boolean = false;
  public isProjectLockButtonDisabled: boolean = false;
  public isProjectUnlockButtonDisabled: boolean = false;

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("PROJECT STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getProjectDetail(id);
      }
    );
  }

  public getProjectDetail(id: number): void {
    this.mstProjectService.getProjectDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstProjectModel.Id = data.Id;
            this.mstProjectModel.ProjectCode = data.ProjectCode;
            this.mstProjectModel.Project = data.Project;
            this.mstProjectModel.Project = data.Project;
            this.mstProjectModel.Address = data.Address;
            this.mstProjectModel.Status = data.Status;
            this.mstProjectModel.ProjectLogo = data.ProjectLogo;
            this.mstProjectModel.IsLocked = data.IsLocked;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.isLockedButtons(this.mstProjectModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public disabledButtons(): void {
    this.isProjectSaveButtonDisabled = true;
    this.isProjectLockButtonDisabled = true;
    this.isProjectUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isProjectSaveButtonDisabled = isLocked;
    this.isProjectLockButtonDisabled = isLocked;
    this.isProjectUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveProject(): void {
    this.disabledButtons();

    this.mstProjectService.saveProject(this.mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Project was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.mstProjectModel.IsLocked);
      }
    );
  }

  public buttonLockProject(): void {
    this.mstProjectModel.IsLocked = true;
    this.disabledButtons();

    this.mstProjectService.lockProject(this.mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Project was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.mstProjectModel.IsLocked = false;
        }

        this.isLockedButtons(this.mstProjectModel.IsLocked);
      }
    );
  }

  public buttonUnlockProject(): void {
    this.disabledButtons();

    this.mstProjectService.unlockProject(this.mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Project was successfully unlocked!', 'Unlock Successful');
          this.mstProjectModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.mstProjectModel.IsLocked = true;
        }

        this.isLockedButtons(this.mstProjectModel.IsLocked);
      }
    );
  }

  ngOnInit(): void {
    this.getDropdownList();
  }

}
