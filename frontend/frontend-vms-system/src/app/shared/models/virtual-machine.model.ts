export interface VirtualMachine {
  id?: number;
  nome: string;
  cpu: number;
  memoria: number;
  disco: number;
  status: VMStatus;
  dataCriacao?: Date;
}

export enum VMStatus {
  CREATED = 'CREATED',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  SUSPENDED = 'SUSPENDED'
}

export interface Task {
  id?: number;
  user?: string;
  username?: string;
  timestamp?: Date;
  createdAt?: string;
  machineName?: string;
  vmName?: string;         
  action: string;
  vmId?: number;
}
