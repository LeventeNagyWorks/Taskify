import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div [class]="'absolute left-0 top-0 w-full h-screen flex justify-center items-center bg-zinc-950/40 backdrop-blur-sm z-50'">
        <div class="w-[45%] h-[50%] flex flex-col justify-evenly items-center rounded-[30px] bg-slate-300">
            <h2 class="font-semibold text-[50px] select-none text-indigo-600">Siker!</h2>
            <h2 class="font-semibold text-3xl select-none">A feladatot sikeresen hozzáadtuk a listához.</h2>
            <button 
                (click)="onOkClick()" 
                class="flex justify-center items-center rounded-lg text-[30px] text-zinc-100 bg-indigo-600 px-4 py-2 select-none"
            >
                OK
            </button>
        </div>
    </div>
  `
})
export class SuccessComponent {
    @Output() close = new EventEmitter<void>();

    onOkClick() {
      this.close.emit();
    }
}