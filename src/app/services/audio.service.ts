import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private clickAudio: HTMLAudioElement | null = null;
  private goalAudio: HTMLAudioElement | null = null;

  constructor(private stateService: StateService) {
    this.initializeAudio();
  }

  private initializeAudio(): void {
    try {
      // Create click sound (simple beep using Web Audio API)
      this.clickAudio = new Audio();
      this.clickAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
      this.clickAudio.preload = 'auto';
      
      // Create goal reached sound
      this.goalAudio = new Audio();
      this.goalAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
      this.goalAudio.preload = 'auto';
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  /**
   * Plays click sound if audio is enabled
   */
  playClick(): void {
    this.stateService.prefs$.subscribe(prefs => {
      if (prefs.audioEnabled && this.clickAudio) {
        try {
          this.clickAudio.currentTime = 0;
          this.clickAudio.play().catch(error => {
            console.warn('Failed to play click sound:', error);
          });
        } catch (error) {
          console.warn('Audio playback failed:', error);
        }
      }
    }).unsubscribe();
  }

  /**
   * Plays goal reached sound if audio is enabled
   */
  playGoalReached(): void {
    this.stateService.prefs$.subscribe(prefs => {
      if (prefs.audioEnabled && this.goalAudio) {
        try {
          this.goalAudio.currentTime = 0;
          this.goalAudio.play().catch(error => {
            console.warn('Failed to play goal sound:', error);
          });
        } catch (error) {
          console.warn('Audio playback failed:', error);
        }
      }
    }).unsubscribe();
  }

  /**
   * Preloads audio files
   */
  preloadAudio(): void {
    if (this.clickAudio) {
      this.clickAudio.load();
    }
    if (this.goalAudio) {
      this.goalAudio.load();
    }
  }

  /**
   * Cleanup audio resources
   */
  cleanup(): void {
    if (this.clickAudio) {
      this.clickAudio.src = '';
      this.clickAudio = null;
    }
    if (this.goalAudio) {
      this.goalAudio.src = '';
      this.goalAudio = null;
    }
  }
} 