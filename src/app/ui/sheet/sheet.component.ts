import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div 
      class="sheet-backdrop" 
      [class.open]="isOpen"
      (click)="close()"
      [@slideInOut]
    >
      <div 
        class="sheet-content" 
        [class.open]="isOpen"
        (click)="$event.stopPropagation()"
        #sheetContent
        [@slideInOut]
      >
        <div class="sheet-header">
          <div class="sheet-handle"></div>
          <button 
            class="sheet-close" 
            (click)="close()"
            aria-label="Close"
          >
            <app-icon name="close" size="20"></app-icon>
          </button>
        </div>
        
        <div class="sheet-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sheet-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      
      &.open {
        opacity: 1;
        visibility: visible;
      }
    }
    
    .sheet-content {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--surface);
      border-radius: 20px 20px 0 0;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      
      &.open {
        transform: translateY(0);
      }
    }
    
    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      position: relative;
      border-bottom: 1px solid var(--border);
    }
    
    .sheet-handle {
      width: 40px;
      height: 4px;
      background-color: var(--muted);
      border-radius: 2px;
    }
    
    .sheet-close {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text);
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: var(--muted);
      }
      
      &:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }
    }
    
    .sheet-body {
      flex: 1;
      overflow-y: auto;
      padding: 0 20px 20px;
      
      /* Custom scrollbar */
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: var(--muted);
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: var(--secondary);
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb:hover {
        background: var(--accent);
      }
    }
    
    @media (min-width: 768px) {
      .sheet-content {
        left: 50%;
        right: auto;
        width: 400px;
        transform: translateX(-50%) translateY(100%);
        
        &.open {
          transform: translateX(-50%) translateY(0);
        }
      }
    }
  `],
  animations: [
    // You can add Angular animations here if needed
  ]
})
export class SheetComponent implements AfterViewInit, OnDestroy {
  @Input() isOpen = false;
  @Output() closeSheet = new EventEmitter<void>();
  
  @ViewChild('sheetContent') sheetContent!: ElementRef;
  
  private touchStartY = 0;
  private touchStartTransform = 0;
  private isDragging = false;

  ngAfterViewInit(): void {
    this.setupTouchHandlers();
  }

  ngOnDestroy(): void {
    this.removeTouchHandlers();
  }

  close(): void {
    this.closeSheet.emit();
  }

  private setupTouchHandlers(): void {
    const element = this.sheetContent.nativeElement;
    
    element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
  }

  private removeTouchHandlers(): void {
    const element = this.sheetContent.nativeElement;
    
    element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  private handleTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.touchStartY = touch.clientY;
    this.touchStartTransform = 0;
    this.isDragging = true;
  }

  private handleTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    event.preventDefault();
    
    const touch = event.touches[0];
    const deltaY = touch.clientY - this.touchStartY;
    
    if (deltaY > 0) {
      const transform = Math.min(deltaY, 100);
      const element = this.sheetContent.nativeElement;
      element.style.transform = `translateY(${transform}px)`;
      element.style.transition = 'none';
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    const touch = event.changedTouches[0];
    const deltaY = touch.clientY - this.touchStartY;
    
    const element = this.sheetContent.nativeElement;
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    if (deltaY > 100) {
      // Close if dragged down far enough
      this.close();
    } else {
      // Snap back to open position
      element.style.transform = 'translateY(0)';
    }
  }
} 