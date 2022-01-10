import { ActionReducerMap } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { setGetActivosReducer } from '../activos/data-activos/store/get-activos/activos.reducer';
import { setVerifyUsuarioReducer } from '../usuarios/data-usuarios/store/verify/verify-usuarios.reducer';
import { setGetIncrementosMasivosReducer } from './data-incrementos/store/get-inc-mas.reducer';
import { setGetIncrementosReducer } from './data-incrementos/store/get-inc.reducer';
import { setNuevoIncrementoReducer } from './nuevo-incremento-individual/store/nuevo-inc.reducer';
import { setNuevoIncrementoMasivoReducer } from './nuevo-incremento-masivo/store/nuevo-inc-mas.reducer';
export interface IIncrementoReducersMap {
	nuevoIncremento: IState<null>;
	getIncrementos: IState<any>;
	nuevoIncrementoMasivo: IState<IResMasivo | null>;
	getIncrementosMasivos: IState<IResMasivo[] |  null>;
	getActivos: IState<IActivo[] | null>;
	verifyUsuario: IState<IUserProfile | null>;
}

export const incrementoReducersMap: ActionReducerMap<IIncrementoReducersMap> = {
	nuevoIncremento: setNuevoIncrementoReducer,
	getIncrementos: setGetIncrementosReducer,
	nuevoIncrementoMasivo: setNuevoIncrementoMasivoReducer,
	getIncrementosMasivos: setGetIncrementosMasivosReducer,
	getActivos: setGetActivosReducer,
	verifyUsuario: setVerifyUsuarioReducer
};
