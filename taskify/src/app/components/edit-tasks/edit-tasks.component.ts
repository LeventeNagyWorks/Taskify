import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-btn.component';

@Component({
  selector: 'app-edit-tasks',
  standalone: true,
  imports: [ RouterLink, BackButtonComponent],
  template: `
    <div class="h-full min-h-full w-full flex flex-col justify-start items-center p-4">
      <div class="w-full h-20 flex justify-start items-center">
        <app-back-button [route]="'/'"></app-back-button>
      </div>
      <h2 class="select-none font-semibold text-[50px] text-indigo-500 mb-4">Feladatok Szerkesztése</h2>
      <ul>
          
      </ul>
    </div>
  `
})
export class EditTasksComponent {
  // Component logic will go here
}