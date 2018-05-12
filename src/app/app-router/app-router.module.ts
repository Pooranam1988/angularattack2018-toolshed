import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "../layout/layout.component";
import {MainComponent} from "../main/main.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', component: MainComponent}
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
