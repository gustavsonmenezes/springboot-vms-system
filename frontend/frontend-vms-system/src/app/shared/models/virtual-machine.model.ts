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

export interface VMAction {
  action: 'start' | 'stop' | 'suspend';
}

export interface Task {
  id?: number;
  user: string;
  timestamp: Date;
  machineName: string;
  action: string;
}
