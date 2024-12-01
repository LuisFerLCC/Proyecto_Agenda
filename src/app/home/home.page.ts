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
}
