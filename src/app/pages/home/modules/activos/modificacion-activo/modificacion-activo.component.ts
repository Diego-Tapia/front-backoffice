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
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IAplicabilidad } from 'src/app/shared/models/activos/aplicabilidad.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IActivosReducersMap } from '../activos.reducers.map';
import { setGetActivosById, setGetActivosByIdClear } from '../data-activos/store/activos-by-id.actions';
import { setGetAplicabilidades, setGetAplicabilidadesClear } from '../store/get-aplicabilidades.actions';
import { setModificarActivo, setModificarActivoClear } from './store/modificacion-activo.actions';

@Component({
	selector: 'app-modificacion-activo',
	templateUrl: './modificacion-activo.component.html',
	styleUrls: ['./modificacion-activo.component.sass']
})
export class ModificacionActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	isLinear = false;
	activo!: IActivo;
	id!: string;
	oldAppNames: string[] = []

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
		shortName: [{ value: '', disabled: true }],
		symbol: [{ value: '', disabled: true }],
		initialAmount: [{ value: '', disabled: true }],
		money: ['ARS'],
		price: [1],
		emited: [''],
		status: [''],
		applicabilities: [''],
		validFrom: [''],
		validTo: [''],
		transferable: [''],
		observations: [''],
		clientId: [''],
	});

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private noti: NotificationsService,
		private store: Store<{ activosReducersMap: IActivosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('activosReducersMap', 'getActivosById').subscribe((res: IState<IActivo>) => {
				this.handleGetActivosById(res);
			}),
			this.store.select('activosReducersMap', 'getAplicabilidades').subscribe((res: IState<IAplicabilidad[]>) => {
				this.handleGetAplicabilidades(res);
			}),
			this.store.select('activosReducersMap', 'modificarActivo').subscribe((res: IState<IActivo>) => {
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
		this.store.dispatch(setGetAplicabilidades());

	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetActivosByIdClear());
		this.store.dispatch(setGetAplicabilidadesClear());
		this.store.dispatch(setModificarActivoClear());
	}

	handleGetActivosById(res: IState<IActivo>): void {
		if (res.success && res.response) {
			this.activo = res.response;
			this.updateFormValues();
		}
	}

	handleGetAplicabilidades(res: IState<IAplicabilidad[]>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las aplicabilidades');
		if (res.success && res.response) this.allApplicabilities = res.response
	}

	modificarActivo() {
		if (!this.myForm.valid) 
			return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de modificación de activos');

		let appIds: string[] = [];
		this.applicabilities.forEach(app => appIds.push(app.id))
		this.myForm.patchValue({applicabilities: appIds})

		const { shortName, symbol, ...resto } = this.myForm.value

		return this.store.dispatch(setModificarActivo({ id: this.id, form: resto }));
	}

	handleModificarActivo(res: IState<IActivo>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Se ha modificado el activo con éxito');
			this.router.navigateByUrl('home/activos');
		}
	}

	updateFormValues() {

		if (this.activo.applicabilities) {
			this.activo.applicabilities.forEach((app:any) => {
				this.applicabilities.push(app);
				this.applicabilitiesResume.push(app.name);
			})
		}
		
		this.myForm.patchValue({
			description: this.activo.description,
			shortName: this.activo.shortName,
			symbol: this.activo.symbol,
			initialAmount: this.activo.initialAmount,
			money: this.activo.money,
			price: this.activo.price,
			emited: this.activo.emited,
			status: this.activo.status,
			applicabilities: this.activo.applicabilities,
			validFrom: this.activo.validFrom,
			validTo: this.activo.validTo,
			transferable: this.activo.transferable,
			observations: this.activo.observations,
			clientId: this.activo.clientId
		})
	}

	//APPLICABILITY FILTER
	//Filtro aplicabilidad
	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if((this.allApplicabilities.find(app => app.name === value))) {
			const writen = (this.allApplicabilities.find(app => app.name === value))
			if (writen) this.applicabilities.push(writen);
			event.chipInput!.clear();
			this.applicabilityCtrl.setValue(null);
		}
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
