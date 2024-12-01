import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CATEGORIAS, Evento } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

import { CamaraService } from '../services/camara.service';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class CrearPage {
  constructor(
    private eventosService: EventosService,
    private camaraService: CamaraService,
    private location: Location
  ) {}

  categorias = CATEGORIAS;

  evento: Evento = {
    id: 0,
    titulo: '',
    fecha: new Date(),
    direccion: '',
    fotoUrl: '',
    esFavorito: false,
  };
  fecha = '';
  hora = '';

  async tomarFoto() {
    this.evento.fotoUrl = await this.camaraService.tomarFoto();
  }

  async crearEvento() {
    this.evento.fecha = this.eventosService.parseFecha(this.fecha, this.hora);

    this.eventosService.agregarEvento(this.evento);
    this.location.back();
  }

  cancelar() {
    this.location.back();
  }
}
