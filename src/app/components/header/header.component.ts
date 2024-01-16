import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule]
})
export class HeaderComponent {
  isFixedNavbar: boolean = false;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  constructor(
    private authService: AuthService
  ) { }

  @HostListener('window:size', [])
  innerWidth = window.innerWidth;
  onWindowScroll() {

    console.log("innerWidth", innerWidth);

    if (innerWidth < 480) {
      this.isFixedNavbar = false;
    } else {
      this.isFixedNavbar = true;
    }
  }

  onSignOut() {
    return this.authService.signOut();
  }

  // toggleNavbar() {
  //   this.navbarOpened = !this.navbarOpened;
  //   console.log("innerWidth", this.innerWidth);
  // }
}
