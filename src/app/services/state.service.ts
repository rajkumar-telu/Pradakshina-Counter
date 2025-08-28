import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
  count: number;
  target: number;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  date: string;
  total: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  audioEnabled: boolean;
  hapticsEnabled: boolean;
  tapOnRing: boolean;
  longPressEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly STATE_KEY = 'pradakshina_counter_v1';
  private readonly HISTORY_KEY = 'pradakshina_history_v1';
  private readonly PREFS_KEY = 'pradakshina_prefs_v1';

  private stateSubject = new BehaviorSubject<AppState>({
    count: 0,
    target: 108,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  private historySubject = new BehaviorSubject<HistoryEntry[]>([]);
  private prefsSubject = new BehaviorSubject<UserPreferences>({
    theme: 'system',
    audioEnabled: true,
    hapticsEnabled: true,
    tapOnRing: false,
    longPressEnabled: false
  });

  public state$ = this.stateSubject.asObservable();
  public history$ = this.historySubject.asObservable();
  public prefs$ = this.prefsSubject.asObservable();

  constructor() {
    this.loadState();
    this.loadHistory();
    this.loadPreferences();
    this.applyTheme();
  }

  // State management
  getState(): AppState {
    return this.stateSubject.value;
  }

  updateCount(count: number): void {
    const currentState = this.stateSubject.value;
    const clampedCount = Math.max(0, Math.min(count, currentState.target));
    
    if (clampedCount !== currentState.count) {
      const newState: AppState = {
        ...currentState,
        count: clampedCount,
        updatedAt: new Date().toISOString()
      };
      
      this.stateSubject.next(newState);
      this.saveState();
      this.appendHistory(clampedCount);
    }
  }

  setTarget(target: number): void {
    const currentState = this.stateSubject.value;
    const validTarget = Math.max(1, Math.floor(target));
    
    if (validTarget !== currentState.target) {
      const newState: AppState = {
        ...currentState,
        target: validTarget,
        count: Math.min(currentState.count, validTarget),
        updatedAt: new Date().toISOString()
      };
      
      this.stateSubject.next(newState);
      this.saveState();
    }
  }

  resetCount(): void {
    this.updateCount(0);
  }

  resetAll(): void {
    const newState: AppState = {
      count: 0,
      target: 108,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.stateSubject.next(newState);
    this.saveState();
  }

  // History management
  appendHistory(count: number): void {
    const today = new Date().toISOString().split('T')[0];
    const currentHistory = this.historySubject.value;
    const todayIndex = currentHistory.findIndex(entry => entry.date === today);
    
    if (todayIndex >= 0) {
      // Update existing entry
      const updatedHistory = [...currentHistory];
      updatedHistory[todayIndex] = { date: today, total: count };
      this.historySubject.next(updatedHistory);
    } else {
      // Add new entry
      const newEntry: HistoryEntry = { date: today, total: count };
      this.historySubject.next([...currentHistory, newEntry]);
    }
    
    this.saveHistory();
  }

  clearHistory(): void {
    this.historySubject.next([]);
    this.saveHistory();
  }

  // Preferences management
  updatePreferences(prefs: Partial<UserPreferences>): void {
    const currentPrefs = this.prefsSubject.value;
    const newPrefs: UserPreferences = { ...currentPrefs, ...prefs };
    
    this.prefsSubject.next(newPrefs);
    this.savePreferences();
    
    if (prefs.theme !== undefined) {
      this.applyTheme();
    }
  }

  // Theme management
  private applyTheme(): void {
    const prefs = this.prefsSubject.value;
    const root = document.documentElement;
    
    if (prefs.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        root.classList.toggle('dark', e.matches);
      };
      
      updateTheme(mediaQuery);
      mediaQuery.addEventListener('change', updateTheme);
    } else {
      root.classList.toggle('dark', prefs.theme === 'dark');
    }
  }

  // Export/Import
  exportData(): string {
    const data = {
      state: this.stateSubject.value,
      history: this.historySubject.value,
      preferences: this.prefsSubject.value,
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.state && data.history && data.preferences) {
        this.stateSubject.next(data.state);
        this.historySubject.next(data.history);
        this.prefsSubject.next(data.preferences);
        
        this.saveState();
        this.saveHistory();
        this.savePreferences();
        this.applyTheme();
        
        return true;
      }
    } catch (error) {
      console.error('Failed to import data:', error);
    }
    
    return false;
  }

  // Persistence
  private saveState(): void {
    localStorage.setItem(this.STATE_KEY, JSON.stringify(this.stateSubject.value));
  }

  private saveHistory(): void {
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.historySubject.value));
  }

  private savePreferences(): void {
    localStorage.setItem(this.PREFS_KEY, JSON.stringify(this.prefsSubject.value));
  }

  private loadState(): void {
    try {
      const stored = localStorage.getItem(this.STATE_KEY);
      if (stored) {
        const state = JSON.parse(stored) as AppState;
        this.stateSubject.next(state);
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  }

  private loadHistory(): void {
    try {
      const stored = localStorage.getItem(this.HISTORY_KEY);
      if (stored) {
        const history = JSON.parse(stored) as HistoryEntry[];
        this.historySubject.next(history);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }

  private loadPreferences(): void {
    try {
      const stored = localStorage.getItem(this.PREFS_KEY);
      if (stored) {
        const prefs = JSON.parse(stored) as UserPreferences;
        this.prefsSubject.next(prefs);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }
} 