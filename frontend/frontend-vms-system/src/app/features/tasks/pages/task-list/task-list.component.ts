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
    this.loading = true;

    this.vmService.getAllTasks().subscribe({
      next: (data) => {
        console.log('✅ Tarefas carregadas:', data);
        this.tasks = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erro ao carregar tarefas:', error);
        this.loading = false;
      }
    });
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
    return actionIcons[action?.toUpperCase()] || 'history';
  }
}
