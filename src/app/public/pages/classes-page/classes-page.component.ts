import {Component, OnInit} from '@angular/core';
import {MinimalClass} from '../../interfaces/classes.interface';
import {ClassesService} from '../../services/classes.service';

@Component({
	selector: 'public-class-page',
	templateUrl: './classes-page.component.html',
	styles: ``
})
export class ClassesPageComponent implements OnInit {

	classes: MinimalClass[] = [];

	constructor(private classService: ClassesService) {}

	ngOnInit(): void {
		this.loadClasses();
	}

	loadClasses(): void {
		this.classService.getClassess()
			.subscribe(classes => this.classes = classes);
	}

}
