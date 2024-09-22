import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <a
      [routerLink]="route"
      (mouseenter)="isHovered = true"
      (mouseleave)="isHovered = false"
      class="flex justify-center items-center gap-2 py-1 px-3 text-indigo-600 hover:text-zinc-100 hover:bg-indigo-600 rounded-xl border-[2px] border-indigo-600 duration-500 cursor-pointer font-semibold select-none"
    >
      <fa-icon [icon]="faArrowLeft" [class]="'duration-500 ' + (isHovered ? 'animate-shake text-green-400' : 'animate-none text-indigo-600')"></fa-icon>
      <p>Vissza</p>
    </a>
  `
})
export class BackButtonComponent {
  faArrowLeft = faArrowLeft;
  @Input() route: string = '/';

  isHovered : boolean = false;
}