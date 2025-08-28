import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CounterComponent } from './counter';
import { StateService } from '../services/state.service';
import { HapticsService } from '../services/haptics.service';
import { AudioService } from '../services/audio.service';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let mockStateService: jasmine.SpyObj<StateService>;
  let mockHapticsService: jasmine.SpyObj<HapticsService>;
  let mockAudioService: jasmine.SpyObj<AudioService>;

  beforeEach(async () => {
    mockStateService = jasmine.createSpyObj('StateService', ['updateCount', 'setTarget', 'resetCount', 'resetAll'], {
      state$: jasmine.createSpyObj('Observable', ['subscribe'])
    });
    mockHapticsService = jasmine.createSpyObj('HapticsService', ['lightTap', 'mediumTap']);
    mockAudioService = jasmine.createSpyObj('AudioService', ['playClick', 'playGoalReached']);

    await TestBed.configureTestingModule({
      imports: [CounterComponent, RouterTestingModule],
      providers: [
        { provide: StateService, useValue: mockStateService },
        { provide: HapticsService, useValue: mockHapticsService },
        { provide: AudioService, useValue: mockAudioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count when increment is called', () => {
    component.count = 5;
    component.target = 10;
    
    component.increment();
    
    expect(mockStateService.updateCount).toHaveBeenCalledWith(6);
    expect(mockHapticsService.lightTap).toHaveBeenCalled();
    expect(mockAudioService.playClick).toHaveBeenCalled();
  });

  it('should not increment when count equals target', () => {
    component.count = 10;
    component.target = 10;
    
    component.increment();
    
    expect(mockStateService.updateCount).not.toHaveBeenCalled();
  });

  it('should decrement count when decrement is called', () => {
    component.count = 5;
    
    component.decrement();
    
    expect(mockStateService.updateCount).toHaveBeenCalledWith(4);
    expect(mockHapticsService.lightTap).toHaveBeenCalled();
  });

  it('should not decrement when count is 0', () => {
    component.count = 0;
    
    component.decrement();
    
    expect(mockStateService.updateCount).not.toHaveBeenCalled();
  });

  it('should set target when setTarget is called', () => {
    component.setTarget(50);
    
    expect(mockStateService.setTarget).toHaveBeenCalledWith(50);
  });

  it('should reset count when resetCount is called', () => {
    component.resetCount();
    
    expect(mockStateService.resetCount).toHaveBeenCalled();
    expect(mockHapticsService.mediumTap).toHaveBeenCalled();
  });

  it('should reset all when resetAll is called', () => {
    component.resetAll();
    
    expect(mockStateService.resetAll).toHaveBeenCalled();
    expect(mockHapticsService.mediumTap).toHaveBeenCalled();
  });

  it('should set quick goal when setQuickGoal is called', () => {
    component.setQuickGoal(21);
    
    expect(mockStateService.setTarget).toHaveBeenCalledWith(21);
    expect(mockHapticsService.lightTap).toHaveBeenCalled();
  });

  it('should calculate progress correctly', () => {
    component.count = 5;
    component.target = 10;
    
    component['updateProgress']();
    
    expect(component.progress).toBe(50);
  });

  it('should calculate dash offset correctly', () => {
    component.count = 5;
    component.target = 10;
    
    component['updateProgress']();
    
    expect(component.dashOffset).toBe(component['circumference'] * 0.5);
  });

  it('should return correct aria label', () => {
    component.count = 5;
    component.target = 10;
    component.progress = 50;
    
    const ariaLabel = component.getAriaLabel();
    
    expect(ariaLabel).toContain('Count 5 of 10');
    expect(ariaLabel).toContain('50 percent');
  });
});
