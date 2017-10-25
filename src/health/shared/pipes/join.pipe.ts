import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
/** Take comma seperated values */
export class JoinPipe implements PipeTransform {
  transform(value: any) {
    return Array.isArray(value) ? value.join(', ') : value;
  }
}
