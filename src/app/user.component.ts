import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="console-container">
      <h2>User Console</h2>
      <div class="content">
        <h3>User Dashboard</h3>
        <p>Welcome to your personal dashboard.</p>
        <div class="user-widgets">
          <div class="widget">
            <h4>My Profile</h4>
            <p>View and edit your profile</p>
          </div>
          <div class="widget">
            <h4>My Activities</h4>
            <p>Recent activities and notifications</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .console-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .content {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .user-widgets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    .widget {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `]
})
export class UserComponent { }