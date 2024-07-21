import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IBaseBodyFatData,
  IBaseMBIData,
  IBaseMBRData,
  IBaseSkeletalMusclesData,
  IBaseVisceralFatData,
  UserService,
  WinfitOnlineService,
  BaseIndexWinfitModel,
  CommonService,
  ROUTE,
  Helpers,
  IFirestoreCustomerWinfitOnline,
} from 'tt-library-angular-porfolio';
import { AssetsLink } from 'tt-library-angular-porfolio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BMRPerAgePipe } from '../../_pipes';

@Component({
  selector: 'tt-winfit-online',
  templateUrl: './winfit-online.component.html',
  standalone: true,
  imports: [
    BMRPerAgePipe,
    AssetsLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzRadioModule,
    NzModalModule,
    NzTableModule,
    NzDescriptionsModule,
  ]
})
export class WinfitOnlineComponent implements OnInit {
  infoForm!: FormGroup<{
    age: FormControl<number | null>;
    gender: FormControl<boolean | null>;
    heightIndex: FormControl<number | null>;
    weightIndex: FormControl<number | null>;
  }>;
  customeroForm!: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
  }>;
  loading = {
    checkIndexWinfit: false,
    saveWinfitInfo: false,
  };
  indexWinfit: BaseIndexWinfitModel = new BaseIndexWinfitModel(null);
  baseWinfitOnlineData = this.winfitOnlineService.baseWinfitOnlineData;

  visibleIndexWinfitModal: boolean = false;
  visibleWarningAuthModal: boolean = false;
  visibleInputCustomerModal: boolean = false;
  checkingErrorForm: boolean = false;
  checkingErrorCustomerForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private winfitOnlineService: WinfitOnlineService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.initForm();

    this.infoForm.valueChanges.subscribe(resp => {
      this.checkingErrorForm = false;
    });
    this.winfitOnlineService.baseIndexWinfit$.subscribe(resp => {
      this.indexWinfit = resp;
    });
    const params = Helpers.convertParamsToObject(Helpers.getParamString());

    if (params && params['backFromLogin'] && params.backFromLogin === 'true') {
      this.onToogleVisibleInputCustomerModal(true);
    }

    if (this.userService.user.init) {
      this.winfitOnlineService.setUserInfo = this.userService.user;
    }
  }

  initForm() {
    this.infoForm = this.fb.group({
      age: [null as any, [this.numberValidate]],
      gender: [null as any, [this.numberValidate]],
      heightIndex: [null as any, [this.numberValidate]],
      weightIndex: [null as any, [this.numberValidate]],
    });
    // this.infoForm = this.fb.group({
    //   age: [25, [this.numberValidate]],
    //   gender: [true, [this.numberValidate]],
    //   heightIndex: [169, [this.numberValidate]],
    //   weightIndex: [60, [this.numberValidate]],
    // });
  }

  initCustomerForm() {
    this.customeroForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', []],
      phoneNumber: ['', []],
    });
  }

  numberValidate = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if ((typeof value === 'number' && value === 0) || Number.isNaN(+value)) {
      return {
        required: true,
      };
    }

    return null;
  }

  booleanValidate = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'boolean') {
      return {
        required: true,
      };
    }

    return null;
  }

  onClickSave() {
    if (this.userService.user.init) {
      this.onToogleVisibleInputCustomerModal(true);
    } else {
      this.onToogleVisibleWarningAuthModal(true);
    }
  }

  onClickSaveWinfit() {
    this.loading.saveWinfitInfo = true;
    this.checkingErrorCustomerForm = true;

    if (!this.customeroForm.valid) {
      this.loading.saveWinfitInfo = false;
      return;
    }

    let _value = this.customeroForm.value;
    const customerInfo: IFirestoreCustomerWinfitOnline = {
      customerName: _value.name || '',
      customerEmail: _value.email || '',
      customerPhoneNumber: '+84' + (_value.phoneNumber || ''),
    };
    this.winfitOnlineService.setCustomerInfo = customerInfo;

    this.winfitOnlineService.saveWinfit(this.userService._uuid).subscribe(resp => {
      if (resp) {
        this.onToogleVisibleIndexWinfitModal(false);
        this.onToogleVisibleInputCustomerModal(false);
        this.infoForm.reset();
        this.customeroForm.reset();
        this.commonService.showSuccess();
      } else {
        this.commonService.showError();
      }
      this.loading.saveWinfitInfo = false;
    });
  }

  onClickCheckIndex() {
    this.loading.checkIndexWinfit = true;
    this.checkingErrorForm = true;
    // const controls = this.infoForm.controls;

    // for (const field in controls) {
    //   const control = (controls as any)[field];
    //   if (control) {
    //     control.markAsDirty();
    //     control.updateValueAndValidity({emitEvent: false});
    //   }
    // }

    if (!this.infoForm.valid) {
      return;
    }

    let _value: any = this.infoForm.value;
    this.winfitOnlineService.calcBMI(_value);
    this.winfitOnlineService.calcBMR(_value);
    this.winfitOnlineService.calcWaterNeeded(_value);
    this.winfitOnlineService.baseIndexWinfit = _value;

    const _timeout = setTimeout(() => {
      this.loading.checkIndexWinfit = false;
      this.checkingErrorForm = false;
      this.onToogleVisibleIndexWinfitModal(true);
      clearTimeout(_timeout);
    }, 500);
  }

  onToogleVisibleIndexWinfitModal(visible: boolean) {
    this.visibleIndexWinfitModal = visible;
  }

  onToogleVisibleWarningAuthModal(visible: boolean) {
    this.visibleWarningAuthModal = visible;
  }

  onToogleVisibleInputCustomerModal(visible: boolean) {
    if (visible) {
      this.initCustomerForm();
    } else {
      this.customeroForm.reset();
    }
    this.visibleInputCustomerModal = visible;
  }

  goToLogin() {
    this.commonService.gotoURL(`${ROUTE.AUTH}/${ROUTE.AUTH_LOGIN}`);
  }
}
