import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { BackButtonComponent } from '../back-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , BackButtonComponent],
  template: `
    <div class="h-full min-h-full w-full flex flex-col items-center justify-start p-4">
      <div class="w-full h-20 flex justify-start items-center">
        <app-back-button [route]="'/'"></app-back-button>
      </div>
      <h2 class="select-none font-semibold text-[50px] text-indigo-500 mb-24">Új feladat létrehozása</h2>
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="w-full max-w-3xl bg-slate-300 py-10 px-10 rounded-3xl shadow-2xl shadow-slate-500">
        <div class="mb-4">
          <label for="title" [class]="'block mb-2 font-semibold duration-500 ' + (isTitleFocused ? 'text-indigo-600' : '')">Feladat címe</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title" 
            (focus)="isTitleFocused = true" 
            (blur)="isTitleFocused = false"
            [class]="'w-full p-2 border-2 bg-transparent font-semibold rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500 ' + (isTitleFocused ? 'border-indigo-600' : 'border-black')">
          <div *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched" class="text-red-500 mt-1 text-xl">
            A cím megadása kötelező!
          </div>
        </div>
        <div class="mb-4">
          <label for="dueDate" [class]="'block mb-2 font-semibold duration-500 ' + (isDueDateFocused ? 'text-indigo-600' : '')">Due Date</label>
          <input
            type="date"
            id="dueDate"
            formControlName="dueDate"
            (focus)="isDueDateFocused = true"
            (blur)="isDueDateFocused = false"
            [class]="'w-full p-2 border-2 bg-transparent font-semibold rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500 ' + (isDueDateFocused ? 'border-indigo-600' : 'border-black')">
        </div>
        <div class="mb-4">
          <label for="description" [class]="'block mb-2 font-semibold duration-500 ' + (isDescFocused ? 'text-indigo-600' : '')">Leírás (opcionális)</label>
          <textarea 
            id="description" 
            formControlName="description" 
            (focus)="isDescFocused = true" 
            (blur)="isDescFocused = false"
            [class]="'w-full p-2 border-2 bg-transparent font-semibold rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500 ' + (isDescFocused ? 'border-indigo-600' : 'border-black')">
          </textarea>
        </div>
        <button 
          type="submit" [disabled]="taskForm.invalid" 
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed duration-500"
        >
          Feladat létrehozása
        </button>
      </form>
    </div>
  `
})
export class CreateTaskComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  isTitleFocused: boolean = false;
  isDescFocused: boolean = false;
  isDueDateFocused: boolean = false;

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: ['']
  });  

  formatDateForInput(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
  

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask({
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate ? new Date(this.taskForm.value.dueDate) : null
      }).subscribe(() => {
        this.taskForm.reset();
        // You can add a success message or navigate to the task list here
      });
    }
  }
  
}