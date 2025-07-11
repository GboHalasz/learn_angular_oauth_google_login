import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleApiService} from '../services/google-api-service.service';
import {UserService} from '../services/user.service';
import {Tooltip} from "bootstrap";

@Component({
  selector: 'app-entrance-page',
  templateUrl: './entrance-page.component.html',
  styleUrls: ['./entrance-page.component.css'],
  standalone: false
})
export class EntrancePageComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private readonly google: GoogleApiService,
  private userService: UserService
  ) {
  }

  userName: string | null = null;

  async ngOnInit() {
    const user = this.userService.user;
    if (!user) {
      await this.router.navigate(['/'])
    } else {
      this.userName = user.name;
    }

  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new Tooltip(el));
  }

  logout = async () => {
    this.userService.clearUser()
    this.userName = null;
    const method = sessionStorage.getItem('loginMethod');
    if (method === 'google') {
      await this.google.signOut()

    }
    await this.router.navigate(['/'])
  }

}

