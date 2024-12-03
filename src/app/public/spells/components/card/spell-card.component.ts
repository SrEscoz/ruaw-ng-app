import {Component, Input} from '@angular/core';
import {Spell} from '../../../interfaces/spells.interface';

@Component({
	selector: 'spell-card',
	standalone: false,

	templateUrl: './spell-card.component.html',
	styles: ``
})
export class SpellCardComponent {

	@Input()
	spell!: Spell;

}
