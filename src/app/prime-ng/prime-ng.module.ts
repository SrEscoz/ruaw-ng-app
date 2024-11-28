import {NgModule} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
	exports: [
		ButtonModule,
		CardModule,
		InputTextModule,
		FloatLabelModule,
		DropdownModule,
		ButtonModule,
		PanelModule,
		PaginatorModule,
		ProgressSpinnerModule
	]
})
export class PrimeNgModule {
}