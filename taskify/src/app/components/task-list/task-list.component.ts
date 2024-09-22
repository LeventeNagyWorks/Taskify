import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from './task-item.component';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import Scrollbar from 'smooth-scrollbar';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskItemComponent],
  template: `
    <div class="h-full min-h-full w-full flex flex-col items-center p-4">
      <h2 class="select-none font-semibold text-[50px] text-indigo-500 mt-8 mb-24">Feladatok</h2>
      <div class="w-full max-w-[900px]">
        <ul id="list" class="max-h-[650px] overflow-auto flex flex-col gap-3 bg-slate-300 py-6 px-4 rounded-3xl shadow-2xl shadow-slate-500">
          <app-task-item *ngFor="let task of tasks$ | async"
                     [task]="task"
                     (toggle)="toggleTask(task)"
                     (delete)="deleteTask(task)">
          </app-task-item>
          <li *ngIf="(tasks$ | async)?.length === 0">
            Jelenleg nincs egy teendője sem.
          </li>
        </ul>
      </div>
    </div>
  `
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.getTasks();

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
    Scrollbar.init(document.querySelector('#list') as HTMLElement);
  }

  toggleTask(task: Task) {
    this.taskService.toggleTask(task.id).subscribe();
  }

  deleteTask(task: Task) {
    if (!task.completed) {
      this.taskService.deleteTask(task.id).subscribe();
    }
  }
}