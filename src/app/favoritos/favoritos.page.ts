import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Evento } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class FavoritosPage {
  eventos: Evento[] = [
    {
      id: 2,
      titulo: 'Concierto de jazz',
      descripcion: 'Concierto de jazz en el teatro de la ciudad',
      categoria: 'Concierto',
      fecha: new Date(2024, 11, 5, 13, 30),
      direccion: 'Calle 456',
      fotoUrl: 'https://picsum.photos/57',
      esFavorito: true,
    },
  ];

  formatearFecha(fecha: Date): string {
    const fechaActual = new Date();

    const esEsteAnio = fecha.getFullYear() === fechaActual.getFullYear();
    const esEsteMes = esEsteAnio && fecha.getMonth() === fechaActual.getMonth();
    const esEstaSemana =
      esEsteMes &&
      fecha.getDate() >= fechaActual.getDate() &&
      fecha.getDate() < fechaActual.getDate() + 7;
    const esHoy = esEsteMes && fecha.getDate() === fechaActual.getDate();

    return fecha.toLocaleString('es-MX', {
      weekday: esHoy ? undefined : 'long',
      day: esEstaSemana ? undefined : 'numeric',
      month: esEsteMes ? undefined : 'long',
      year: esEsteAnio ? undefined : 'numeric',

      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
