import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToastrService } from 'ngx-toastr';
import { VirtualMachineService } from '../../services/vm.service';
import { VirtualMachine, VMStatus } from '../../../../shared/models/virtual-machine.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ]
})
export class DashboardComponent implements OnInit {
  vms: VirtualMachine[] = [];
  loading = true;
  stats = {
    total: 0,
    running: 0,
    stopped: 0,
    suspended: 0
  };

  constructor(
    private vmService: VirtualMachineService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.vmService.getAllVMs().subscribe({
      next: (data: VirtualMachine[]) => {
        this.vms = data;
        this.calculateStats();
        this.loading = false;
      },
      error: (error: any) => {
        this.toastr.error('Erro ao carregar dashboard');
        this.loading = false;
        console.error('Error loading dashboard:', error);
      }
    });
  }

  calculateStats(): void {
    this.stats.total = this.vms.length;
    this.stats.running = this.vms.filter(vm => vm.status === VMStatus.RUNNING).length;
    this.stats.stopped = this.vms.filter(vm => vm.status === VMStatus.STOPPED).length;
    this.stats.suspended = this.vms.filter(vm => vm.status === VMStatus.SUSPENDED).length;
  }

  getStatusColor(status: VMStatus): string {
    const statusColors: Record<VMStatus, string> = {
      [VMStatus.CREATED]: 'primary',
      [VMStatus.RUNNING]: 'success',
      [VMStatus.STOPPED]: 'warning',
      [VMStatus.SUSPENDED]: 'accent'
    };
    return statusColors[status] || 'default';
  }

  getStatusLabel(status: VMStatus): string {
    const statusLabels: Record<VMStatus, string> = {
      [VMStatus.CREATED]: 'Criada',
      [VMStatus.RUNNING]: 'Executando',
      [VMStatus.STOPPED]: 'Parada',
      [VMStatus.SUSPENDED]: 'Suspensa'
    };
    return statusLabels[status] || status;
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('pt-BR');
  }
}
