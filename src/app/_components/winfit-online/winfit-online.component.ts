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

  baseMBRData: IBaseMBRData[] = [
    {
      ageFrom: 10,
      ageTo: 11,
      bmr: NaN,
      manBMR: 37.4,
      womanBMR: 34.8,
    },
    {
      ageFrom: 12,
      ageTo: 14,
      bmr: NaN,
      manBMR: 31,
      womanBMR: 29.6,
    },
    {
      ageFrom: 15,
      ageTo: 17,
      bmr: NaN,
      manBMR: 27,
      womanBMR: 25.3,
    },
    {
      ageFrom: 18,
      ageTo: 29,
      bmr: NaN,
      manBMR: 24,
      womanBMR: 22.1,
    },
    {
      ageFrom: 30,
      ageTo: 49,
      bmr: NaN,
      manBMR: 22.3,
      womanBMR: 21.7,
    },
    {
      ageFrom: 50,
      ageTo: 69,
      bmr: NaN,
      manBMR: 21.5,
      womanBMR: 20.7,
    },
    {
      ageFrom: 70,
      ageTo: NaN,
      bmr: NaN,
      manBMR: 21.5,
      womanBMR: 20.7,
    },
  ];
  baseMBIData: IBaseMBIData[] = [
    {
      bmiFrom: 2.5,
      bmiTo: 18.4,
      bmi: NaN,
      type: 'TABLE.FITNESS',
    },
    {
      bmiFrom: 18.5,
      bmiTo: 22.9,
      bmi: NaN,
      type: 'TABLE.BALANCE',
    },
    {
      bmiFrom: 23,
      bmiTo: 24.9,
      bmi: NaN,
      type: 'TABLE.OVERWEIGHT',
    },
    {
      bmiFrom: 25,
      bmiTo: 29.9,
      bmi: NaN,
      type: 'TABLE.OBESITY',
    },
    {
      bmiFrom: 20,
      bmiTo: 50,
      bmi: NaN,
      type: 'TABLE.DANGEROUS_OBESITY',
    },
  ];
  baseBodyFatData: IBaseBodyFatData[] = [
    {
      indexForManFrom: 3,
      indexForManTo: 10,
      indexForWomanFrom: 12,
      indexForWomanTo: 18,
      type: 'TABLE.FITNESS',
    },
    {
      indexForManFrom: 10,
      indexForManTo: 20,
      indexForWomanFrom: 18,
      indexForWomanTo: 28,
      type: 'TABLE.BALANCE',
    },
    {
      indexForManFrom: 20,
      indexForManTo: 25,
      indexForWomanFrom: 28,
      indexForWomanTo: 32,
      type: 'TABLE.HIGH',
    },
    {
      indexForManFrom: 25,
      indexForManTo: NaN,
      indexForWomanFrom: 32,
      indexForWomanTo: NaN,
      type: 'TABLE.VERY_HIGH',
    },
  ];
  baseVisceralFatData: IBaseVisceralFatData[] = [
    {
      levelVisceralFatFrom: 1,
      levelVisceralFatTo: 3,
      type: 'TABLE.GOOD',
    },
    {
      levelVisceralFatFrom: 3,
      levelVisceralFatTo: 9,
      type: 'TABLE.HIGH',
    },
    {
      levelVisceralFatFrom: 10,
      levelVisceralFatTo: 14,
      type: 'TABLE.DANGER',
    },
    {
      levelVisceralFatFrom: 15,
      levelVisceralFatTo: 30,
      type: 'TABLE.VERY_DANGER',
    },
  ];
  baseSkeletalMusclesData: IBaseSkeletalMusclesData[] = [
    {
      for: 'TABLE.WOMAN',
      lowFrom: 5,
      lowTo: 26,
      normalFrom: 26,
      normalTo: 29,
      goodFrom: 29,
      goodTo: 31,
      veryGoodFrom: 31,
      veryGoodTo: 60,
    },
    {
      for: 'TABLE.MAN',
      lowFrom: 5,
      lowTo: 33,
      normalFrom: 33,
      normalTo: 37,
      goodFrom: 37,
      goodTo: 40,
      veryGoodFrom: 40,
      veryGoodTo: 60,
    },
  ];

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
    this.customeroForm.valueChanges.subscribe(resp => {
      this.checkingErrorCustomerForm = false;
    });
  }

  initForm() {
    // this.infoForm = this.fb.group({
    //   age: [0, [this.numberValidate]],
    //   gender: [null as any, [this.numberValidate]],
    //   heightIndex: [0, [this.numberValidate]],
    //   weightIndex: [0, [this.numberValidate]],
    // });
    this.infoForm = this.fb.group({
      age: [25, [this.numberValidate]],
      gender: [true, [this.numberValidate]],
      heightIndex: [169, [this.numberValidate]],
      weightIndex: [60, [this.numberValidate]],
    });
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
      userID: this.userService._uuid,
      customerName: _value.name || '',
      customerEmail: _value.email || '',
      customerPhoneNumber: _value.phoneNumber || '',
    };

    this.winfitOnlineService.saveWinfit(customerInfo).subscribe(resp => {
      if (resp) {
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
