import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class HapticsService {
  constructor(private stateService: StateService) {}

  /**
   * Provides haptic feedback if enabled and supported
   * @param pattern - Vibration pattern in milliseconds
   */
  vibrate(pattern: number | number[] = 10): void {
    this.stateService.prefs$.subscribe(prefs => {
      if (prefs.hapticsEnabled && 'vibrate' in navigator) {
        try {
          navigator.vibrate(pattern);
        } catch (error) {
          console.warn('Haptic feedback failed:', error);
        }
      }
    }).unsubscribe();
  }

  /**
   * Light tap feedback
   */
  lightTap(): void {
    this.vibrate(10);
  }

  /**
   * Medium tap feedback
   */
  mediumTap(): void {
    this.vibrate(20);
  }

  /**
   * Success feedback
   */
  success(): void {
    this.vibrate([50, 50, 50]);
  }

  /**
   * Error feedback
   */
  error(): void {
    this.vibrate([100, 50, 100]);
  }

  /**
   * Goal reached feedback
   */
  goalReached(): void {
    this.vibrate([100, 100, 100, 100]);
  }
} 