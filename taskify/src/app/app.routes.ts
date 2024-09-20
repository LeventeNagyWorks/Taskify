import { Routes } from '@angular/router';
import { TasksComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTasksComponent } from './components/edit-tasks/edit-tasks.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: '', component: TasksComponent },
    { path: 'create-task', component: CreateTaskComponent },
    { path: 'edit-tasks', component: EditTasksComponent }
];
