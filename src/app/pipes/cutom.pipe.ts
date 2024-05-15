import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutom'
})
export class CutomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({
  name: 'trimReadMore'
})
export class TrimReadMorePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length <= 20) {
      return value;
    }

    return value.substring(0, 150) + ' ...';
  }
}

@Pipe({
  name: 'returnFirstUrl'
})
export class ReturnFirstUrlPipe implements PipeTransform {
  transform(value: string| undefined): string {
   if(value == undefined){
    return ''
   }
    const str_array = value.split(',')
    return str_array[0]
  }
}
