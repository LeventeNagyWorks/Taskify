import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route"
      class="py-1 px-2 text-indigo-600 hover:text-zinc-100 hover:bg-indigo-600 rounded-xl border-[2px] border-indigo-600 duration-500 cursor-pointer font-semibold select-none"
    >
      Vissza
    </a>
  `
})
export class BackButtonComponent {
    @Input() route: string = '/';
}