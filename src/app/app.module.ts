import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BillService} from './_services/bill.service';
import {HttpModule} from '@angular/http';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpModule
	],
	providers: [
		BillService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
