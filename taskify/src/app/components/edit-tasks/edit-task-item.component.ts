import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Task } from './edit-tasks.component';

@Component({
  selector: 'app-edit-task-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  providers: [DatePipe],
  template: `
    <li [class]="'h-fit flex flex-col items-center justify-center gap-4 p-2 rounded-lg selection:bg-indigo-600 selection:text-zinc-100 duration-500 ' + (isEditing ? '' : 'hover:bg-indigo-300')"
        [ngClass]="{'text-zinc-500': task.completed}"
        [ngClass]="{'bg-slate-100': isEditing}">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
            <label class="py-1 flex gap-4 items-center cursor-pointer">
              <input type="checkbox"
                    [checked]="task.completed"
                    (change)="onToggle()"
                    class="form-checkbox h-5 w-5 flex justify-center items-center text-indigo-600 rounded focus:ring-indigo-600 border-gray-300">
              <span *ngIf="!isEditing" class="font-semibold" [ngClass]="{'line-through text-zinc-500': task.completed}">{{ task.title }}</span>
              <input 
                *ngIf="isEditing" 
                [(ngModel)]="task.title" 
                (keyup.enter)="onSubmitEdit()" 
                (focus)="isTitleFocused = true"
                (blur)="isTitleFocused = false"
                [class]="'px-2 py-1 border-2 bg-transparent font-semibold rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500 ' + (isTitleFocused ? 'border-indigo-600' : 'border-black')">
            </label>
          </div>
          <div class="flex">
            <div class="w-fit flex justify-between items-center gap-3 px-10">
              <div class="flex items-center gap-3">
                <p *ngIf="!isEditing" [ngClass]="{'text-zinc-500': task.completed}" class="text-xl font-semibold select-none">
                  Határidő: {{ task.dueDate | date:'mediumDate' }}
                </p>
                <input 
                  *ngIf="isEditing" 
                  type="date" 
                  [(ngModel)]="task.dueDate" 
                  (focus)="isDueDateFocused = true"
                  (blur)="isDueDateFocused = false"
                  [class]="'px-2 py-1 border-2 bg-transparent font-semibold rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500 ' + (isDueDateFocused ? 'border-indigo-600' : 'border-black')">
              </div>
            </div>
            <button *ngIf="!isEditing" (click)="onEdit()" class="scale-[80%] w-11 h-11 px-[4px] py-[4px] bg-indigo-500 hover:bg-indigo-700 duration-500 text-white rounded-lg select-none">
              <fa-icon [icon]="faEdit"></fa-icon>
            </button>
            <button *ngIf="isEditing" (click)="onSubmitEdit()" class="scale-[110%] w-8 h-8 flex justify-center items-center px-[0px] py-[0px] mr-[6px] bg-green-600 hover:bg-green-700 duration-500 text-white rounded-lg select-none">
              <fa-icon [icon]="faCheck"></fa-icon>
            </button>
          </div>

        </div>
        <div *ngIf="!isEditing && task.description" class="w-full flex justify-start items-center gap-3 px-10">
          <span class="w-2 h-2 bg-indigo-600 rounded-full" [ngClass]="{'bg-zinc-500': task.completed}"></span>
          <p [ngClass]="{'text-zinc-500': task.completed}" class="text-xl">{{task.description}}</p>
        </div>
        <div *ngIf="isEditing" class="w-full flex justify-start items-center gap-3 px-10">
          <span class="w-2 h-2 bg-indigo-600 rounded-full" [ngClass]="{'bg-zinc-500': task.completed}"></span>
          <textarea 
            [(ngModel)]="task.description" 
            (focus)="isDescFocused = true" 
            (blur)="isDescFocused = false" 
            [class]="'w-full px-2 py-1 border-2 bg-transparent font-semibold rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500 ' + (isDescFocused ? 'border-indigo-600' : 'border-black')" 
            placeholder="Adj meg egy leírást" 
            (keyup.enter)="onSubmitEdit()">
          </textarea>
        </div>
    </li>
  `
})
export class EditTaskItemComponent {
  faEdit = faEdit;
  faCheck = faCheck;

  isTitleFocused: boolean = false;
  isDescFocused: boolean = false;
  isDueDateFocused: boolean = false;

  @Input() task!: Task;
  @Output() toggle = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();

  onToggle() {
    this.toggle.emit();
  }

  isEditing: boolean = false;

  onEdit() {
    this.isEditing = !this.isEditing;
  }


  onSubmitEdit() {
    if (this.task.title.trim() !== '') {
      if (this.task.dueDate) {
        this.task.dueDate = new Date(this.task.dueDate);
      }
      this.edit.emit(this.task);
      this.isEditing = false;
    } else {
      console.log('Task name cannot be empty');
    }
  }

}
