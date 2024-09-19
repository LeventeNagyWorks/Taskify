import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<p>Count: {{ count() }}</p>'
})
export class ExampleComponent {
  count = signal(0);

  increment() {
    this.count.update(val => val + 1);
  }
}