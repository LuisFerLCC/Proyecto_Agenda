import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

import { Evento } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class DetallesPage implements OnInit {
  constructor(
    public eventosService: EventosService,
    private location: Location,
    private platform: Platform,
    private route: ActivatedRoute
  ) {}

  botones = [
    { text: 'Cancelar', role: 'cancel', handler() {} },
    {
      text: 'Eliminar',
      role: 'delete',
      handler: () => {
        if (!this.evento) return;

        this.eventosService.eliminarEvento(this.evento.id);
        this.location.back();
      },
    },
  ];

  evento?: Evento;
  puedeCompartir = false;

  async compartir() {
    if (!this.evento) return;

    await Share.share({
      title: this.evento.titulo,
      text: `¡No te pierdas mi evento!

${this.evento.titulo}
${this.evento.descripcion || '-'}

Fecha: ${this.evento.fecha.toISOString().slice(0, 10)}
Dirección: ${this.evento.direccion}`,
      dialogTitle: 'Compartir evento',
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventosService
      .obtenerEvento(parseInt(id ?? '0', 10))
      .then((evento) => {
        this.evento = evento;
      });

    this.puedeCompartir = this.platform.is('mobile');
  }
}
