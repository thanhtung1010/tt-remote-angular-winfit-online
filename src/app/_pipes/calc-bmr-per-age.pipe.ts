import { Pipe, PipeTransform } from "@angular/core";
import { BaseIndexWinfitModel } from "tt-library-angular-porfolio";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'TTBMRPerAge',
  standalone: true,
})

export class BMRPerAgePipe implements PipeTransform {

  constructor(
    private santiti: DomSanitizer
  ) {}

  transform(baseInfo: BaseIndexWinfitModel, ...args: any[]): SafeHtml {
    const _bmr = baseInfo.bmr.mifflinStJeor;
    let _class: string = '';
    let _content: string = '';

    if (Number.isNaN(_bmr)) {
      _class = 'tt-red';
      _content = `<p class="${_class}">N/A</p>`;
    } else {
      const bmrPerAge: number = +(_bmr / baseInfo.weightIndex).toFixed(2);
      _content = `<p>${bmrPerAge}</p>`;
    }

    return this.santiti.bypassSecurityTrustHtml(_content);
  }
}
