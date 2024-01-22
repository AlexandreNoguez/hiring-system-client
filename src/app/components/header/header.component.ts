import {CommonModule} from '@angular/common';
import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu'
import {AuthService} from 'src/app/service/auth.service';
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ]
})
export class HeaderComponent implements OnInit {
  isFixedNavbar: boolean = false;
  isCandidate: boolean = false;
  isAdmin: boolean = false;

  async ngOnInit() {
    this.checkRole()
  }

  @HostBinding('class.navbar-opened') navbarOpened = false;
  constructor(
    private authService: AuthService
  ) { }

  @HostListener('window:size', [])
  innerWidth = window.innerWidth;
  onWindowScroll() {

    if (innerWidth < 480) {
      this.isFixedNavbar = false;
    } else {
      this.isFixedNavbar = true;
    }
  }

  checkRole() {
    let readToken = this.authService.decodePayloadJWT()
    const hasRoleCandidate = readToken.ROLES.includes('ROLE_CANDIDATE');
    const hasRoleAdmin = readToken.ROLES.includes('ROLE_ADMIN');

    if (hasRoleCandidate) {
      return this.isCandidate = false;
    } else if (hasRoleAdmin) {
      this.isCandidate = false;
      this.isAdmin = true;
    }
    return this.isCandidate = true;

  }

  onSignOut() {
    return this.authService.signOut();
  }

}
