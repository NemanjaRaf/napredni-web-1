import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  historyData: string[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.historyData = this.historyService.getHistory();
  }

  clearHistory() {
    this.historyService.clearHistory();
    this.historyData = [];
  }
}
