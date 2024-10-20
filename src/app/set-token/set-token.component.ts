import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.css']
})
export class SetTokenComponent {
  token: string = '';

  constructor(private router: Router) {}

  saveToken() {
    if (this.token) {
      console.log(this.token);
      this.router.navigate(['/entity-extraction']);
    } else {
      alert("Molimo unesite token.");
    }
  }
}
