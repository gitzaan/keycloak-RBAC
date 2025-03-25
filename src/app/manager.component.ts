import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="console-container">
      <h2>Manager Console</h2>
      <div class="content">
        <h3>Team Management Dashboard</h3>
        <p>Welcome to the manager's console.</p>
        <div class="manager-tools">
          <div class="tool-box">
            <h4>Team Performance</h4>
            <p>View and manage team metrics</p>
          </div>
          <div class="tool-box">
            <h4>Resource Allocation</h4>
            <p>Manage team resources</p>
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
    .manager-tools {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    .tool-box {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `]
})
export class ManagerComponent { }