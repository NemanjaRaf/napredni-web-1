import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '../history.service';


@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent {
  inputText: string = '';
  clean: boolean = false;
  detectionResult: any[] = [];

  constructor(private http: HttpClient, private HistoryService: HistoryService) { }

  submit() {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      alert('Token nije postavljen! Molimo unesite API token.');
      return;
    }

    const apiUrl = 'https://api.dandelion.eu/datatxt/li/v1/';

    let params = new HttpParams()
      .set('text', this.inputText)
      .set('token', token);

    if (this.clean) {
      params = params.set('clean', 'true');
    }

    this.http.get(apiUrl, { params }).subscribe((response: any) => {
      this.detectionResult = response.detectedLangs;

      let historyEntry = `[${new Date().toLocaleString()}] GET ${apiUrl}?text=${this.inputText}&token=${token}`;
      this.HistoryService.addHistory(historyEntry);
    }, (error) => {
      alert('Greška pri izvršavanju zahteva: ' + error.error.message);
    });
  }
}
