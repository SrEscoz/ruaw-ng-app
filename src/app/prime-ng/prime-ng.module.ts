import {NgModule} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
	exports: [
		ButtonModule,
		CardModule,
		InputTextModule,
		FloatLabelModule,
		DropdownModule,
		ButtonModule
	]
})
export class PrimeNgModule {
}
