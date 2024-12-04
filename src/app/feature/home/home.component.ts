import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ICorte } from '../../shared/interfaces/corte.interfaces';
import { FilaService } from '../../shared/services/fila.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class HomeComponent {
  clientes: ICorte[] = [];
  filterControl = new FormControl();
  dataSource = new MatTableDataSource(this.clientes);
  displayedColumns: string[] = 
  [
    'nome', 
    'registradoEm', 
    'servico', 
    'barbeiroPreferido',
    'status'
  ];

  filaService = inject(FilaService);

  ngOnInit(): void {
    this.filaService.listar().subscribe((data) => {
      this.clientes = data;
      this.dataSource.data = this.clientes;
    });
    
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
