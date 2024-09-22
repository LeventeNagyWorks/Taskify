import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <header class="flex justify-between items-center py-4 px-6">
        <h1 class="lg:text-[40px] font-semibold text-indigo-600 select-none">Taskify</h1>
        <nav class="flex justify-center items-center gap-4">
          <a 
            class="flex justify-center items-center gap-3 font-semibold text-indigo-600 hover:text-zinc-100 hover:bg-indigo-600 border-2 border-indigo-600 px-3 py-1 rounded-lg cursor-pointer duration-500 select-none" 
            routerLink="/edit-tasks"
          >
            <fa-icon [icon]="faPencil" [class]="'scale-[90%]'"></fa-icon>
            <p>Szerkesztése</p>
          </a>
          <a 
            class="flex justify-center items-center gap-3 font-semibold text-zinc-100 bg-indigo-600 border-2 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 px-3 py-1 rounded-lg cursor-pointer duration-500 select-none" 
            routerLink="/create-task"
          >
            <fa-icon [icon]="faPlus" [class]="'scale-[120%]'"></fa-icon>
            <p>Új feladat</p>
          </a>
        </nav>
    </header>
  `
})
export class HeaderComponent {
  faPlus = faPlus;
  faPencil = faPencil;
}