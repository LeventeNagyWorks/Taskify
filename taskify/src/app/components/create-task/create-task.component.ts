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
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="w-full max-w-2xl">
        <div class="mb-4">
          <label for="title" class="block mb-2">Feladat címe:</label>
          <input type="text" id="title" formControlName="title" class="w-full p-2 border rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500">
          <div *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched" class="text-red-500 mt-1">
            A cím megadása kötelező!
          </div>
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2">Leírás:</label>
          <textarea id="description" formControlName="description" class="w-full p-2 border rounded-lg focus:text-indigo-600 caret-indigo-600 outline-none duration-500"></textarea>
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

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe(() => {
        this.taskForm.reset();
        // You can add a success message or navigate to the task list here
      });
    }
  }
}