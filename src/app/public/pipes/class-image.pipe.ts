import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'classImage'
})
export class ClassImagePipe implements PipeTransform {

	private base = 'assets/classes/';

	transform(value: string | undefined): string {
		if (!value) return '';

		return `${this.base}${this.normalize(value)}.png`;
	}

	private normalize(value: string): string {
		return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
	}

}