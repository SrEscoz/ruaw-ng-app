import {Component, OnInit} from '@angular/core';
import {SpellsService} from '../../services/spells.service';
import {Spell, SpellFilters, SpellResponse} from '../../interfaces/spells.interface';

@Component({
	selector: 'spells-list-page',
	standalone: false,

	templateUrl: './spells-list-page.component.html',
	styles: ``
})
export class SpellsListPageComponent implements OnInit {

	spellResponse!: SpellResponse;

	spellFilters: SpellFilters = {
		pageNumber: 0,
		pageSize: 20,
		name: '',
		school: '',
		level: '',
		class: ''
	};

	constructor(private spellsService: SpellsService) { }

	ngOnInit(): void {
		this.loadSpells();
	}

	loadSpells(): void {
		this.spellsService.getSpells(this.spellFilters)
			.subscribe(response => {
				this.spellResponse = response;
			});
	}

	onFiltersChange(filters: SpellFilters): void {
		this.spellFilters = {...this.spellFilters, ...filters, pageNumber: 0};
		this.loadSpells();
	}

	onPageChange(event: any): void {
		this.spellFilters.pageNumber = event.first / event.rows;
		this.spellFilters.pageSize = event.rows;

		this.loadSpells();
	}

	get spells(): Spell[] | null {
		return this.spellResponse ? this.spellResponse.content : null;
	}

	get first(): number {
		return this.spellFilters.pageNumber * this.spellFilters.pageSize;
	}
}
