import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CATEGORIAS, Evento } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

import { EventosService } from '../services/eventos.service';
import { CamaraService } from '../services/camara.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class EditarPage implements OnInit {
  constructor(
    private eventosService: EventosService,
    private camaraService: CamaraService,
    private location: Location,
    private route: ActivatedRoute
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

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventosService
      .obtenerEvento(parseInt(id ?? '0', 10))
      .then((evento) => {
        if (!evento) return;

        this.evento = { ...evento };
        this.fecha = evento.fecha.toISOString().slice(0, 10);
        this.hora = evento.fecha.toISOString().slice(11, 16);
      });
  }

  async tomarFoto() {
    this.evento.fotoUrl = await this.camaraService.tomarFoto();
  }

  guardarEvento() {
    this.evento.fecha = this.eventosService.parseFecha(this.fecha, this.hora);

    this.eventosService.actualizarEvento(this.evento);
    this.location.back();
  }

  cancelar() {
    this.location.back();
  }
}
