export interface VirtualMachine {
  id?: number;
  name: string;
  cpu: number;
  memory: number;
  disk: number;
  status: VMStatus;
  createdAt?: Date;
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
