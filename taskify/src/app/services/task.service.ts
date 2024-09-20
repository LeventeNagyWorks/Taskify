import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks$.next(JSON.parse(storedTasks));
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks$.value));
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  addTask(task: Omit<Task, 'id' | 'completed'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      completed: false
    };
    const updatedTasks = [...this.tasks$.value, newTask];
    this.tasks$.next(updatedTasks);
    this.saveTasks();
    return this.tasks$.pipe(map(() => newTask));
  }

  toggleTask(id: number): Observable<Task> {
    const updatedTasks = this.tasks$.value.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasks$.next(updatedTasks);
    this.saveTasks();
    return this.tasks$.pipe(map(() => updatedTasks.find(task => task.id === id)!));
  }

  deleteTask(id: number): Observable<void> {
    const updatedTasks = this.tasks$.value.filter(task => task.id !== id);
    this.tasks$.next(updatedTasks);
    this.saveTasks();
    return of(undefined);
  }

  // Implement other methods for updating, deleting, and toggling tasks
}
