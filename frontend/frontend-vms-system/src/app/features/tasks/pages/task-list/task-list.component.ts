import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { VirtualMachineService } from '../../../virtual-machines/services/vm.service';
import { Task } from '../../../../shared/models/virtual-machine.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['user', 'timestamp', 'machineName', 'action'];
  loading = true;

  constructor(private vmService: VirtualMachineService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    console.log('🔄 Iniciando carregamento de tarefas...');
    this.loading = true;

    this.vmService.getAllTasks().subscribe({
      next: (data) => {
        console.log('=== DADOS DO BACKEND ===');
        console.log('Total de tarefas:', data.length);
        console.log('Dados completos:', JSON.stringify(data, null, 2));

        if (data.length > 0) {
          const primeira = data[0];
          console.log('Primeira tarefa:');
          console.log('- Usuário:', primeira.username);
          console.log('- Ação:', primeira.action);
          console.log('- VM:', primeira.vmName);
          console.log('- Data (raw):', primeira.createdAt || primeira.timestamp);
          console.log('- Tipo:', typeof (primeira.createdAt || primeira.timestamp));
        }

        this.tasks = data;
        this.loading = false;
        console.log('✅ Tarefas carregadas com sucesso!');
      },
      error: (error) => {
        console.error('❌ ERRO ao carregar tarefas:', error);
        this.loading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('pt-BR');
  }

  getActionIcon(action: string): string {
    const actionIcons: Record<string, string> = {
      'CREATE': 'add',
      'UPDATE': 'edit',
      'DELETE': 'delete',
      'START': 'play_arrow',
      'STOP': 'stop',
      'SUSPEND': 'pause'
    };
    return actionIcons[action] || 'history';
  }
}
