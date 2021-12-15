import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { IActivosReducersMap } from '../activos.reducers.map';
import { IState } from 'src/app/shared/models/state.interface';
import { setNuevoActivo, setNuevoActivoClear } from './store/nuevo-activo.actions';
import { IActivo } from 'src/app/shared/models/activo.interface';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { IAplicabilidad } from 'src/app/shared/models/aplicabilidad.interface';
import { setGetAplicabilidades } from '../store/get-aplicabilidades.actions';

@Component({
	selector: 'app-creacion-activo',
	templateUrl: './creacion-activo.component.html',
	styleUrls: ['./creacion-activo.component.sass']
})
export class CreacionActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];

	isLinear = false;

	startDate = Date.now();

	//Filtro Aplicabilidad
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
		money: ['ARS'],
		price: [1],
		emited: [false],
		status: ['PENDING_APPROVE'],
		applicabilities: [this.applicabilities],
		validFrom: [''],
		validTo: [''],
		transferible: [false],
		observations: [''],
		clientId: ['61b22f8f7793c500fc435705']
	});

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private noti: NotificationsService,
		private store: Store<{ activosRedecuersMap: IActivosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('activosRedecuersMap', 'nuevoActivo').subscribe((res: IState<IActivo>) => {
				this.handleNuevoActivo(res);
			}),
			this.store.select('activosRedecuersMap', 'getAplicabilidades').subscribe((res: IState<IAplicabilidad[]>) => {
				this.handleGetAplicabilidades(res);
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
		this.store.dispatch(setGetAplicabilidades());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevoActivoClear());
	}

	crearActivo() {
		if (!this.myForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de creación de activos');
		const applicabilities_form: IAplicabilidad[] = this.myForm.value.applicabilities
		const applicabilities_id: string[] = []

		applicabilities_form.forEach(app => applicabilities_id.push(app.id));

		this.myForm.patchValue({ applicabilities: applicabilities_id })

		console.log(this.myForm.value)
		return this.store.dispatch(setNuevoActivo({ form: this.myForm.value }));
	}

	handleGetAplicabilidades(res: IState<IAplicabilidad[]>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las aplicabilidades');
		if (res.success) {
			this.allApplicabilities = res.response
		}

	}

	handleNuevoActivo(res: IState<IActivo>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema creando el activo');
		if (res.success) {
			this.noti.success('Éxito', 'Se ha creado el activo con éxito');
			this.router.navigateByUrl('home/activos');
		}
	}

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
