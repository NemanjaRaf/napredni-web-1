import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyKey: string = 'historyData';

  constructor() {
    const savedHistory = localStorage.getItem(this.historyKey);
    if (savedHistory) {
      this.historyData = JSON.parse(savedHistory);
    } else {
      this.historyData = [];
    }
  }

  private historyData: string[] = [];

  addHistory(entry: string) {
    this.historyData.push(entry);
    this.saveHistory();
  }

  getHistory(): string[] {
    return this.historyData;
  }

  clearHistory() {
    this.historyData = [];
    localStorage.removeItem(this.historyKey);
  }

  private saveHistory() {
    localStorage.setItem(this.historyKey, JSON.stringify(this.historyData));
  }
}
