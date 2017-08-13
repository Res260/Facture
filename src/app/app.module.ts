import {AppShellModule} from '@angular/app-shell';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule, CheckboxModule, DropdownModule, InputTextModule, SpinnerModule} from 'primeng/primeng';
import {BillManager} from './_managers/bill.manager';
import {PaymentManager} from './_managers/payment.manager';
import {UserManager} from './_managers/user.manager';
import {BillBookService} from './_services/bill-book.service';
import {BillService} from './_services/bill.service';
import {PaymentService} from './_services/payment.service';
import {UserService} from './_services/user.service';

import {AppComponent} from './app.component';
import {AmountComponent} from './components/amount/amount.component';
import {BillBookDropdownComponent} from './components/bill-book-dropdown/bill-book-dropdown.component';
import {BillsComponent} from './components/bills/bills.component';
import {PaymentComponent} from './components/payment/payment.component';
import {UsersDropdownComponent} from './components/user-dropdown/users-dropdown.component';
import {UserComponent} from './components/user/user.component';

@NgModule({
              declarations: [
                  AppComponent,
                  PaymentComponent,
                  UserComponent,
                  UsersDropdownComponent,
                  BillsComponent,
                  AmountComponent,
                  BillBookDropdownComponent
              ],
              imports:      [
                  AppShellModule.runtime(),
                  BrowserModule,
                  HttpModule,
                  FormsModule,
                  InputTextModule,
                  SpinnerModule,
                  ButtonModule,
                  DropdownModule,
                  CheckboxModule,
                  BrowserAnimationsModule
              ],
              providers:    [
                  // Services
                  BillService,
                  BillBookService,
                  PaymentService,
                  UserService,

                  // Managers
                  BillManager,
                  PaymentManager,
                  UserManager
              ],
              bootstrap:    [AppComponent]
          })
export class AppModule {
}
