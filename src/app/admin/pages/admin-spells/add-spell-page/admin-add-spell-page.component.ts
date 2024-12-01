import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {SpellsService} from '../../../../spells/services/spells.service';
import {CheckboxChangeEvent} from 'primeng/checkbox';
import {MessageService} from 'primeng/api';
import {Spell} from '../../../../spells/interfaces/spells.interface';
import {SpellAdminService} from '../../../services/spell-admin.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-admin-add-spell-page',
	templateUrl: './admin-add-spell-page.component.html',
	styles: []
})
export class AdminAddSpellPageComponent implements OnInit {

	spellForm!: FormGroup;

	sourceItems: string[] = [];
	classItems: string[] = [];
	schoolsItems: string[] = [];
	levelItems: number[] = Array.from({length: 10}, (_, i) => i); // Niveles del 0 al 9

	constructor(
		private fb: FormBuilder,
		private spellsService: SpellsService,
		private adminService: SpellAdminService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.initializeForm();

		this.spellsService.getClasses()
			.subscribe(classes => this.classItems = classes);

		this.spellsService.getSchools()
			.subscribe(schools => this.schoolsItems = schools);

		this.spellsService.getSourceBooks()
			.subscribe(sourceBooks => this.sourceItems = sourceBooks);
	}

	initializeForm() {
		this.spellForm = this.fb.group({
			name: [undefined, Validators.required],
			source: ['Manual del Jugador', Validators.required],
			level: [0, Validators.required],
			school: ['Evocación', Validators.required],
			classes: [undefined, Validators.required],
			castingTime: [undefined, Validators.required],
			range: ['', Validators.required],
			materials: [{value: '', disabled: !this.spellForm?.get('material')?.value}, Validators.required],
			duration: ['', Validators.required],
			ritual: [false],
			concentration: [false],
			description: ['', Validators.required],
			highLevelsDescription: [''],
			components: this.fb.group({
				verbal: [false],
				somatic: [false],
				material: [false],
			}, {validators: this.atLeastOneComponentSelected})
		});
	}

	toggleMaterialField(event: CheckboxChangeEvent) {
		const materialsControl = this.spellForm.get('materials');

		if (event.checked) {
			materialsControl?.setValidators(Validators.required);
			materialsControl?.enable();
		} else {
			materialsControl?.clearValidators();
			materialsControl?.setValue('');
			materialsControl?.disable();
		}

		materialsControl?.updateValueAndValidity();
	}

	atLeastOneComponentSelected(control: AbstractControl): ValidationErrors | null {
		const components = control.value;
		const hasAtLeastOne = components.verbal || components.somatic || components.material;
		return hasAtLeastOne ? null : {noComponentSelected: true};
	}

	onSubmit(saveAddOther: boolean = false) {
		if (this.spellForm.invalid) {
			this.spellForm.markAllAsTouched();
			this.markAllAsDirty();

			this.showErrorToast('Completa todos los campos');

			if (this.spellForm.get('components')?.invalid) {
				this.showErrorToast('Elige al menos un componente');
			}

		} else {
			this.adminService.saveSpell(this.buildSpellRequest())
				.subscribe(spell => {
					if (spell) {

						this.showSuccessToast('Conjuro añadido con éxito');

						if (saveAddOther)
							this.spellForm.reset();
						else
							setTimeout(() => this.router.navigate(['/admin/spells']), 2000);

					} else {
						this.showWarningToast('Ya existe un conjuro con ese nombre');
					}
				});
		}
	}

	buildSpellRequest(): Spell {
		return {
			id: 0,
			name: this.spellForm.get('name')?.value,
			magicSchool: this.spellForm.get('school')?.value,
			level: this.spellForm.get('level')?.value,
			description: this.spellForm.get('description')?.value,
			castingTime: this.spellForm.get('castingTime')?.value,
			range: this.spellForm.get('range')?.value,
			components: this.getComponents(),
			materials: this.spellForm.get('materials')?.value || null,
			duration: this.spellForm.get('duration')?.value,
			ritual: this.spellForm.get('ritual')?.value,
			concentration: this.spellForm.get('concentration')?.value,
			highLevelsDescription: this.spellForm.get('highLevelsDescription')?.value || null,
			source: this.spellForm.get('source')?.value,
			classes: this.spellForm.get('classes')?.value
		};
	}

	getComponents(): string {
		const components = [];
		if (this.spellForm.get('components')?.get('verbal')?.value) components.push('V');
		if (this.spellForm.get('components')?.get('somatic')?.value) components.push('S');
		if (this.spellForm.get('components')?.get('material')?.value) components.push('M');
		return components.join(', ');
	}

	markAllAsDirty(): void {
		Object.keys(this.spellForm.controls).forEach(controlName => {
			const control = this.spellForm.get(controlName);
			control?.markAsDirty();
		});
	}

	showWarningToast(message: string): void {
		this.messageService.add({
			summary: 'Error',
			severity: 'warn',
			detail: message,
			life: 3000
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
