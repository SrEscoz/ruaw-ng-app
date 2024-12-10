import {Component, OnInit} from '@angular/core';
import {SpellsService} from '../../services/spells.service';
import {Spell, SpellFilters, SpellResponse} from '../../interfaces/spells.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'public-spells-page',
	standalone: false,

	templateUrl: './spells-page.component.html',
	styles: ``
})
export class SpellsPageComponent implements OnInit {

	spellResponse!: SpellResponse;
	selectedSpell?: Spell;
	visibleDialog = false;

	spellFilters: SpellFilters = {
		pageNumber: 0,
		pageSize: 20,
		name: '',
		school: '',
		level: '',
		class: ''
	};

	constructor(private spellsService: SpellsService,
	            private router: Router,
	            private route: ActivatedRoute) { }

	ngOnInit(): void {
		// Leer los parámetros de la URL al cargar el componente
		this.route.queryParams.subscribe(params => {
			this.spellFilters = {
				...this.spellFilters,
				pageNumber: (params['page'] ? +params['page'] - 1 : 0), // Ajustamos para que internamente comience en 0
				name: params['name'] || '',
				school: params['school'] || '',
				level: params['level'] || '',
				class: params['class'] || ''
			};
			this.loadSpells();
		});
	}

	loadSpells(): void {
		this.spellsService.getSpells(this.spellFilters)
			.subscribe(response => {
				this.spellResponse = response;
			});
	}

	onFiltersChange(filters: SpellFilters): void {
		this.spellFilters = {...this.spellFilters, ...filters, pageNumber: 0};
		this.updateUrlParams(); // Actualización de la URL
		this.loadSpells();
	}

	onPageChange(event: any): void {
		this.spellFilters.pageNumber = event.first / event.rows;
		this.spellFilters.pageSize = event.rows;
		this.updateUrlParams(); // Actualización de la URL
		this.loadSpells();

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	updateUrlParams(): void {
		const {pageNumber, name, school, level, class: classFilter} = this.spellFilters;

		const queryParams = {
			page: pageNumber + 1, // Ajustamos para que la URL use numeración basada en 1
			name: name || null,
			school: school || null,
			level: level || null,
			class: classFilter || null
		};

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: queryParams,
			queryParamsHandling: 'merge'
		});
	}

	showSpellDetails(spell: Spell): void {
		this.selectedSpell = spell;
		this.visibleDialog = true;
	}

	hideSpellDetails(): void {
		this.selectedSpell = undefined;
		this.visibleDialog = false;
	}


	get spells(): Spell[] | null {
		return this.spellResponse ? this.spellResponse.content : null;
	}

	get first(): number {
		return this.spellFilters.pageNumber * this.spellFilters.pageSize;
	}
}
