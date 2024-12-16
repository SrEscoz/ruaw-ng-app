import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {SpellsService} from '../../../../public/services/spells.service';
import {CheckboxChangeEvent} from 'primeng/checkbox';
import {Spell} from '../../../../public/interfaces/spells.interface';
import {SpellAdminService} from '../../../services/spell-admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../shared/services/toast.service';

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

	isEditMode: boolean = false;
	spellId?: number;

	constructor(
		private fb: FormBuilder,
		private spellsService: SpellsService,
		private adminService: SpellAdminService,
		private toastService: ToastService,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.spellId = params['id'] ? +params['id'] : undefined;
			this.isEditMode = !!this.spellId;
		});


		this.initializeForm();

		this.spellsService.getClasses()
			.subscribe(classes => this.classItems = classes);

		this.spellsService.getSchools()
			.subscribe(schools => this.schoolsItems = schools);

		this.spellsService.getSourceBooks()
			.subscribe(sourceBooks => this.sourceItems = sourceBooks);

		if (this.isEditMode && this.spellId)
			this.loadSpellData(this.spellId);
	}

	initializeForm() {
		this.spellForm = this.fb.group({
			name: [undefined, Validators.required],
			source: ['Player\'s Handbook', Validators.required],
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

	loadSpellData(id: number): void {
		this.spellsService.getSpell(id).subscribe(spell => {
			if (spell) {
				this.spellForm.patchValue({
					name: spell.name,
					source: spell.source,
					level: spell.level,
					school: spell.magicSchool,
					classes: spell.classes,
					castingTime: spell.castingTime,
					range: spell.range,
					materials: spell.materials,
					duration: spell.duration,
					ritual: spell.ritual,
					concentration: spell.concentration,
					description: spell.description,
					highLevelsDescription: spell.highLevelsDescription,
					components: {
						verbal: spell.components.includes('V'),
						somatic: spell.components.includes('S'),
						material: spell.components.includes('M')
					}
				});
			} else {
				this.toastService.showErrorToast('Error', 'El conjuro no existe');
				this.router.navigate(['/admin/spells']);
			}
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

			this.toastService.showErrorToast('Éxito', 'Completa todos los campos');

			if (this.spellForm.get('components')?.invalid) {
				this.toastService.showErrorToast('Error', 'Elige al menos un componente');
			}

		} else {
			const request = this.buildSpellRequest();
			const operation = this.isEditMode
				? this.adminService.updateSpell(request)
				: this.adminService.saveSpell(request);

			operation.subscribe(spell => {

				if (spell) {
					this.toastService.showSuccessToast('Éxito',
						this.isEditMode ? 'Conjuro actualizado con éxito' : 'Conjuro añadido con éxito');

					if (saveAddOther && !this.isEditMode) {
						this.resetForm();

					} else {
						this.router.navigate(['/admin/spells']);
					}

				} else {
					this.toastService.showWarningToast('Error', 'Ya existe un conjuro con ese nombre');
				}
			});
		}
	}

	buildSpellRequest(): Spell {
		const descripton: string = this.spellForm.get('description')?.value;
		const highLevelsDescription: string = this.spellForm.get('highLevelsDescription')?.value;

		return {
			id: this.spellId ? this.spellId : 0,
			name: this.spellForm.get('name')?.value,
			magicSchool: this.spellForm.get('school')?.value,
			level: this.spellForm.get('level')?.value,
			description: this.replaceNonBreakingSpaces(descripton),
			castingTime: this.spellForm.get('castingTime')?.value,
			range: this.spellForm.get('range')?.value,
			components: this.getComponents(),
			materials: this.spellForm.get('materials')?.value || null,
			duration: this.spellForm.get('duration')?.value,
			ritual: this.spellForm.get('ritual')?.value,
			concentration: this.spellForm.get('concentration')?.value,
			highLevelsDescription: this.replaceNonBreakingSpaces(highLevelsDescription),
			source: this.spellForm.get('source')?.value,
			classes: this.spellForm.get('classes')?.value
		};
	}

	resetForm(): void {
		this.spellForm.reset({
			name: undefined,
			source: 'Player\'s Handbook',
			level: 0,
			school: 'Evocación',
			classes: undefined,
			castingTime: undefined,
			range: '',
			materials: '',
			duration: '',
			ritual: false,
			concentration: false,
			description: '',
			highLevelsDescription: '',
			components: {
				verbal: false,
				somatic: false,
				material: false
			}
		});

		this.spellForm.get('materials')?.disable();
		this.spellForm.get('materials')?.clearValidators();
		this.spellForm.get('materials')?.updateValueAndValidity();

		this.isEditMode = false;
		this.spellId = undefined;

		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
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

	replaceNonBreakingSpaces(text: string | null): string {
		if (text == null || text === '<p></p>')
			return '';

		return text.replace(/&nbsp;/g, ' ');
	}
}
