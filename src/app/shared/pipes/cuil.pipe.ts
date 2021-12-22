import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuil'
})
export class CuilPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let cuil = value.toString()
    return cuil.slice(0,2)+"-"+cuil.slice(2,10)+"-"+cuil.slice(10);
  }

}
