import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textColor',
  standalone: true,
})
export class TextColorPipe implements PipeTransform {
  transform(value: string): string {
    const catalgo = ['unlock cashback', 'desbloquear bonificaciones'];
    catalgo.forEach((element: string) => {
      if (value.includes(element)) {
        const htmlStyle = `<span class="blue-text">${element}</span>`;
        value = value.replace(element, htmlStyle);
      }
    });
    return value;
  }
}
