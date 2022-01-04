import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { setModificacionUsuarios, setModificacionUsuariosClear } from 'src/app/pages/home/modules/usuarios/modificacion-usuario/store/modificacion-usuarios.action';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TablaUsuariosComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
	
	private subscriptions: Subscription[] = [];
	public pageSize:number[] = [5]
	public displayedColumns: string[] = ['cuil', 'username', 'createdAt', 'status', 'star'];
	public userType!: string;
	public dataSource = new MatTableDataSource<IUserProfile>();

	@Input() usuarios!: IUserProfile[]
	@Output() updateValues = new EventEmitter();

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		public route: ActivatedRoute,
		private router: Router,
		private noti: NotificationsService,
		private store: Store<{ featuresReducersMap: IFeaturesReducersMap}>
	) {
		this.route.params.subscribe(params => this.userType = params.type)
		this.subscriptions.push(
			this.store.select('featuresReducersMap', 'modificarUsuario').subscribe((res: IState<any>) => {
				this.handleGetActivosById(res);
			}),
		);
	}

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.usuarios);
	}

	ngOnDestroy():void {
		this.store.dispatch(setModificacionUsuariosClear());
		this.subscriptions.forEach((subs) => subs.unsubscribe());
	}

	ngOnChanges(changes: SimpleChanges) {		
		if(changes.usuarios.previousValue != changes.usuarios.currentValue) {	
			this.dataSource = new MatTableDataSource(this.usuarios);
		}
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	handleGetActivosById(res: IState<any>){
		if(res.error) this.noti.error('Error', res.error.error.message);
		if(res.success) {
			this.noti.success('Éxito','El estado del usuario se modificó con éxito');
			this.updateValues.emit();
		} 
	}

	verDetalle(usuario: IUserProfile) {
	(usuario.userId)
		? this.router.navigate(['/home/usuarios/detalle/final', usuario.id])
		: this.router.navigate(['/home/usuarios/detalle/backoffice', usuario.id]);
	}
	
	modificarUsuario(usuario: IUserProfile) {		
		if(usuario.userId) this.router.navigate(['/home/usuarios/modificar/final', usuario.id])
		else this.router.navigate(['/home/usuarios/modificar/backoffice', usuario.id]);
	}

	modificarEstado(usuario: IUserProfile){
	(usuario.userId) ? 	this.userType = 'final' : this.userType = 'backoffice'
		let newStatus!: string;
		(usuario.userId.status == 'ACTIVE') ? newStatus = 'INACTIVE' : newStatus = 'ACTIVE';
		this.store.dispatch(setModificacionUsuarios({id:usuario.userId.id, form: {status: newStatus}, userType:this.userType}));
	}
}