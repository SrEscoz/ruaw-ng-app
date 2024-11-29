import {NgModule} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {SkeletonModule} from 'primeng/skeleton';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';


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
		ProgressSpinnerModule,
		TableModule,
		SkeletonModule,
		DividerModule,
		DialogModule,
		BadgeModule,
		AvatarModule
	]
})
export class PrimeNgModule {
}
