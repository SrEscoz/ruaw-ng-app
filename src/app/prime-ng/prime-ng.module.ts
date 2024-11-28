import {NgModule} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';


@NgModule({
	exports: [
		ButtonModule,
		CardModule,
		InputTextModule,
		FloatLabelModule,
		DropdownModule,
		ButtonModule,
		PanelModule,
	]
})
export class PrimeNgModule {
}
