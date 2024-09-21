import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <li class="h-fit flex flex-col items-center justify-center gap-4 p-2 rounded-lg hover:bg-indigo-300 selection:bg-indigo-600 selection:text-zinc-100 duration-500"
        [ngClass]="{'text-zinc-500': task.completed}">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
              <label class="py-1 flex gap-4 items-center cursor-pointer">
                  <input type="checkbox" 
                        [checked]="task.completed" 
                        (change)="onToggle()" 
                        class="form-checkbox h-5 w-5 flex justify-center items-center text-indigo-600 rounded focus:ring-indigo-600 border-gray-300">
                  <span class="font-semibold" [ngClass]="{'line-through': task.completed}">{{ task.title }}</span>
              </label>
          </div>
          <button *ngIf="!task.completed" (click)="onDelete()" class="scale-[80%] w-11 h-11 px-[4px] py-[4px] bg-red-500 hover:bg-red-700 duration-500 text-white rounded-lg select-none">
            <fa-icon [icon]="faTrash"></fa-icon>
          </button>
        </div>
        <div *ngIf="task.description !== null && task.description !== ''" class="w-full flex justify-start items-center gap-3 px-10">
          <span class="w-2 h-2 bg-indigo-600 rounded-full" [ngClass]="{'bg-zinc-500': task.completed}"></span>
          <p class="text-xl">{{task.description}}</p>
        </div>
    </li>
  `
})
export class TaskItemComponent {
  faTrash = faTrash;
  @Input() task: any;
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}