import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICorte } from '../../shared/interfaces/corte.interfaces';
import { ConfirmacaoDialogService } from '../../shared/services/confirmacao-dialog.service';
import { FilaService } from '../../shared/services/fila.service';

@Component({
  selector: 'app-usuario',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  clientes: ICorte[] = [];
  filterControl = new FormControl();
  dataSource = new MatTableDataSource(this.clientes);
  displayedColumns: string[] = [
    'nome',
    'registradoEm',
    'servico',
    'barbeiroPreferido',
    'status'
  ];

  filaService = inject(FilaService);
  confirmacaoService = inject(ConfirmacaoDialogService);
  matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toISOString().split('T')[0];

    this.filaService.listarFilaAtiva(dataFormatada).subscribe((data) => {
      this.clientes = data;
      this.dataSource.data = this.clientes;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
