import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'spellImage'
})
export class SpellImagePipe implements PipeTransform {

	private base = 'assets/spells-schools/';

	transform(value: string): string {
		return `${this.base}${this.normalize(value)}.png`;
	}

	private normalize(value: string): string {
		return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
	}
}
