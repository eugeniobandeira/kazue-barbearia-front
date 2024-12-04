import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FilaService {
  private readonly apiUrl = 'http://localhost:5107/api/fila';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  listarPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  adicionar(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  atualizar(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, '');
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
