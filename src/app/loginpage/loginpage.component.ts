import { Component } from '@angular/core';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  ngOnInit() {
    console.log('Starting Application!');
    const { startVal, validData } = regValidation();
    const { storeInSessionStr } = storeData();
    const { user, setUserNameFromSessionStorage } = userData();

    setUserNameFromSessionStorage()
    myWelcome.show("Welcome, ", document.getElementById("welcomePlace"), user.name);

    startVal("blur", () => {
      storeInSessionStr("user", validData());
      setUserNameFromSessionStorage();
      myWelcome.show("Welcome, ", document.getElementById("welcomePlace"), user.name);
    });
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
