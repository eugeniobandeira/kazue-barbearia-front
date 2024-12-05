import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    MatAutocompleteModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  standalone: true,
})
export class CadastroComponent implements OnInit {
  myControl = new FormControl('');
  opcaoServico: string[] = [
    'Corte', 
    'Corte Afro (Nudred)', 
    'Corte e Barba',
    'Corte e Luzes',
    'Barba',
    'Pezinho',
    'Sobrancelha',
    'Alisamento',
  ];
  filteredOptions!: Observable<string[]>;
  
  barbeiro!: string;

  form!: FormGroup;

  @Output() done = new EventEmitter<ICorte>();

  router = inject(Router);
  fb = inject(FormBuilder);
  filaService = inject(FilaService);
  snackBar = inject(MatSnackBarModule);
  matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
    const dataBrasil = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');

    this.form = this.fb.group({
      nome: ['', Validators.required],
      servico: ['', Validators.required],
      status: ['Aguardando'],
      registradoEm: [dataBrasil],
      barbeiroPreferido: ['', Validators.required],
      descricaoServico: ['', this.servicoControlValidator()],
    });

    this.myControl.valueChanges.subscribe(value => {
      this.form.patchValue({ servico: value });
    });

    this.form.get('servico')?.valueChanges.subscribe(value => {
      if (value === 'Outros') {
        this.form.get('descricaoServico')?.setValidators(Validators.required);
      } else {
        this.form.get('descricaoServico')?.clearValidators();
      }
      this.form.get('descricaoServico')?.updateValueAndValidity();
    });

    this.form.patchValue({ 
      servico: this.opcaoServico,
      barbeiroPreferido: this.barbeiro, 
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.opcaoServico.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = { ...this.form.value };

      if (payload.servico === 'Outros') {
        payload.servico = payload.descricaoServico;
      }
  
      delete payload.descricaoServico;

      this.filaService.adicionar(payload)
      .subscribe(() => {
          this.matSnackBar.open('Registro salvo com sucesso!', 'Fechar');
          this.router.navigateByUrl('/');
        },
      );
    }
  }

  private servicoControlValidator() {
    return () => {
      return this.form?.get('servico')?.value === 'Outros'
        ? Validators.required
        : null;
    };
  }
}
