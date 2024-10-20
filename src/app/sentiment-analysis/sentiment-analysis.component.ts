import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {
  inputText: string = '';
  selectedLang: string = 'auto';
  analysisResult: any = null;
  sentimentColor: string = '';

  constructor(private http: HttpClient, private HistoryService: HistoryService) { }

  submit() {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      alert('Token nije postavljen! Molimo unesite API token.');
      return;
    }

    const apiUrl = 'https://api.dandelion.eu/datatxt/sent/v1/';

    let params = new HttpParams()
      .set('text', this.inputText)
      .set('token', token)
      .set('lang', this.selectedLang);

    this.http.get(apiUrl, { params }).subscribe(
      (response: any) => {

        let historyEntry = `[${new Date().toLocaleString()}] GET ${apiUrl}?text=${this.inputText}&token=${token}`;
        this.HistoryService.addHistory(historyEntry);

        if (response.error) {
          alert(response.error.message);
          return;
        }
        this.analysisResult = {
          sentiment: response.sentiment,
          score: response.score
        };

        this.sentimentColor = this.getSentimentColor(this.analysisResult.sentiment.score);
        console.log(this.sentimentColor);
      },
      (error) => {
        alert('Došlo je do greške: ' + error.error.message);
      }
    );
  }

  getSentimentColor(sentiment: number) {
    console.log('Sentiment Score:', sentiment);

    const red = [255, 0, 0];
    const green = [0, 255, 0];
    const orange = [255, 165, 0];

    const clampedScore = Math.max(-1, Math.min(1, sentiment));
    
    let color: number[];

    if (clampedScore < 0) {
        const interpolationFactor = (clampedScore + 1) / 1;
        color = red.map((c, i) => Math.round(c + (orange[i] - c) * interpolationFactor));
    } else {
        const interpolationFactor = clampedScore / 1;
        color = orange.map((c, i) => Math.round(c + (green[i] - c) * interpolationFactor));
    }

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

}
