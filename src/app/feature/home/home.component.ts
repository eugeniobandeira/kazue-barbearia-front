import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UsuarioComponent } from '../usuario/usuario.component';
import { NoItemsComponent } from '../../shared/components/no-items/no-items.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatListModule, UsuarioComponent, NoItemsComponent],
})
export class HomeComponent {

}
