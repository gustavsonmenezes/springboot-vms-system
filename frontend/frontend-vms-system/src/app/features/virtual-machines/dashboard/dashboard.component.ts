import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { VirtualMachineService } from '../../services/vm.service';
import { VMStatus } from '../../../../shared/models/virtual-machine.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;
  totalVms = 0;
  maxVms = 5;
  availableVms = 5;

  // Gráfico de Barras - Status das VMs
  public barChartData: ChartData<'bar'> = {
    labels: ['Running', 'Stopped', 'Suspended', 'Created'],
    datasets: [{
      label: 'Quantidade de VMs',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(76, 175, 80, 0.7)',
        'rgba(244, 67, 54, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(33, 150, 243, 0.7)'
      ],
      borderColor: [
        'rgb(76, 175, 80)',
        'rgb(244, 67, 54)',
        'rgb(255, 193, 7)',
        'rgb(33, 150, 243)'
      ],
      borderWidth: 2
    }]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Status das Máquinas Virtuais'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  // Gráfico de Pizza - Capacidade
  public pieChartData: ChartData<'pie'> = {
    labels: ['VMs em Uso', 'Slots Disponíveis'],
    datasets: [{
      data: [0, 5],
      backgroundColor: [
        'rgba(33, 150, 243, 0.7)',
        'rgba(224, 224, 224, 0.7)'
      ],
      borderColor: [
        'rgb(33, 150, 243)',
        'rgb(158, 158, 158)'
      ],
      borderWidth: 2
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Capacidade do Sistema (Máx: 5 VMs)'
      }
    }
  };

  constructor(private vmService: VirtualMachineService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loading = true;
    this.vmService.getAllVMs().subscribe({
      next: (vms) => {
        this.totalVms = vms.length;
        this.availableVms = this.maxVms - this.totalVms;

        const runningCount = vms.filter(vm => vm.status === VMStatus.RUNNING).length;
        const stoppedCount = vms.filter(vm => vm.status === VMStatus.STOPPED).length;
        const suspendedCount = vms.filter(vm => vm.status === VMStatus.SUSPENDED).length;
        const createdCount = vms.filter(vm => vm.status === VMStatus.CREATED).length;

        this.barChartData.datasets[0].data = [runningCount, stoppedCount, suspendedCount, createdCount];
        this.pieChartData.datasets[0].data = [this.totalVms, this.availableVms];

        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.loading = false;
      }
    });
  }
}
