import {Component, ElementRef, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleApiService} from '../services/google-api-service.service';
import {UserService} from '../services/user.service';
import {Tooltip} from "bootstrap";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  standalone: false
})

export class LoginpageComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private readonly google: GoogleApiService,
    private userService: UserService
  ) {
  }

  @ViewChild('signUpSection') signUpSection!: ElementRef;
  @ViewChild('signUpUser') signUpEmail!: ElementRef;

  async ngOnInit() {
    console.log('Starting Application!');
    await this.google.checkLoginStatus();

    if (this.userService.isLoggedIn()) {
      await this.router.navigate(['main'])
      return;
    }

    const {startVal, validData} = regValidation();

    startVal("blur", () => {
      this.userService.user = {name: JSON.parse(validData()).name};
      this.router.navigate(['main'])
    });
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new Tooltip(el));
  }

  googleLogin = () => {
    this.google.signIn()
  }

  scrollToSectionAndFocus(): void {
    this.signUpSection.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    setTimeout(() => {
      this.signUpEmail.nativeElement.focus();
    }, 500);
  }
}
