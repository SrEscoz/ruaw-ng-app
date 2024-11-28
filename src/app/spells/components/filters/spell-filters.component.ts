import {Component, OnInit} from '@angular/core';
import {SpellsService} from '../../services/spells.service';

@Component({
	selector: 'spell-filters',
	standalone: false,

	templateUrl: './spell-filters.component.html',
	styles: ``
})
export class SpellFiltersComponent implements OnInit {

	classItems: string[] = [];
	schoolsItems: string[] = [];
	levelItems: string[] = ['Truco', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	constructor(private spellsService: SpellsService) {}

	ngOnInit(): void {
		this.spellsService.getClasses()
			.subscribe(classes => {this.classItems = classes;});

		this.spellsService.getSchools()
			.subscribe(schools => {this.schoolsItems = schools;});
	}

}