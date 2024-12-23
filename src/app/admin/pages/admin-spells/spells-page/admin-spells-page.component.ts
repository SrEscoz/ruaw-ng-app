import {Component, OnInit} from '@angular/core';
import {Spell, SpellFilters, SpellResponse} from '../../../../public/interfaces/spells.interface';
import {SpellsService} from '../../../../public/services/spells.service';
import {SpellAdminService} from '../../../services/spell-admin.service';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
	selector: 'app-admin-spells-page',
	templateUrl: './admin-spells-page.component.html',
	styles: ``
})
export class AdminSpellsPageComponent implements OnInit {

	spellResponse!: SpellResponse;

	spellFilters: SpellFilters = {
		class: undefined, level: undefined, name: undefined, pageNumber: 0, pageSize: 1000, school: undefined
	};

	constructor(
		private spellsService: SpellsService,
		private spellAdminService: SpellAdminService,
		private router: Router,
		private toastService: ToastService,
		private confirmationService: ConfirmationService
	) { }

	ngOnInit(): void {
		this.loadSpells();
	}

	loadSpells(): void {
		this.spellsService.getSpells(this.spellFilters)
			.subscribe(response => {
				this.spellResponse = response;
			});
	}

	get spells(): Spell[] {
		return this.spellResponse.content;
	}

	onDeleteSpell(id: number, name: string): void {
		this.confirmationService.confirm({
			message: `¿Estás seguro de que quieres borrar ${name}?`,
			header: 'Confirmar borrado',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Si',
			rejectLabel: 'No',
			acceptIcon: 'none',
			rejectIcon: 'none',
			acceptButtonStyleClass: 'p-button-danger p-button-text',
			rejectButtonStyleClass: 'p-button-secondary p-button-text',
			defaultFocus: 'reject',

			accept: () => {
				this.spellAdminService.deleteSpell(id)
					.subscribe(response => {
						if (response) {
							this.toastService.showSuccessToast('Éxito', `${name} ha sido elimiado`);
							this.loadSpells();
						} else {
							this.toastService.showErrorToast('Error', `No ha sido posible eliminar ${name}`);
						}
					});
			},
			reject: () => {
				return;
			}
		});
	}

	onEditSpell(id: number): void {
		this.router.navigate(['/admin/spells/edit/', id]).then();
	}

	onFilterChange(filters: SpellFilters): void {
		this.spellFilters = {...this.spellFilters, ...filters, pageNumber: 0};
		this.loadSpells();
	}

	onPageChange(): void {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}
