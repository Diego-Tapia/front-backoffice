import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IActivo } from 'src/app/shared/models/activo.interface';
import { IAplicabilidad } from 'src/app/shared/models/aplicabilidad.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IActivosReducersMap } from '../activos.reducers.map';
import { setGetActivosById, setGetActivosByIdClear } from '../data-activos/store/activos-by-id.actions';
import { setModificarActivo, setModificarActivoClear } from './store/modificacion-activo.actions';

@Component({
	selector: 'app-modificacion-activo',
	templateUrl: './modificacion-activo.component.html',
	styleUrls: ['./modificacion-activo.component.sass']
})
export class ModificacionActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	isLinear = false;
	activos!: IActivo;
	id!: string;

	//FORM DATA
	selectable = true;
	removable = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];
	filteredApplicabilities!: Observable<IAplicabilidad[]>;
	applicabilities: any[] = [];
	applicabilitiesResume: string[] = []
	applicabilityCtrl = new FormControl();
	allApplicabilities: IAplicabilidad[] = [];

	@ViewChild('applicabilityInput') applicabilityInput!: ElementRef<HTMLInputElement>;

	myForm = this.formBuilder.group({
		description: ['', [Validators.required]],
		shortName: ['', [Validators.required]],
		symbol: ['', [Validators.required]],
		initialAmount: ['', [Validators.required]],
		money: [''],
		price: [''],
		emited: [''],
		status: [''],
		applicabilities: [this.applicabilities],
		validFrom: [''],
		validTo: [''],
		transferable: [''],
		observations: ['']
	});

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private noti: NotificationsService,
		private store: Store<{ activosRedecuersMap: IActivosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('activosRedecuersMap', 'getActivosById').subscribe((res: IState<IActivo>) => {
				this.handleGetActivosById(res);
			}),
			this.store.select('activosRedecuersMap', 'getAplicabilidades').subscribe((res: IState<IAplicabilidad[]>) => {
				// this.handleGetAplicabilidades(res);
			}),
			this.store.select('activosRedecuersMap', 'modificarActivo').subscribe((res: IState<IActivo>) => {
				this.handleModificarActivo(res);
			})
		);

		this.filteredApplicabilities = this.applicabilityCtrl.valueChanges.pipe(
			startWith(null),
			map((applicability: string | null) =>
				applicability ? this._filter(applicability) : this.allApplicabilities.slice()
			)
		);
	}

	ngOnInit(): void {
		this.subscriptions.push(this.route.params.subscribe((params) => (this.id = params.id)));
		this.store.dispatch(setGetActivosById({ id: this.id }));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetActivosByIdClear());
		this.store.dispatch(setModificarActivoClear());
	}

	handleGetActivosById(res: IState<IActivo>): void {
		if (res.success) this.updateFormValues(res.response);
	}

	modificarActivo() {
		if (!this.myForm.valid)
			return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de modificación de activos');
		return this.store.dispatch(setModificarActivo({ id: this.id, form: this.myForm.value }));
	}

	handleModificarActivo(res: IState<IActivo>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Se ha modificado el activo con éxito');
			this.router.navigateByUrl('home/activos');
		}
	}

	updateFormValues(activo: IActivo) {
		this.myForm.patchValue({
			description: activo.description,
			shortName: activo.shortName,
			symbol: activo.symbol,
			initialAmount: activo.initialAmount,
			money: activo.money,
			price: activo.price,
			emited: activo.emited,
			status: activo.status,
			applicabilities: activo.applicabilities,
			validFrom: activo.validFrom,
			validTo: activo.validTo,
			transferable: activo.transferable,
			observations: activo.observations
		});
	}

	//APPLICABILITY FILTER
	//Filtro aplicabilidad
	add(event: MatChipInputEvent): void {

		const value = (event.value || '').trim();

		if (value) this.applicabilities.push(value);
		event.chipInput!.clear();
		this.applicabilityCtrl.setValue(null);
	}

	remove(applicability: string): void {
		const index = this.applicabilities.indexOf(applicability);
		if (index >= 0) {
			this.applicabilities.splice(index, 1);
			this.applicabilitiesResume.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {

		if (!this.applicabilities.find(app => app.id === event.option.value.id)) {
			this.applicabilitiesResume.push(event.option.value.name)
			this.applicabilities.push(event.option.value);
		}

		this.applicabilityInput.nativeElement.value = '';
		this.applicabilityCtrl.setValue(null);
	}

	private _filter(value: string): any {
		if (typeof (value) === 'string') {
			const filterValue = value.toLowerCase();
			return this.allApplicabilities.filter((applicability) => applicability.name.toLowerCase().includes(filterValue));
		}
	}
}
