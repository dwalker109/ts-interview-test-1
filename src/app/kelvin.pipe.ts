import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "kelvin"
})
export class KelvinPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return (value - 273.15).toFixed(2);
  }
}
