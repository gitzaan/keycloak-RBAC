import { Component, OnInit, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  isLoggedIn = false;
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  department = '';
  roles: string[] = [];
  isRootPath = true;

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.authenticated ?? false;
    if (this.isLoggedIn) {
      try {
        const tokenParsed = this.keycloak.tokenParsed;
        if (tokenParsed) {
          this.username = tokenParsed['preferred_username'] || tokenParsed['username'] || '';
          this.firstName = tokenParsed['firstName'] || '';
          this.lastName = tokenParsed['lastName'] || '';
          this.email = tokenParsed['email'] || '';
          this.department = (tokenParsed['attributes']?.['Department'] as string[] | undefined)?.[0] || '';

          // Collect roles from both realm_access and resource_access
          const realmRoles = (tokenParsed.realm_access?.roles || []).map(role => role.toLowerCase());
          const resourceRoles = (tokenParsed.resource_access?.['my-app']?.roles || []).map(role => role.toLowerCase());
          this.roles = [...realmRoles, ...resourceRoles];
          console.log('User roles:', this.roles);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    this.router.events.subscribe(() => {
      this.isRootPath = this.router.url === '/';
    });
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  navigateTo(role: string) {
    const lowerCaseRole = role.toLowerCase();
    if (this.roles.includes(lowerCaseRole)) {
      this.router.navigate([`/${lowerCaseRole}`]);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }
}