import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICorte } from '../../shared/interfaces/corte.interfaces';
import { FilaService } from '../../shared/services/fila.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatTableModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    CommonModule,
    MatIconModule, 
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  clientes: ICorte[] = [];
  filterControl = new FormControl();
  dataSource = new MatTableDataSource(this.clientes);
  displayedColumns: string[] = 
  [
    'id',
    'nome', 
    'registradoEm', 
    'servico', 
    'barbeiroPreferido',
    'status',
    'acao'
  ];

  filaService = inject(FilaService);

  ngOnInit(): void {
    this.filaService.listar().subscribe((data) => {
      this.clientes = data;
      this.dataSource.data = this.clientes;
    });
    
  }
  
  onConcluir(): void {}

  onExcluir(): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
