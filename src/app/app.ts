import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }
    
    main {
      height: 100%;
    }
  `]
})
export class AppComponent {
  title = 'Pradakshina Counter';
}
