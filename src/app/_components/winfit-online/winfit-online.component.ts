import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { UserService } from 'tt-library-angular-porfolio';
import { BaseIndexWinfitModel } from '../../_models';

@Component({
  selector: 'tt-winfit-online',
  templateUrl: './winfit-online.component.html',
})
export class WinfitOnlineComponent implements OnInit {
  infoForm!: FormGroup<{
    age: FormControl<number | null>;
    gender: FormControl<boolean | null>;
    heightIndex: FormControl<number | null>;
    weightIndex: FormControl<number | null>;
  }>;
  loading = {
    checkIndexWinfit: false,
  }

  baseIndexWinfit: BaseIndexWinfitModel = new BaseIndexWinfitModel(null);
  visibleIndexWinfitModal: boolean = false;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      age: [0, [this.numberValidate]],
      gender: [null as any, [this.numberValidate]],
      heightIndex: [0, [this.numberValidate]],
      weightIndex: [0, [this.numberValidate]],
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
    // const controls = this.infoForm.controls;

    // for (const field in controls) {
    //   const control = (controls as any)[field];
    //   if (control) {
    //     control.markAsDirty();
    //     control.updateValueAndValidity();
    //   }
    // }

    // if (!this.infoForm.valid) {
    //   return;
    // }

    // if (this.userService.user.init) {}
  }

  onClickCheckIndex() {
    this.loading.checkIndexWinfit = true;
    const controls = this.infoForm.controls;

    for (const field in controls) {
      const control = (controls as any)[field];
      if (control) {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    }

    if (!this.infoForm.valid) {
      return;
    }

    let _value: any = this.infoForm.value;
    this.calcBMI(_value);
    this.calcBMR(_value);
    this.calcWaterNeeded(_value);
    this.baseIndexWinfit = new BaseIndexWinfitModel(this.baseIndexWinfit);

    const _timeout = setTimeout(() => {
      this.loading.checkIndexWinfit = false;
      this.onToogleVisibleIndexWinfitModal(true);
      clearTimeout(_timeout);
    }, 500);
  }

  calcBMR(baseInfor: IBaseInfor) {
    let harrisBenedict: number = NaN;
    let mifflinStJeor: number = NaN;
    let katchMcArdle: number = NaN;

    if (baseInfor.gender) {
      harrisBenedict = 66 + (13.7 * baseInfor.weightIndex) + (5 * baseInfor.heightIndex) + (6.8 * baseInfor.age);
      mifflinStJeor = (10 * baseInfor.weightIndex) + (6.25 * baseInfor.heightIndex) - (5 * baseInfor.age) + 5;
    } else {
      harrisBenedict = 655 + (9.6 * baseInfor.weightIndex) + (1.8 * baseInfor.heightIndex) + (4.7 * baseInfor.age);
      mifflinStJeor = (10 * baseInfor.weightIndex) + (6.25 * baseInfor.heightIndex) - (5 * baseInfor.age) - 161;
    }
    if (baseInfor.lbm) {
      katchMcArdle = 370 + (21.6 * baseInfor.lbm);
    }
    this.baseIndexWinfit.bmr = {
      harrisBenedict: +harrisBenedict.toFixed(2),
      mifflinStJeor: +mifflinStJeor.toFixed(2),
      katchMcArdle
    };
  }

  calcBMI(baseInfor: IBaseInfor) {
    const height = baseInfor.heightIndex / 100;

    const bmi: number = baseInfor.weightIndex / Math.pow(height, 2);
    this.baseIndexWinfit.bmi = bmi;
  }

  calcWaterNeeded(baseInfor: IBaseInfor) {
    const waterNeeded: number = baseInfor.weightIndex * 0.03;
    this.baseIndexWinfit.waterNeeded = waterNeeded;
  }

  onToogleVisibleIndexWinfitModal(visible: boolean) {
    this.visibleIndexWinfitModal = visible;
  }
}

export interface IBaseInfor {
  age: number;
  gender: boolean;
  heightIndex: number;
  weightIndex: number;
  lbm?: number;
}

export interface ICalcIndexWinfit {
  age: number;
  gender: boolean;
  heightIndex: number;
  weightIndex: number;
  bmr?: IBaseBMR;
  bmi?: number;
  waterNeeded?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface IBaseBMR {
  harrisBenedict: number;
  mifflinStJeor: number;
  katchMcArdle?: number;
}
