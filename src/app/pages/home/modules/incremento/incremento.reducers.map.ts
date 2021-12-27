import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivosReducer } from '../activos/data-activos/store/activos.reducer';
import { setVerifyUsuarioReducer } from '../usuarios/data-usuarios/store/verify/verify-usuarios.reducer';
import { setGetIncrementosMasivosReducer } from './data-incrementos/store/get-inc-mas.reducer';
import { setGetIncrementosReducer } from './data-incrementos/store/get-inc.reducer';
import { setNuevoIncrementoReducer } from './nuevo-incremento-individual/store/nuevo-inc.reducer';
import { setNuevoIncrementoMasivoReducer } from './nuevo-incremento-masivo/store/nuevo-inc-mas.reducer';
export interface IIncrementoReducersMap {
	nuevoIncremento: IState<any>;
	getIncrementos: IState<any>;
	nuevoIncrementoMasivo: IState<any>;
	getIncrementosMasivos: IState<any>;
	getActivos: IState<any>;
	verifyUsuario: IState<any>;
}

export const incrementoRedecuersMap: ActionReducerMap<IIncrementoReducersMap> = {
	nuevoIncremento: setNuevoIncrementoReducer,
	getIncrementos: setGetIncrementosReducer,
	nuevoIncrementoMasivo: setNuevoIncrementoMasivoReducer,
	getIncrementosMasivos: setGetIncrementosMasivosReducer,
	getActivos: setGetActivosReducer,
	verifyUsuario: setVerifyUsuarioReducer
};
