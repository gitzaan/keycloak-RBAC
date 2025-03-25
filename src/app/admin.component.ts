import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="console-container">
      <h2>Admin Console</h2>
      <div class="content">
        <h3>Welcome to Admin Dashboard</h3>
        <p>This is the admin console with privileged access.</p>
        <div class="admin-stats">
          <div class="stat-box">
            <h4>Total Users</h4>
            <p>1,234</p>
          </div>
          <div class="stat-box">
            <h4>Active Sessions</h4>
            <p>56</p>
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
    .admin-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    .stat-box {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `]
})
export class AdminComponent { }