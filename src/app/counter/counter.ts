import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type State = {target:number, count: number};

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class CounterComponent implements OnInit{
  private storageKey = 'pradakshina_counter_v1';
  target = 108;
  count = 0;

  readonly r = 54;
  readonly circumference = 2 * Math.PI * this.r;

  ngOnInit(): void{
    const raw = localStorage.getItem(this.storageKey);
    if(raw){
      try{
        const s = JSON.parse(raw) as State;
        this.target = Math.max(1, Math.floor(s.target));
        this.count = Math.max(0, Math.floor(s.count));
      }catch{}
    }
    this.save();
  }

  get progress(): number{
    if(this.target <= 0) return 0;
    return Math.min(100,(this.count/this.target)* 100);
  }

  get dashOffset(): number{
    return this.circumference * (1 - this.progress / 100);
  }

  setTarget(t:number){
    this.target = Math.max(1,Math.floor(t || 0));
    if(this.count > this.target) this.count = this.target;
    this.save();
  }

  inc(){
    if(this.count < this.target){
      this.count++;
      this.save();
    }
  }

  dec(){
    if(this.count > 0){
      this.count--;
      this.save();
    }
  }

  resetCount(){
    this.count = 0;
    this.save();
  }

  resetAll(){
    this.target = 108;
    this.count = 0;
    this.save();
  }

  private save(){
    const s: State = { target: this.target, count:this.count};
    localStorage.setItem(this.storageKey, JSON.stringify(s));
  }
}


