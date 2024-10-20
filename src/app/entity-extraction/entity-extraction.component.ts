import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent {
  inputText: string = '';
  minConfidence: number = 0.5;
  includeImages: boolean = false;
  includeAbstracts: boolean = false;
  includeCategories: boolean = false;
  entities: any[] = [];

  constructor(private http: HttpClient, private HistoryService: HistoryService) { }

  submit() {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      alert('Token nije postavljen! Molimo unesite API token.');
      return;
    }

    const apiUrl = 'https://api.dandelion.eu/datatxt/nex/v1/';

    let params = new HttpParams()
      .set('text', this.inputText)
      .set('min_confidence', this.minConfidence.toString())
      .set('token', token);

    const includeOptions = [];
    if (this.includeImages) includeOptions.push('image');
    if (this.includeAbstracts) includeOptions.push('abstract');
    if (this.includeCategories) includeOptions.push('categories');

    if (includeOptions.length > 0) {
      params = params.set('include', includeOptions.join(','));
    }

    this.http.get(apiUrl, { params }).subscribe((response: any) => {
      this.entities = response.annotations;

      let historyEntry = `[${new Date().toLocaleString()}] GET ${apiUrl}?text=${this.inputText}&token=${token}`;
      this.HistoryService.addHistory(historyEntry);
    }, (error) => {
      alert('Greška pri izvršavanju zahteva: ' + error.error.message);
    });
  }
}
