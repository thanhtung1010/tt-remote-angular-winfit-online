import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AssetsLink, UserService } from 'tt-library-angular-porfolio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tt-winfit-online',
  templateUrl: './winfit-online.component.html',
  standalone: true,
  imports: [
    AssetsLink,
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
  ]
})
export class WinfitOnlineComponent implements OnInit {
  infoForm!: FormGroup<{
    age: FormControl<number | null>;
    heightIndex: FormControl<number | null>;
    weightIndex: FormControl<number | null>;
  }>;

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
      heightIndex: [0, [this.numberValidate]],
      weightIndex: [0, [this.numberValidate]],
    });
  }

  numberValidate = (control: AbstractControl): ValidationErrors | null => {
    // const value = control.value;

    // if ((typeof value === 'number' && value === 0) || Number.isNaN(+value)) {
    //   return {
    //     required: true,
    //   };
    // }

    return null;
  }

  onClickSave() {
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

    if (this.userService.user.init) {}
  }

  onClickCheckIndex() {
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

}
