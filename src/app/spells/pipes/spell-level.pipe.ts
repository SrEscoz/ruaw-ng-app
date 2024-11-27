import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'spellLevel',
	standalone: false
})
export class SpellLevelPipe implements PipeTransform {

	transform(level: number): string {
		return level == 0 ? 'Truco' : level.toString();
	}

}
