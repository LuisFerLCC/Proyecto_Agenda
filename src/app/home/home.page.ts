import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Evento } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

import { EventosService } from '../services/eventos.service';
import { NubeService } from '../services/nube.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class HomePage {
  constructor(
    public eventosService: EventosService,
    public nubeService: NubeService
  ) {}

  eventosFiltrados = signal<Evento[] | undefined>(undefined);
  eventosMostrados = computed(
    () => this.eventosFiltrados() ?? this.eventosService.eventos()
  );
  botonNubeDesactivado = false;

  async buscarEventos(filtro?: string | null) {
    const eventos = await this.eventosService.buscarEventos(filtro ?? '');
    this.eventosFiltrados.set(eventos);
  }

  async initNube() {
    this.botonNubeDesactivado = true;
    await this.nubeService.init();
  }

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
