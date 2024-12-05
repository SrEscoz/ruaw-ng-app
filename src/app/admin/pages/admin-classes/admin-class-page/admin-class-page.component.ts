import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ClassesService} from '../../../../public/services/classes.service';
import {MinimalClass} from '../../../../public/interfaces/classes.interface';
import {ClassAdminService} from '../../../services/class-admin.service';

@Component({
	selector: 'app-admin-class-page',
	templateUrl: './admin-class-page.component.html',
	styles: ``
})
export class AdminClassPageComponent implements OnInit {

	classes!: MinimalClass[];

	constructor(
		private classService: ClassesService,
		private classAdminService: ClassAdminService,
		private router: Router,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {}

	ngOnInit(): void {
		this.loadClasses();
	}

	private loadClasses() {
		this.classService.getClassess()
			.subscribe(classes => this.classes = classes);
	}

	onEditClass(id: number): void {

	}

	onDeleteClass(id: number, name: string): void {
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
				this.classAdminService.deleteClass(id)
					.subscribe(response => {
						if (response) {
							this.showSuccessToast(`${name} ha sido elimiado`);
							this.loadClasses();
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
