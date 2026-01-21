import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { VirtualMachine, VMAction, Task } from '../../../shared/models/virtual-machine.model';

@Injectable({
  providedIn: 'root'
})
export class VirtualMachineService {
  private endpoint = 'vms';

  constructor(private apiService: ApiService) {}

  getAllVMs(): Observable<VirtualMachine[]> {
    return this.apiService.get<VirtualMachine[]>(this.endpoint);
  }

  getVMById(id: number): Observable<VirtualMachine> {
    return this.apiService.get<VirtualMachine>(`${this.endpoint}/${id}`);
  }

  createVM(vm: VirtualMachine): Observable<VirtualMachine> {
    return this.apiService.post<VirtualMachine>(this.endpoint, vm);
  }

  updateVM(id: number, vm: VirtualMachine): Observable<VirtualMachine> {
    return this.apiService.put<VirtualMachine>(`${this.endpoint}/${id}`, vm);
  }

  deleteVM(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  changeVMStatus(id: number, action: VMAction): Observable<VirtualMachine> {
    return this.apiService.put<VirtualMachine>(`${this.endpoint}/${id}/${action.action}`, {});
  }

  getAllTasks(): Observable<Task[]> {
    return this.apiService.get<Task[]>('tasks');
  }
}
