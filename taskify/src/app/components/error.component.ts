import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div [class]="'w-full h-screen flex justify-center items-center bg-zinc-800/40 backdrop-blur-md'">
        <div class="flex justify-center items-center">

        </div>
    </div>
  `
})
export class ErrorComponent {
    
}