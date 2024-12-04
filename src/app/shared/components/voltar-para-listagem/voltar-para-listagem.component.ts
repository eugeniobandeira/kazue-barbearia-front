import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-voltar-para-listagem',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './voltar-para-listagem.component.html',
  styleUrl: './voltar-para-listagem.component.css'
})
export class VoltarParaListagemComponent {

}
