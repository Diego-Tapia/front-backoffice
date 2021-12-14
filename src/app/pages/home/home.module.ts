import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

/* MATERIAL */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [HomeComponent, HeaderComponent],
	imports: [CommonModule, HomeRoutingModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule]
})
export class HomeModule {}
