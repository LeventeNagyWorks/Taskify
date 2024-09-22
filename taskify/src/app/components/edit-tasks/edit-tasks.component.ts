import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-btn.component';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { EditTaskItemComponent } from './edit-task-item.component';
import { Observable } from 'rxjs';
import Scrollbar from 'smooth-scrollbar';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
}

@Component({
  selector: 'app-edit-tasks',
  standalone: true,
  imports: [ RouterLink, BackButtonComponent, CommonModule, EditTaskItemComponent],
  template: `
    <div class="h-full min-h-full w-full flex flex-col justify-start items-center p-4">
      <div class="w-full h-20 flex justify-start items-center">
        <app-back-button [route]="'/'"></app-back-button>
      </div>
      <h2 class="select-none font-semibold text-[50px] text-indigo-500 mb-24">Feladatok Szerkesztése</h2>
      <div class="w-full max-w-[900px]">
        <ul id="list" class="lg:max-h-[580px] overflow-auto flex flex-col gap-3 bg-slate-300 py-6 px-4 rounded-3xl shadow-2xl shadow-slate-500">
          <app-edit-task-item *ngFor="let task of tasks$ | async"
                    [task]="task"
                    (toggle)="toggleTask(task)"
                    (edit)="editTask($event)">
          </app-edit-task-item>
          <li *ngIf="(tasks$ | async)?.length === 0">
            Jelenleg nincs egy teendője sem.
          </li>
        </ul>
      </div>
    </div>
  `
})
export class EditTasksComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.getTasks();

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
    Scrollbar.init(document.querySelector('#list') as HTMLElement);
  }

  toggleTask(task: Task) {
    this.taskService.toggleTask(task.id).subscribe();
  }

  editTask(task: Task) {
    this.taskService.editTask(task).subscribe();
  }
}
