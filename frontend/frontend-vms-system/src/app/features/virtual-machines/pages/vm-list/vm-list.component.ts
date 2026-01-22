import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { VirtualMachineService } from '../../services/vm.service';
import { VirtualMachine, VMStatus } from '../../../../shared/models/virtual-machine.model';

@Component({
  selector: 'app-vm-list',
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class VmListComponent implements OnInit {
  vms: VirtualMachine[] = [];
  displayedColumns: string[] = [
    'nome', 'cpu', 'memoria', 'disco', 'status', 'dataCriacao', 'actions'
  ];
  loading = true;

  constructor(
    private vmService: VirtualMachineService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadVMs();
  }

  loadVMs(): void {
    this.loading = true;
    this.vmService.getAllVMs().subscribe({
      next: (data) => {
        this.vms = data;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar máquinas virtuais');
        this.loading = false;
        console.error('Error loading VMs:', error);
      }
    });
  }

  deleteVM(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta máquina virtual?')) {
      this.vmService.deleteVM(id).subscribe({
        next: () => {
          this.toastr.success('Máquina virtual excluída com sucesso!');
          this.loadVMs();
        },
        error: (error) => {
          this.toastr.error('Erro ao excluir máquina virtual');
          console.error('Error deleting VM:', error);
        }
      });
    }
  }

  changeStatus(vmId: number, action: 'start' | 'stop' | 'suspend'): void {
    this.vmService.changeVMStatus(vmId, action).subscribe({
      next: () => {
        this.toastr.success(`Máquina ${action === 'start' ? 'iniciada' : action === 'stop' ? 'parada' : 'suspensa'} com sucesso!`);
        this.loadVMs();
      },
      error: (error) => {
        this.toastr.error(`Erro ao ${action} máquina`);
        console.error(`Error ${action} VM:`, error);
      }
    });
  }

  getStatusColor(status: VMStatus): string {
    const statusColors: Record<VMStatus, string> = {
      [VMStatus.CREATED]: 'primary',
      [VMStatus.RUNNING]: 'success',
      [VMStatus.STOPPED]: 'warning',
      [VMStatus.SUSPENDED]: 'default'
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
