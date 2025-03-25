import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

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
          <div class="tool-box report-box">
            <h4>Monthly Performance Report</h4>
            <p>Access detailed team performance data</p>
            <button 
              [disabled]="!hasReportPermission" 
              (click)="downloadReport()" 
              class="download-btn">
              Download Report
            </button>
            <p *ngIf="!hasReportPermission" class="permission-warning">
              You don't have permission to access this report
            </p>
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
    .report-box {
      border-left: 3px solid #007bff;
    }
    .download-btn {
      padding: 0.5rem 1rem;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 0.5rem;
    }
    .download-btn:hover:not([disabled]) {
      background: #218838;
    }
    .download-btn[disabled] {
      background: #cccccc;
      cursor: not-allowed;
    }
    .permission-warning {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
  `]
})
export class ManagerComponent implements OnInit {
  private keycloak = inject(KeycloakService);
  private http = inject(HttpClient);
  
  hasReportPermission = false;
  
  async ngOnInit() {
    await this.checkReportPermission();
  }
  
  async checkReportPermission() {
    if (await this.keycloak.isLoggedIn()) {
      const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed as any;
      this.hasReportPermission = tokenParsed.canDownloadReports === true;
      console.log('Has report permission:', this.hasReportPermission);
    }
  }
  
  downloadReport() {
    if (!this.hasReportPermission) {
      console.error('Access denied: Attempted to download report without permission');
      return;
    }
    
    
    this.http.get('/assets/reports/performance-report.pdf', { responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          saveAs(blob, 'performance-report.pdf');
        },
        error: (error) => {
          console.error('Error downloading report:', error);
          alert('Failed to download the report. Please try again later.');
        }
      });
  }
}