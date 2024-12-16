import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpellsService} from '../../../../public/services/spells.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassesService} from '../../../../public/services/classes.service';
import {ClassAdminService} from '../../../services/class-admin.service';
import {CompleteClass} from '../../../../public/interfaces/classes.interface';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
	selector: 'admin-add-class-page',
	templateUrl: './admin-add-class-page.component.html',
	styles: []
})
export class AdminAddClassPageComponent implements OnInit {

	classForm!: FormGroup;

	sourceItems: string[] = [];
	diceItems: string[] = ['d12', 'd8', 'd6'];
	aptitudeItems: string[] = ['Carisma', 'Inteligencia', 'Sabiduría'];

	isEditMode: boolean = false;
	classId?: number;

	constructor(
		private fb: FormBuilder,
		private classService: ClassesService,
		private spellsService: SpellsService,
		private adminService: ClassAdminService,
		private toastService: ToastService,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.classId = params['id'] ? +params['id'] : undefined;
			this.isEditMode = !!this.classId;
		});

		this.initializeForm();

		this.spellsService.getSourceBooks()
			.subscribe(sourceBooks => this.sourceItems = sourceBooks);

		if (this.isEditMode && this.classId)
			this.loadClassData(this.classId);
	}

	initializeForm() {
		this.classForm = this.fb.group({
			name: [undefined, Validators.required],
			source: ['Player\'s Handbook', Validators.required],
			hitDice: ['d8', Validators.required],
			magicalAptitude: ['Carisma', Validators.required],
			multiclass: [undefined, Validators.required],
			known: [false],
			prepared: [false],
			shortDescription: ['', Validators.required],
			description: ['', Validators.required],
		});
	}

	loadClassData(id: number): void {
		this.classService.getClass(id).subscribe(clazz => {
			if (clazz) {
				this.classForm.patchValue({
					name: clazz.name,
					source: clazz.source,
					hitDice: clazz.hitDice,
					magicalAptitude: clazz.magicalAptitude,
					multiclass: clazz.multiClassRequisite,
					known: clazz.castsKnown,
					prepared: clazz.castPrepared,
					shortDescription: clazz.description,
					description: clazz.description,
				});
			} else {
				this.toastService.showErrorToast('Error', 'La clase no existe');
				this.router.navigate(['/admin/classes']);
			}
		});
	}

	onSubmit(saveAddOther: boolean = false) {
		if (this.classForm.invalid) {
			this.classForm.markAllAsTouched();
			this.markAllAsDirty();

			this.toastService.showErrorToast('Error', 'Completa todos los campos');


		} else {
			const request = this.buildClassRequest();
			const operation = this.isEditMode
				? this.adminService.updateClass(request)
				: this.adminService.saveClass(request);

			operation.subscribe(spell => {

				if (spell) {
					this.toastService.showSuccessToast('Éxito',
						this.isEditMode
							? 'Clase actualizada con éxito'
							: 'Clase añadida con éxito');

					if (saveAddOther && !this.isEditMode) {
						this.classForm.reset();
					} else {
						this.router.navigate(['/admin/classes']);
					}

				} else {
					this.toastService.showWarningToast('Error', 'Ya existe una clase con ese nombre');
				}
			});
		}
	}

	buildClassRequest(): CompleteClass {
		return {
			id: this.classId ? this.classId : 0,
			name: this.classForm.get('name')?.value,
			source: this.classForm.get('source')?.value,
			hitDice: this.classForm.get('hitDice')?.value,
			magicalAptitude: this.classForm.get('magicalAptitude')?.value,
			multiClassRequisite: this.classForm.get('multiclass')?.value,
			castsKnown: this.classForm.get('known')?.value,
			castPrepared: this.classForm.get('prepared')?.value,
			description: this.classForm.get('description')?.value,
			simpleDescription: this.classForm.get('shortDescription')?.value,
			spells: [],
			levels: []
		};
	}

	markAllAsDirty(): void {
		Object.keys(this.classForm.controls).forEach(controlName => {
			const control = this.classForm.get(controlName);
			control?.markAsDirty();
		});
	}
}
