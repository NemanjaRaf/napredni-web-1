import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyData: string[] = [];

  constructor() { }

  addHistory(entry: string) {
    this.historyData.push(entry);
  }

  getHistory(): string[] {
    return this.historyData;
  }

  clearHistory() {
    this.historyData = [];
  }
}