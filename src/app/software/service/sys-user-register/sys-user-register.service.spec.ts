import { TestBed } from '@angular/core/testing';

import { SysUserRegisterService } from './sys-user-register.service';

describe('SysUserRegisterService', () => {
  let service: SysUserRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysUserRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
