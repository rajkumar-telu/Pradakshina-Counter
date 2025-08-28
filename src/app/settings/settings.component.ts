import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService, UserPreferences, HistoryEntry } from '../services/state.service';
import { IconComponent } from '../ui/icon/icon.component';
import { SheetComponent } from '../ui/sheet/sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, SheetComponent],
  template: `
    <app-sheet [isOpen]="true" (closeSheet)="close()">
      <div class="settings-content">
        <h2 class="settings-title">Settings</h2>
        
        <!-- Theme Settings -->
        <section class="settings-section">
          <h3 class="section-title">
            <app-icon name="sun" size="20"></app-icon>
            Theme
          </h3>
          <div class="setting-item">
            <label for="theme-select" class="setting-label">Appearance</label>
            <select 
              id="theme-select"
              [(ngModel)]="preferences.theme"
              (change)="updatePreferences()"
              class="setting-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </section>

        <!-- Feedback Settings -->
        <section class="settings-section">
          <h3 class="section-title">
            <app-icon name="volume" size="20"></app-icon>
            Feedback
          </h3>
          <div class="setting-item">
            <label class="setting-label">Audio</label>
            <div class="toggle-container">
              <input 
                type="checkbox" 
                id="audio-toggle"
                [(ngModel)]="preferences.audioEnabled"
                (change)="updatePreferences()"
                class="toggle-input"
              />
              <label for="audio-toggle" class="toggle-label">
                <app-icon 
                  [name]="preferences.audioEnabled ? 'volume' : 'volume-off'" 
                  size="16"
                ></app-icon>
              </label>
            </div>
          </div>
          
          <div class="setting-item">
            <label class="setting-label">Haptics</label>
            <div class="toggle-container">
              <input 
                type="checkbox" 
                id="haptics-toggle"
                [(ngModel)]="preferences.hapticsEnabled"
                (change)="updatePreferences()"
                class="toggle-input"
              />
              <label for="haptics-toggle" class="toggle-label">
                <app-icon 
                  [name]="preferences.hapticsEnabled ? 'vibrate' : 'vibrate-off'" 
                  size="16"
                ></app-icon>
              </label>
            </div>
          </div>
        </section>

        <!-- History Section -->
        <section class="settings-section">
          <h3 class="section-title">
            <app-icon name="history" size="20"></app-icon>
            History
          </h3>
          
          <div class="history-list" *ngIf="history.length > 0; else noHistory">
            <div 
              *ngFor="let entry of history.slice().reverse()" 
              class="history-item"
            >
              <span class="history-date">{{ formatDate(entry.date) }}</span>
              <span class="history-count">{{ entry.total }} rounds</span>
            </div>
          </div>
          
          <ng-template #noHistory>
            <p class="no-history">No history yet. Start counting to see your progress!</p>
          </ng-template>
          
          <button 
            *ngIf="history.length > 0"
            (click)="clearHistory()" 
            class="danger-button"
            aria-label="Clear history"
          >
            <app-icon name="trash" size="16"></app-icon>
            Clear History
          </button>
        </section>

        <!-- Data Management -->
        <section class="settings-section">
          <h3 class="section-title">
            <app-icon name="download" size="20"></app-icon>
            Data
          </h3>
          
          <div class="data-actions">
            <button 
              (click)="exportData()" 
              class="action-button"
              aria-label="Export data"
            >
              <app-icon name="download" size="16"></app-icon>
              Export
            </button>
            
            <button 
              (click)="importData()" 
              class="action-button"
              aria-label="Import data"
            >
              <app-icon name="upload" size="16"></app-icon>
              Import
            </button>
          </div>
          
          <input 
            #fileInput
            type="file" 
            accept=".json"
            (change)="onFileSelected($event)"
            class="file-input"
            style="display: none;"
          />
        </section>

        <!-- About Section -->
        <section class="settings-section">
          <h3 class="section-title">
            <app-icon name="info" size="20"></app-icon>
            About
          </h3>
          <div class="about-content">
            <p class="app-description">
              Pradakshina Counter is a mobile-first PWA for counting spiritual rounds. 
              Your data is stored locally and never shared.
            </p>
            <p class="app-version">Version 1.0.0</p>
          </div>
        </section>
      </div>
    </app-sheet>
  `,
  styleUrl: './settings.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  preferences: UserPreferences = {
    theme: 'system',
    audioEnabled: true,
    hapticsEnabled: true,
    tapOnRing: false,
    longPressEnabled: false
  };
  
  history: HistoryEntry[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to preferences and history
    const prefsSub = this.stateService.prefs$.subscribe(prefs => {
      this.preferences = { ...prefs };
    });
    
    const historySub = this.stateService.history$.subscribe(history => {
      this.history = [...history];
    });

    this.subscriptions.push(prefsSub, historySub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updatePreferences(): void {
    this.stateService.updatePreferences(this.preferences);
  }

  clearHistory(): void {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      this.stateService.clearHistory();
    }
  }

  exportData(): void {
    const data = this.stateService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pradakshina-counter-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importData(): void {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (this.stateService.importData(content)) {
          alert('Data imported successfully!');
        } else {
          alert('Failed to import data. Please check the file format.');
        }
      };
      reader.readAsText(file);
      
      // Reset file input
      target.value = '';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }

  close(): void {
    this.router.navigate(['/']);
  }
} 