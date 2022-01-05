import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { IActivosReducersMap } from '../activos.reducers.map';
import { IState } from 'src/app/shared/models/state.interface';
import { setNuevoActivo, setNuevoActivoClear } from './store/nuevo-activo.actions';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { IAplicabilidad } from 'src/app/shared/models/activos/aplicabilidad.interface';
import { setGetAplicabilidades, setGetAplicabilidadesClear } from '../store/get-aplicabilidades.actions';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IAdmin } from 'src/app/shared/models/admin.interface';

@Component({
	selector: 'app-creacion-activo',
	templateUrl: './creacion-activo.component.html',
	styleUrls: ['./creacion-activo.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class CreacionActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];

	isLinear = true;

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
	public admin!: IAdmin | undefined;

	@ViewChild('applicabilityInput') applicabilityInput!: ElementRef<HTMLInputElement>;

	firstStep = this.formBuilder.group({
		description: ['', [Validators.required]],
		shortName: ['', [Validators.required]],
		symbol: ['', [Validators.required]],
	})

	secondStep = this.formBuilder.group({
		initialAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
		validFrom: [''],
		validTo: [''],
		transferable: [false],
		observations: ['']
	})

	thirdStep = this.formBuilder.group({
		applicabilities: [this.applicabilities],
	})

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private noti: NotificationsService,
		private authService: AuthService,
		private store: Store<{ activosReducersMap: IActivosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('activosReducersMap', 'nuevoActivo').subscribe((res: IState<IActivo>) => {
				this.handleNuevoActivo(res);
			}),
			this.store.select('activosReducersMap', 'getAplicabilidades').subscribe((res: IState<IAplicabilidad[]>) => {
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
		this.admin = this.authService.getUserData()?.admin
		this.store.dispatch(setGetAplicabilidades());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevoActivoClear());
		this.store.dispatch(setGetAplicabilidadesClear());
	}

	crearActivo() {
		
		if (!this.firstStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el primer paso de creación de activos');
		if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el segundo paso de creación de activos');
		if (!this.thirdStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el tercer paso de creación de activos');		
		
		const formActivo: IActivo = {...this.firstStep.value, ...this.secondStep.value}
		formActivo.applicabilities = []
		this.thirdStep.value.applicabilities.forEach((app: IAplicabilidad) => formActivo.applicabilities?.push(app.id));
		if(this.admin) formActivo.clientId = this.admin.clientId;
		formActivo.money = 'ARS';
		formActivo.price = 1;
		formActivo.emited = false;
		formActivo.status = 'PENDING_APPROVE';

		return this.store.dispatch(setNuevoActivo({ form: formActivo }));
	}

	handleGetAplicabilidades(res: IState<IAplicabilidad[]>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las aplicabilidades');
		if (res.success && res.response) this.allApplicabilities = res.response
	}

	handleNuevoActivo(res: IState<IActivo>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Se ha creado el activo con éxito');
			this.router.navigateByUrl('home/activos');
		}
	}

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
