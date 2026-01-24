import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← PARA ngModel
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips'; // ← PARA chip-list
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field'; // ← PARA mat-form-field
import { MatInputModule } from '@angular/material/input'; // ← PARA input
import { ToastrService } from 'ngx-toastr';
import { VirtualMachineService } from '../../services/vm.service';
import { VirtualMachine, VMStatus } from '../../../../shared/models/virtual-machine.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vm-list',
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ← NOVO
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule, // ← NOVO
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule, // ← NOVO
    MatInputModule // ← NOVO
  ]
})
export class VmListComponent implements OnInit {
  vms: VirtualMachine[] = [];
  filteredVms: VirtualMachine[] = [];
  searchTerm = '';
  displayedColumns: string[] = ['nome', 'specs', 'status', 'dataCriacao', 'actions'];
  loading = true;

  constructor(
    private vmService: VirtualMachineService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVMs();
  }

  loadVMs(): void {
    this.loading = true;
    this.vmService.getAllVMs().subscribe({
      next: (data) => {
        this.vms = data;
        this.filteredVms = [...this.vms];
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar máquinas virtuais');
        this.loading = false;
        console.error('Error loading VMs:', error);
      }
    });
  }

  filterVMs(): void {
    this.filteredVms = this.vms.filter(vm =>
      vm.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getRunningCount(): number {
    return this.vms.filter(vm => vm.status === VMStatus.RUNNING).length;
  }

  getStoppedCount(): number {
    return this.vms.filter(vm => vm.status === VMStatus.STOPPED).length;
  }

  getStatusClass(status: VMStatus): string {
    return status.toLowerCase();
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

  toggleVM(id: number, status: VMStatus): void {
    if (status === VMStatus.RUNNING) {
      this.stopVm(id);
    } else {
      this.startVm(id);
    }
  }

  // ====== MÉTODOS EXISTENTES (mantidos) ======
  startVm(id: number): void {
    this.vmService.changeVMStatus(id, 'start').subscribe({
      next: () => {
        this.toastr.success('Máquina iniciada com sucesso!');
        this.loadVMs();
      },
      error: (error) => {
        this.toastr.error('Erro ao iniciar máquina');
        console.error('Error starting VM:', error);
      }
    });
  }

  stopVm(id: number): void {
    this.vmService.changeVMStatus(id, 'stop').subscribe({
      next: () => {
        this.toastr.success('Máquina parada com sucesso!');
        this.loadVMs();
      },
      error: (error) => {
        this.toastr.error('Erro ao parar máquina');
        console.error('Error stopping VM:', error);
      }
    });
  }

  suspendVm(id: number): void {
    this.vmService.changeVMStatus(id, 'suspend').subscribe({
      next: () => {
        this.toastr.success('Máquina suspensa com sucesso!');
        this.loadVMs();
      },
      error: (error) => {
        this.toastr.error('Erro ao suspender máquina');
        console.error('Error suspending VM:', error);
      }
    });
  }

  deleteVm(id: number): void {
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

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('pt-BR');
  }
}
