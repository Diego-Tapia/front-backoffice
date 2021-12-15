import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* MATERIAL */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { setAuthReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [AuthComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatIconModule,
		StoreModule.forFeature('setAuthReducer', setAuthReducer),
		EffectsModule.forFeature([AuthEffects])
	]
})
export class AuthModule { }
