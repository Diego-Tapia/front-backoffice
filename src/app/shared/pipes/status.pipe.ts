import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    if(value === 'ACTIVE') return 'Activo'
    if(value === 'PENDING_APPROVE') return 'Aprobacion Pendiente'
    if(value === 'INACTIVE') return 'Inactivo'
  }

}
