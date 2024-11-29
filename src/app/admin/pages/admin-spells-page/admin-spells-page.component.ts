import {Component, OnInit} from '@angular/core';
import {Spell, SpellFilters, SpellResponse} from '../../../spells/interfaces/spells.interface';
import {SpellAdminService} from '../../services/spell-admin.service';

@Component({
	selector: 'app-admin-spells-page',
	templateUrl: './admin-spells-page.component.html',
	styles: ``
})
export class AdminSpellsPageComponent implements OnInit {

	spellResponse!: SpellResponse;

	spellFilters: SpellFilters = {
		class: '', level: '', name: '', pageNumber: 0, pageSize: 300, school: ''
	};

	constructor(private spellAdminService: SpellAdminService) {
	}

	ngOnInit(): void {
		this.loadSpells();
	}

	loadSpells(): void {
		this.spellAdminService.getSpells(this.spellFilters)
			.subscribe(response => {
				this.spellResponse = response;
			});
	}

	get spells(): Spell[] {
		return this.spellResponse.content;
	}

	onAddSpell(): void {

	}

	onDeleteSpell(id: number): void {

	}

	onEditSpell(id: number): void {

	}
}
