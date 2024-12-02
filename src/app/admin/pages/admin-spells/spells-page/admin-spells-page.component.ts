import {Component, OnInit} from '@angular/core';
import {Spell, SpellFilters, SpellResponse} from '../../../../spells/interfaces/spells.interface';
import {SpellsService} from '../../../../spells/services/spells.service';
import {SpellAdminService} from '../../../services/spell-admin.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';

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

	constructor(
		private spellsService: SpellsService,
		private spellAdminService: SpellAdminService,
		private router: Router,
		private messageService: MessageService,
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
							this.showSuccessToast(`${name} ha sido elimiado`);
							this.loadSpells();
						} else {
							this.showErrorToast(`No ha sido posible eliminar ${name}`);
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

	showSuccessToast(message: string): void {
		this.messageService.add({
			severity: 'success',
			summary: 'Éxito',
			detail: message,
			life: 3000
		});
	}

	showErrorToast(message: string): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Error',
			detail: message,
			life: 3000
		});
	}
}
