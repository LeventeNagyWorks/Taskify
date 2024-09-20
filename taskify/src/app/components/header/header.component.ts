import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="flex justify-between items-center py-4 px-6">
        <h1 class="lg:text-[40px] font-semibold text-indigo-600 select-none">Taskify</h1>
        <nav class="flex justify-center items-center gap-4">
          <a 
            class="font-semibold hover:text-zinc-100 hover:bg-indigo-600 border-2 border-indigo-600 px-3 py-1 rounded-lg cursor-pointer duration-500 select-none" 
            routerLink="/edit-tasks"
          >
            Feladatok szerkesztése
          </a>
          <a 
            class="font-semibold text-zinc-100 bg-indigo-600 border-2 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 px-3 py-1 rounded-lg cursor-pointer duration-500 select-none" 
            routerLink="/create-task"
          >
            Új feladat létrehozása
          </a>
        </nav>
    </header>
  `
})
export class HeaderComponent {}