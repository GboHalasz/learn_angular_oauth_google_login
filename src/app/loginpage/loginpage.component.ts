import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleApiService} from '../google-api-service.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  standalone: false
})
export class LoginpageComponent {
  constructor(
    private router: Router,
    private readonly google: GoogleApiService
  ) {
  }

  @ViewChild('signUpSection') signUpSection!: ElementRef;
  @ViewChild('signUpUser') signUpEmail!: ElementRef;

  async ngOnInit() {
    console.log('Starting Application!');
    await this.google.checkLoginStatus();
    const {startVal, validData} = regValidation();
    const {storeInSessionStr} = storeData();
    const {user} = userData();

    if (user.name) {
      await this.router.navigate(['main'])
    }

    startVal("blur", () => {
      storeInSessionStr("user", validData());
      this.router.navigate(['main'])
    });

    document.getElementById("GooBtn")?.addEventListener("click", () => {
      this.google.signIn()
    })
  }

  scrollToSectionAndFocus(): void {
    this.signUpSection.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    setTimeout(() => {
      this.signUpEmail.nativeElement.focus();
    }, 500);
  }
}
