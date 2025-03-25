import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="isRootPath; else otherContent">
      <div class="container">
        <h1>Keycloak Authentication Demo</h1>
        
        <div *ngIf="isLoggedIn; else loginTemplate">
          <div class="auth-section">
            <div class="text">
              <p>Welcome {{ firstName + " " + lastName }}!</p>
              <p>Your username is {{ username }}</p>
              <p>Your email is {{ email }}</p>
              <p>Your department is {{ department }}</p>
            </div>
            <button (click)="logout()">Logout</button>
            <div class="role-buttons">
              <button (click)="navigateTo('manager')">Manager Console</button>
              <button (click)="navigateTo('admin')">Admin Console</button>
              <button (click)="navigateTo('user')">User Console</button>
            </div>
          </div>
        </div>
        <ng-template #loginTemplate>
          <div class="auth-section">
            <button (click)="login()">Login with Keycloak</button>
          </div>
        </ng-template>
      </div>
    </div>
    <ng-template #otherContent>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .text {
      color: rgb(0, 0, 0);
      font-size: 20px;
      text-align: left;
    }
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .auth-section {
      margin-top: 2rem;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
    .role-buttons {
      margin-top: 1rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease;
      margin: 0.5rem;

      &:hover {
        background: #0056b3;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  private keycloak = inject(KeycloakService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  isLoggedIn = false;
  username = '';
  firstName = '';
  lastName = "";
  email= "";
  department = '';
  roles: string[] = [];
  isRootPath = true;

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    
    if (this.isLoggedIn) {
      var userProfile :any = await this.keycloak.loadUserProfile();
      console.log(userProfile);
      this.username = userProfile.username || '';
      this.firstName = userProfile.firstName || '';
      this.lastName = userProfile.lastName || '';
      this.email = userProfile.email || '';
      this.department = userProfile.attributes?.['Department']?.[0] || '';
      this.roles = this.keycloak.getUserRoles();
      console.log(this.roles); 
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
    console.log('Navigating to:', role); 
    const lowerCaseRole = role.toLowerCase();
    if (this.roles.map(r => r.toLowerCase()).includes(lowerCaseRole)) {
      console.log('Role found:', role); 
      this.router.navigate([`/${lowerCaseRole}`]);
    } else {
      console.log('Role not found, redirecting to unauthorized'); 
      this.router.navigate(['/unauthorized']);
    }
  }
}