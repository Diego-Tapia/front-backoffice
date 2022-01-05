import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    if(value === 'ACTIVE') return 'Activo'
    if(value === 'PENDING_APPROVE') return 'Aprobación Pendiente'
    if(value === 'INACTIVE') return 'Inactivo'
    if(value === 'BLOCKED') return 'Bloqueado'
    if(value === 'CREADO') return 'Creado'
    if(value === 'LISTO_PROCESAR') return 'Listo para procesar'
    if(value === 'INVALIDO') return 'Inválido'
    if(value === 'CANCELADO') return 'Cancelado'
    if(value === 'PROCESANDO') return 'Procesando'
    if(value === 'FINALIZADO') return 'Finalizado'
  }

}
