import {Component, Input} from '@angular/core';
import {MinimalClass} from '../../interfaces/classes.interface';

@Component({
	selector: 'class-card',
	templateUrl: './class-card.component.html',
	styles: ``
})
export class ClassCardComponent {

	@Input() class!: MinimalClass;

}
