import { IBaseBMR, ICalcIndexWinfit } from "../_components";

export class BaseIndexWinfitModel {
  gender: boolean = false;
  age: number = NaN;
  heightIndex: number = NaN;
  weightIndex: number = NaN;
  bmr: IBaseBMR = {
    harrisBenedict: NaN,
    mifflinStJeor: NaN,
    katchMcArdle: NaN,
  };
  bmi: number = NaN;
  waterNeeded: number = NaN;
  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';

  constructor(baseInfo: ICalcIndexWinfit | null) {
    if (baseInfo) {
      this.checkForString('fullName', baseInfo.fullName);
      this.checkForString('email', baseInfo.email);
      this.checkForString('phoneNumber', baseInfo.phoneNumber);

      this.checkForBoolean('gender', baseInfo.gender);

      this.checkForNumber('age', baseInfo.age);
      this.checkForNumber('heightIndex', baseInfo.heightIndex);
      this.checkForNumber('weightIndex', baseInfo.weightIndex);
      this.checkForNumber('bmi', baseInfo.bmi);
      this.checkForNumber('waterNeeded', baseInfo.waterNeeded);

      if (typeof baseInfo['bmr'] === 'object') {
        this.bmr = baseInfo['bmr'];
      }
    }
  }

  private checkForString(
    param:
      | 'fullName'
      | 'email'
      | 'phoneNumber',
    value: any,
  ) {
    if (typeof value === 'string') {
      this[param] = value;
    } else {
      this[param] = '';
    }
  }

  private checkForBoolean(param: 'gender', value: any) {
    if (value !== undefined) {
      if (typeof value === 'boolean') {
        this[param] = value;
      } else {
        this[param] = value === 'true';
      }
    }
  }

  private checkForNumber(
    param: 'age' | 'heightIndex' | 'weightIndex' | 'bmi' | 'waterNeeded',
    value: any,
  ) {
    const valueType = typeof value;
    switch (valueType) {
      case 'number':
        this[param] = value;
        break;

      case 'string':
        this[param] = +value;
        break;

      default:
        this[param] = NaN;
        break;
    }
  }
}
