import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log('Starting Application!');
    const { startVal, validData } = regValidation();
    const { storeInSessionStr } = storeData();
    const { user, setUserNameFromSessionStorage } = userData();
    
    setUserNameFromSessionStorage()
    if (user.name) {
      this.router.navigate(['main'])
    }

    startVal("blur", () => {
      storeInSessionStr("user", validData());
    });
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
