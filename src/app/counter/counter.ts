import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { HapticsService } from '../services/haptics.service';
import { AudioService } from '../services/audio.service';
import { IconComponent } from '../ui/icon/icon.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class CounterComponent implements OnInit, OnDestroy {
  count = 0;
  target = 108;
  progress = 0;
  dashOffset = 0;
  
  readonly r = 54;
  readonly circumference = 2 * Math.PI * this.r;
  private subscriptions: Subscription[] = [];

  constructor(
    private stateService: StateService,
    private hapticsService: HapticsService,
    private audioService: AudioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to state changes
    const stateSub = this.stateService.state$.subscribe(state => {
      this.count = state.count;
      this.target = state.target;
      this.updateProgress();
    });

    this.subscriptions.push(stateSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private updateProgress(): void {
    if (this.target <= 0) {
      this.progress = 0;
    } else {
      this.progress = Math.min(100, (this.count / this.target) * 100);
    }
    this.dashOffset = this.circumference * (1 - this.progress / 100);
  }

  increment(): void {
    if (this.count < this.target) {
      this.stateService.updateCount(this.count + 1);
      
      // Feedback
      this.hapticsService.lightTap();
      this.audioService.playClick();
      
      // Check if goal reached
      if (this.count + 1 >= this.target) {
        this.hapticsService.goalReached();
        this.audioService.playGoalReached();
      }
    }
  }

  decrement(): void {
    if (this.count > 0) {
      this.stateService.updateCount(this.count - 1);
      this.hapticsService.lightTap();
    }
  }

  setTarget(newTarget: number): void {
    this.stateService.setTarget(newTarget);
  }

  resetCount(): void {
    this.stateService.resetCount();
    this.hapticsService.mediumTap();
  }

  resetAll(): void {
    this.stateService.resetAll();
    this.hapticsService.mediumTap();
  }

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  // Quick goal presets
  setQuickGoal(goal: number): void {
    this.setTarget(goal);
    this.hapticsService.lightTap();
  }

  // Accessibility
  getAriaLabel(): string {
    return `Count ${this.count} of ${this.target}, ${this.progress.toFixed(0)} percent`;
  }
}


