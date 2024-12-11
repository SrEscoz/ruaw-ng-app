import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Spell} from '../../interfaces/spells.interface';

@Component({
	selector: 'spell-dialog',
	templateUrl: './spell-dialog.component.html',
	styles: ``
})
export class SpellDialogComponent {

	@Input() spell?: Spell;
	@Input() visible!: boolean;
	@Output() close: EventEmitter<void> = new EventEmitter();

	onClose(): void {
		this.close.emit();
	}
}
