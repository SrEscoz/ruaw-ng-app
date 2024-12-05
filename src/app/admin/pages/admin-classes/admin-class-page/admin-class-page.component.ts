import {Component, OnInit} from '@angular/core';
import {SpellAdminService} from '../../../services/spell-admin.service';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ClassesService} from '../../../../public/services/classes.service';
import {MinimalClass} from '../../../../public/interfaces/classes.interface';

@Component({
	selector: 'app-admin-class-page',
	templateUrl: './admin-class-page.component.html',
	styles: ``
})
export class AdminClassPageComponent implements OnInit {

	classes!: MinimalClass[];

	constructor(
		private classService: ClassesService,
		private spellAdminService: SpellAdminService,
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

	}
}
