import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpellsService} from '../../../../spells/services/spells.service';
import {CheckboxChangeEvent} from 'primeng/checkbox';
import {MessageService} from 'primeng/api';

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
		private messageService: MessageService
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
			verbal: [false],
			somatic: [false],
			material: [false]
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

	onSubmit() {
		if (this.spellForm.invalid) {
			this.spellForm.markAllAsTouched();
			this.markAllAsDirty();

			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'Completa los campos requeridos',
				life: 3000
			});

			return;
		} else {
			console.log('Es válido');
		}
	}

	markAllAsDirty(): void {
		Object.keys(this.spellForm.controls).forEach(controlName => {
			const control = this.spellForm.get(controlName);
			control?.markAsDirty();
		});
	}
}
