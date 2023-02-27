import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService } from '../google-api-service.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  constructor(
    private router: Router,
    private readonly google: GoogleApiService
  ) { }

  async ngOnInit() {
    console.log('Starting Application!');
    await this.google.checkLoginStatus();
    const { startVal, validData } = regValidation();
    const { storeInSessionStr } = storeData();
    const { user } = userData();

    if (user.name) {
      console.log("user ellenőrzés")
      this.router.navigate(['main'])
    }

    startVal("blur", () => {
      storeInSessionStr("user", validData());
      this.router.navigate(['main'])
    });

    document.getElementById("GooBtn")?.addEventListener("click", () => {
      this.google.signIn()
    })
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
