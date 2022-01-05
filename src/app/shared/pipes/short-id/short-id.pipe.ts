import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortId'
})
export class ShortIdPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return '...'+value.slice(-5)
  }

}
