import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName = 
  | 'settings' 
  | 'plus' 
  | 'minus' 
  | 'reset' 
  | 'close' 
  | 'download' 
  | 'upload' 
  | 'trash' 
  | 'check' 
  | 'arrow-up' 
  | 'arrow-down'
  | 'sun'
  | 'moon'
  | 'system'
  | 'volume'
  | 'volume-off'
  | 'vibrate'
  | 'vibrate-off'
  | 'target'
  | 'history'
  | 'info';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="size" 
      [attr.height]="size" 
      [class]="'icon icon-' + name"
      [attr.aria-label]="ariaLabel || name"
      role="img"
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <ng-container [ngSwitch]="name">
        <!-- Settings -->
        <g *ngSwitchCase="'settings'">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.65V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.65-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.65V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.65 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.65 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.65 1z"/>
        </g>
        
        <!-- Plus -->
        <g *ngSwitchCase="'plus'">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </g>
        
        <!-- Minus -->
        <g *ngSwitchCase="'minus'">
          <line x1="5" y1="12" x2="19" y2="12"/>
        </g>
        
        <!-- Reset -->
        <g *ngSwitchCase="'reset'">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M3 21v-5h5"/>
        </g>
        
        <!-- Close -->
        <g *ngSwitchCase="'close'">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </g>
        
        <!-- Download -->
        <g *ngSwitchCase="'download'">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </g>
        
        <!-- Upload -->
        <g *ngSwitchCase="'upload'">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </g>
        
        <!-- Trash -->
        <g *ngSwitchCase="'trash'">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </g>
        
        <!-- Check -->
        <g *ngSwitchCase="'check'">
          <polyline points="20,6 9,17 4,12"/>
        </g>
        
        <!-- Arrow Up -->
        <g *ngSwitchCase="'arrow-up'">
          <path d="m18 15-6-6-6 6"/>
        </g>
        
        <!-- Arrow Down -->
        <g *ngSwitchCase="'arrow-down'">
          <path d="m6 9 6 6 6-6"/>
        </g>
        
        <!-- Sun -->
        <g *ngSwitchCase="'sun'">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </g>
        
        <!-- Moon -->
        <g *ngSwitchCase="'moon'">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </g>
        
        <!-- System -->
        <g *ngSwitchCase="'system'">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </g>
        
        <!-- Volume -->
        <g *ngSwitchCase="'volume'">
          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </g>
        
        <!-- Volume Off -->
        <g *ngSwitchCase="'volume-off'">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
          <path d="M17 16.95A9 9 0 0 1 5 12v-2m14 0v2a9 9 0 0 1-.05 1"/>
        </g>
        
        <!-- Vibrate -->
        <g *ngSwitchCase="'vibrate'">
          <path d="M12 2v20"/>
          <path d="M2 12h20"/>
          <path d="M6 6l12 12"/>
          <path d="M6 18l12-12"/>
        </g>
        
        <!-- Vibrate Off -->
        <g *ngSwitchCase="'vibrate-off'">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M12 2v20"/>
          <path d="M2 12h20"/>
        </g>
        
        <!-- Target -->
        <g *ngSwitchCase="'target'">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </g>
        
        <!-- History -->
        <g *ngSwitchCase="'history'">
          <path d="M12 8v4l3 3"/>
          <path d="M3.05 11a9 9 0 1 1 .5 3.98"/>
          <path d="M2 2v4h4"/>
        </g>
        
        <!-- Info -->
        <g *ngSwitchCase="'info'">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </g>
      </ng-container>
    </svg>
  `,
  styles: [`
    .icon {
      display: inline-block;
      vertical-align: middle;
    }
  `]
})
export class IconComponent {
  @Input() name: IconName = 'settings';
  @Input() set size(value: number | string) {
    this._size = typeof value === 'string' ? parseInt(value, 10) || 24 : value;
  }
  get size(): number {
    return this._size;
  }
  private _size: number = 24;
  @Input() ariaLabel?: string;
} 