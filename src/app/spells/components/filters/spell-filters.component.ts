import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpellsService} from '../../services/spells.service';
import {SpellFilters} from '../../interfaces/spells.interface';

@Component({
	selector: 'spell-filters',
	standalone: false,

	templateUrl: './spell-filters.component.html',
	styles: ``
})
export class SpellFiltersComponent implements OnInit {

	@Output()
	filtersChanged = new EventEmitter<SpellFilters>();

	classItems: string[] = [];
	schoolsItems: string[] = [];
	levelItems: string[] = ['Truco', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	nameFilter: string = '';
	schoolFilter: string = '';
	levelFilter: string = '';
	classFilter: string = '';

	constructor(private spellsService: SpellsService) {}

	ngOnInit(): void {
		this.spellsService.getClasses()
			.subscribe(classes => {this.classItems = classes;});

		this.spellsService.getSchools()
			.subscribe(schools => {this.schoolsItems = schools;});
	}

	onSearch(): void {
		const filters: SpellFilters = {
			pageNumber: 0,
			pageSize: 0,
			name: this.nameFilter,
			school: this.schoolFilter,
			level: this.levelFilter === 'Truco' ? '0' : this.levelFilter,
			class: this.classFilter,
		};

		this.filtersChanged.emit(filters);
	}

}
