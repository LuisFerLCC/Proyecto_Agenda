import { Location } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '../modules/ionic/ionic.module';

import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class FavoritosPage {
  constructor(
    public eventosService: EventosService,
    private location: Location
  ) {}

  atras() {
    this.location.back();
  }

  eventosFavoritos = computed(() =>
    this.eventosService.eventos().filter((evento) => evento.esFavorito)
  );
}
