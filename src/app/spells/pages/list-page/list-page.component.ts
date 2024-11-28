import {Component, OnInit} from '@angular/core';
import {SpellsService} from '../../services/spells.service';
import {Spell, SpellFilters, SpellResponse} from '../../interfaces/spells.interface';

@Component({
	selector: 'app-list-page',
	standalone: false,

	templateUrl: './list-page.component.html',
	styles: ``
})
export class ListPageComponent implements OnInit {

	spellRespnse!: SpellResponse;

	spellFilters: SpellFilters = {
		pageNumber: 0,
		pageSize: 10,
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
				this.spellRespnse = response;
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
		return this.spellRespnse ? this.spellRespnse.content : null;
	}

	get first(): number {
		return this.spellFilters.pageNumber * this.spellFilters.pageSize;
	}
}
