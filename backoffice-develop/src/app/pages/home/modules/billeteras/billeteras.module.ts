import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BilleterasRoutingModule } from './billeteras-routing.module';
import { BilleterasComponent } from './billeteras.component';


@NgModule({
  declarations: [
    BilleterasComponent
  ],
  imports: [
    CommonModule,
    BilleterasRoutingModule
  ]
})
export class BilleterasModule { }
