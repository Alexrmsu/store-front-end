import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showFiller = false;

  show() {
    this.showFiller = !this.showFiller;
    console.log(this.showFiller)
  }

}
