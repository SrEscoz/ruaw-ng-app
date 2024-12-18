import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {MenuItem} from 'primeng/api';

@Component({
	selector: 'public-layout-page',
	standalone: false,

	templateUrl: './public-layout-page.component.html',
	styles: ``
})
export class PublicLayoutPageComponent implements OnInit {

	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);

	breadcrumbItems: MenuItem[] = [];
	homeItem: MenuItem | undefined;

	ngOnInit(): void {
		this.breadcrumbItems = this.buildBreadcrumbs(this.activatedRoute.root);
		this.homeItem = {icon: 'pi pi-home', routerLink: '/'};

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				this.breadcrumbItems = this.buildBreadcrumbs(this.activatedRoute.root);
			});
	}

	private buildBreadcrumbs(route: ActivatedRoute, url: string = ''): MenuItem[] {
		const breadcrumbs: MenuItem[] = [];
		let currentRoute: ActivatedRoute | null = route;

		while (currentRoute) {
			const routePath = currentRoute.snapshot.url.map(segment => segment.path).join('/');
			const routeData = currentRoute.snapshot.data;

			if (routePath) {
				url += `/${routePath}`;

				let label = routeData['breadcrumb'] || routePath;

				const params = currentRoute.snapshot.params;
				if (params && Object.keys(params).length > 0) {
					for (const key of Object.keys(params)) {
						label = label.replace(`:${key}`, params[key]);
					}
				}

				breadcrumbs.push({label, url});
			}

			currentRoute = currentRoute.firstChild;
		}

		return breadcrumbs;
	}
}
