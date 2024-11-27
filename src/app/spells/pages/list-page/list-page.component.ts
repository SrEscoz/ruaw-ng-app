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
		pageSize: 20,
	};

	constructor(private spellsService: SpellsService) { }

	ngOnInit(): void {
		this.spellsService.getSpells(this.spellFilters)
			.subscribe(response => {
				this.spellRespnse = response;
			});
	}

	get spells(): Spell[] | null {
		return this.spellRespnse ? this.spellRespnse.content : null;
	}

}
