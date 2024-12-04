import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICorte } from '../../shared/interfaces/corte.interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VoltarParaListagemComponent } from '../../shared/components/voltar-para-listagem/voltar-para-listagem.component';
import { Router } from '@angular/router';
import { FilaService } from '../../shared/services/fila.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    VoltarParaListagemComponent,
    MatSelectModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  standalone: true,
})
export class CadastroComponent {
  servicoOpt: string = '';
  barbeiro: string = '';

  form!: FormGroup;

  @Output() done = new EventEmitter<ICorte>();

  router = inject(Router);
  fb = inject(FormBuilder);
  filaService = inject(FilaService);
  snackBar = inject(MatSnackBarModule);
  matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const dataBrasil = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');

    this.form = this.fb.group({
      nome: ['', Validators.required],
      servico: ['', Validators.required],
      status: ['Aguardando'],
      registradoEm: [dataBrasil],
      barbeiroPreferido: [''],
    });

    this.form.patchValue({ 
      servico: this.servicoOpt,
      barbeiroPreferido: this.barbeiro, 
    });
  }

  onSubmit() {
    const payload = this.form.value;

    this.filaService.adicionar(payload)
    .subscribe(() => {
        this.matSnackBar.open('Registro salvo com sucesso!', 'Fechar');
        this.router.navigateByUrl('/');
      },
    );
  }
}
