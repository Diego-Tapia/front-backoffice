import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivosByIdReducer } from '../pages/home/modules/activos/data-activos/store/activos-by-id.reducer';

import { setEmitirActivosReducer } from './modal-emision-activo/store/emitir-activos.reducer';
import { setReemitirActivosReducer } from './modal-reemision-activo/store/reemitir-activos.reducer';


export interface IFeaturesReducersMap {
	emitirActivo: IState<any>;
	reemitirActivo: IState<any>;
	getActivosById: IState<any>;
}

export const featuresRedecuersMap: ActionReducerMap<IFeaturesReducersMap> = {
	emitirActivo: setEmitirActivosReducer,
	reemitirActivo: setReemitirActivosReducer,
	getActivosById: setGetActivosByIdReducer,
};
