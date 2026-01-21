import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { VirtualMachineService } from '../../services/vm.service';
import { VirtualMachine, VMStatus } from '../../../../shared/models/virtual-machine.model';

@Component({
  selector: 'app-vm-form',
  templateUrl: './vm-form.component.html',
  styleUrls: ['./vm-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule  // ADICIONE ESTA LINHA
  ]
})
export class VmFormComponent implements OnInit {
  vmForm: FormGroup;
  isEditMode = false;
  vmId?: number;
  loading = false;
  submitting = false;

  statusOptions = [
    { value: VMStatus.CREATED, label: 'Criada' },
    { value: VMStatus.RUNNING, label: 'Executando' },
    { value: VMStatus.STOPPED, label: 'Parada' },
    { value: VMStatus.SUSPENDED, label: 'Suspensa' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vmService: VirtualMachineService,
    private toastr: ToastrService
  ) {
    this.vmForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.vmId = +params['id'];
        this.loadVM(this.vmId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      cpu: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(32)
      ]],
      memoria: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(256)
      ]],
      disco: ['', [
        Validators.required,
        Validators.min(10),
        Validators.max(2048)
      ]],
      status: [VMStatus.CREATED, Validators.required]
    });
  }

  loadVM(id: number): void {
    this.loading = true;
    this.vmService.getVMById(id).subscribe({
      next: (vm) => {
        this.vmForm.patchValue(vm);
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar máquina virtual');
        console.error('Error loading VM:', error);
        this.router.navigate(['/vms']);
      }
    });
  }

  onSubmit(): void {
    if (this.vmForm.invalid) {
      this.markFormGroupTouched(this.vmForm);
      this.toastr.warning('Preencha todos os campos corretamente');
      return;
    }

    this.submitting = true;
    const vmData: VirtualMachine = this.vmForm.value;

    if (this.isEditMode && this.vmId) {
      this.vmService.updateVM(this.vmId, vmData).subscribe({
        next: () => {
          this.toastr.success('Máquina virtual atualizada com sucesso!');
          this.router.navigate(['/vms']);
        },
        error: (error) => {
          this.toastr.error('Erro ao atualizar máquina virtual');
          console.error('Error updating VM:', error);
          this.submitting = false;
        }
      });
    } else {
      this.vmService.createVM(vmData).subscribe({
        next: () => {
          this.toastr.success('Máquina virtual criada com sucesso!');
          this.router.navigate(['/vms']);
        },
        error: (error) => {
          this.toastr.error('Erro ao criar máquina virtual');
          console.error('Error creating VM:', error);
          this.submitting = false;
        }
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get nome() { return this.vmForm.get('nome'); }
  get cpu() { return this.vmForm.get('cpu'); }
  get memoria() { return this.vmForm.get('memoria'); }
  get disco() { return this.vmForm.get('disco'); }
  get status() { return this.vmForm.get('status'); }

  get title(): string {
    return this.isEditMode ? 'Editar Máquina Virtual' : 'Nova Máquina Virtual';
  }

  get submitButtonText(): string {
    return this.submitting
      ? (this.isEditMode ? 'Atualizando...' : 'Criando...')
      : (this.isEditMode ? 'Atualizar' : 'Criar');
  }
}
