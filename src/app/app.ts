import { Component, signal } from '@angular/core';
import {CounterComponent} from './counter/counter';

@Component({
  selector: 'app-root',
  'standalone': true,
  imports: [CounterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
