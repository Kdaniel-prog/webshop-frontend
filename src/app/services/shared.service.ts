import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public refreshData$: EventEmitter<void> = new EventEmitter<void>();

  triggerRefresh() {
    this.refreshData$.emit();
  }
}