import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent {
  text1: string = '';
  text2: string = '';
  similarityScore: number | null = null;

  constructor(private http: HttpClient, private HistoryService: HistoryService) { }

  submit() {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      alert('Token nije postavljen! Molimo unesite API token.');
      return;
    }

    const apiUrl = 'https://api.dandelion.eu/datatxt/sim/v1/';

    const params = new HttpParams()
      .set('text1', this.text1)
      .set('text2', this.text2)
      .set('token', token);

    this.http.get(apiUrl, { params }).subscribe((response: any) => {
      this.similarityScore = response.similarity;

      let historyEntry = `[${new Date().toLocaleString()}] GET ${apiUrl}?text1=${this.text1}&text2=${this.text2}&token=${token}`;
      this.HistoryService.addHistory(historyEntry);
    }, (error) => {
      alert('Greška pri izvršavanju zahteva: ' + error.error.message);
    });
  }
}
