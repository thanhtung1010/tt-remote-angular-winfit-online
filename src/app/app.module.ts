import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./_components/winfit-online/winfit-online.component').then(c => c.WinfitOnlineComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [RouterModule.forChild(routes)],
  declarations: [AppComponent],
})
export class AppModule {}
