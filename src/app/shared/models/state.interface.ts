import { HttpErrorResponse } from '@angular/common/http';

export interface IState<T> {
	response: T;
	pending: boolean;
	success: boolean;
	error: HttpErrorResponse | null;
}
