import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { WinfitOnlineComponent } from "./_components";
import { AssetsLink } from 'tt-library-angular-porfolio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Route[] = [
  {
    path: '',
    component: WinfitOnlineComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forChild(routes),
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
  ],
  declarations: [
    AppComponent,
    WinfitOnlineComponent,
  ],
})
export class AppModule {}
