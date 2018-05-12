import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {AppRouterModule} from "./app-router/app-router.module";
import {ListComponent} from './list/list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import {ListingsService} from "./listings.service";
import {HttpClientModule} from "@angular/common/http";
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ListingsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
