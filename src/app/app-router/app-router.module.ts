import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "../layout/layout.component";
import {MainComponent} from "../main/main.component";
import {ListComponent} from "../list/list.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', component: MainComponent},
          {path: 'list', component: ListComponent}
        ]
      },
      {path: '**', redirectTo: ''}
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRouterModule {
}
