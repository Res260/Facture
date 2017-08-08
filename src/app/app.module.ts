import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BillService} from './_services/bill.service';
import {HttpModule} from '@angular/http';

import {ButtonModule, InputTextModule, SpinnerModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent
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
		BillService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
