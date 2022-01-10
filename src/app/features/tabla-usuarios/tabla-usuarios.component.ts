import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { setEditarUsuario, setEditarUsuarioClear } from 'src/app/pages/home/modules/usuarios/editar-usuario/store/editar-usuario.action';
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
	public idType: number = 0
	public userType!: string;
	public dataSource = new MatTableDataSource<IUserProfile>();

	@Input() usuarios!: IUserProfile[]
	@Output() updateValues = new EventEmitter();

	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

	constructor(
		public route: ActivatedRoute,
		private router: Router,
		private noti: NotificationsService,
		private store: Store<{ featuresReducersMap: IFeaturesReducersMap}>
	) {
		this.route.params.subscribe(params => this.userType = params.type)
		this.subscriptions.push(
			this.store.select('featuresReducersMap', 'editarUsuario').subscribe((res: IState<IUserProfile | null>) => {
				this.handleEditarUsuario(res);
			}),
		);
	}

	ngOnInit(): void {		
		this.dataSource = new MatTableDataSource(this.usuarios);
	}

	ngOnDestroy():void {
		this.store.dispatch(setEditarUsuarioClear());
		this.subscriptions.forEach((subs) => subs.unsubscribe());
	}

	ngOnChanges(changes: SimpleChanges) {		
		if(changes.usuarios.previousValue != changes.usuarios.currentValue) {	
			this.dataSource = new MatTableDataSource(this.usuarios);
			this.dataSource.paginator = this.paginator;
		}
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: any){
		this.dataSource.filter = event.target.value.trim().toLowerCase();
	}

	alternateId(){
		(this.idType < 2) ? this.idType++ : this.idType = 0;	
	}

	handleEditarUsuario(res:IState<IUserProfile | null>){
		if(res.error) this.noti.error('Error', res.error.error.message);
		if(res.success) {
			this.noti.success('Éxito','El estado del usuario se editó con éxito');
			this.updateValues.emit();
		} 
	}

	verDetalle(usuario: IUserProfile) {
	(usuario.userId)
		? this.router.navigate(['/home/usuarios/final/detalle', usuario.id])
		: this.router.navigate(['/home/usuarios/backoffice/detalle', usuario.id]);
	}
	
	editarUsuario(usuario: IUserProfile) {		
		if(usuario.userId) this.router.navigate(['/home/usuarios/final/editar', usuario.id])
		else this.router.navigate(['/home/usuarios/backoffice/editar', usuario.id]);
	}

	editarEstado(usuario: IUserProfile){
	(usuario.userId) ? 	this.userType = 'final' : this.userType = 'backoffice'
		let newStatus!: string;
		(usuario.status == 'ACTIVE') ? newStatus = 'INACTIVE' : newStatus = 'ACTIVE';
		this.store.dispatch(setEditarUsuario({id:usuario.id, form: {status: newStatus}, userType:this.userType}));
	}
}