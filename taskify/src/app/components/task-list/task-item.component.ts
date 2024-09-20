import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li class="h-16 flex items-center justify-between p-2 rounded-lg hover:bg-indigo-300 selection:bg-indigo-600 selection:text-zinc-100 duration-500"
        [ngClass]="{'bg-indigo-100': task.completed}">
        <div class="flex items-center">
            <label class="flex gap-4 items-center cursor-pointer">
                <input type="checkbox" 
                       [checked]="task.completed" 
                       (change)="onToggle()" 
                       class="form-checkbox h-5 w-5 flex justify-center items-center text-indigo-600 rounded focus:ring-indigo-600 border-gray-300">
                <span class="font-semibold" [ngClass]="{'line-through': task.completed}">{{ task.title }}</span>
            </label>
        </div>
        <button *ngIf="!task.completed" (click)="onDelete()" class="px-2 py-1 bg-red-500 hover:bg-red-600 duration-500 text-white rounded-lg select-none">
            Törölés
        </button>
    </li>
  `
})
export class TaskItemComponent {
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