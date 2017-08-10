import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BillService} from './_services/bill.service';
import {HttpModule} from '@angular/http';

import {ButtonModule, CheckboxModule, DropdownModule, InputTextModule, SpinnerModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {PaymentService} from './_services/payment.service';
import {PaymentComponent} from './components/payment/payment.component';
import {UserComponent} from './components/user/user.component';
import {UsersDropdownComponent} from './components/user-dropdown/users-dropdown.component';
import {UserService} from './_services/user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BillManager} from './_managers/bill.manager';

@NgModule({
	declarations: [
		AppComponent,
		PaymentComponent,
		UserComponent,
		UsersDropdownComponent
	],
	imports: [
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
	providers: [
		// Services
		BillService,
		PaymentService,
		UserService,

		// Managers
		BillManager
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
