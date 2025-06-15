import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Tooltip } from 'bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'K230214login';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.disposeTooltips();
      }
    });
  }

  private disposeTooltips(): void {
    const tooltipElements = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipElements.forEach(el => {
      const instance = Tooltip.getInstance(el);
      if (instance) {
        instance.dispose();
      }
    });
  }
}
