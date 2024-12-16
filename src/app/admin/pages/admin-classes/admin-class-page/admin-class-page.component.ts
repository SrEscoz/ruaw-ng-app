import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {ClassesService} from '../../../../public/services/classes.service';
import {MinimalClass} from '../../../../public/interfaces/classes.interface';
import {ClassAdminService} from '../../../services/class-admin.service';
import {ToastService} from '../../../../shared/services/toast.service';

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
		private toastService: ToastService,
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
		this.router.navigate(['/admin/classes/edit/', id]).then();
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
							this.toastService.showSuccessToast('Éxtio', `${name} ha sido elimiado`);
							this.loadClasses();
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
}
