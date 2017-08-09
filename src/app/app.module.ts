import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BillService} from './_services/bill.service';
import {HttpModule} from '@angular/http';

import {ButtonModule, InputTextModule, SpinnerModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {PaymentService} from './_services/payment.service';
import {PaymentComponent} from './components/payment/payment.component';
import {UserComponent} from './components/user/user.component';

@NgModule({
	declarations: [
		AppComponent,
		PaymentComponent,
		UserComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		InputTextModule,
		SpinnerModule,
		ButtonModule
	],
	providers: [
		BillService,
		PaymentService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
