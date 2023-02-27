import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrance-page',
  templateUrl: './entrance-page.component.html',
  styleUrls: ['./entrance-page.component.css']
})
export class EntrancePageComponent {
  constructor(
    private router: Router
  ) { }

  
  ngOnInit() {
    const { user } = userData();
    const { removeFromStorage } = storeData();
    
    if (!user.name) {
      this.router.navigate(['/'])
    }    
    myWelcome.show("Welcome, ", document.getElementById("welcomePlace"), user.name);
    document.getElementById("outBtn")?.addEventListener("click", () => {
      removeFromStorage("user")
      this.router.navigate(['/'])
    })
  }
  }
  
