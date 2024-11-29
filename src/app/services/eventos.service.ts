import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  private eventos: Evento[] = [];

  async obtenerEventos() {
    const eventosJson = await this.storage.get('eventos');
    const eventos: Evento[] = eventosJson ? JSON.parse(eventosJson) : [];

    this.eventos = eventos;
    return eventos;
  }

  async agregarEvento(evento: Evento) {
    evento.id = new Date().getTime();
    this.eventos.push(evento);
    await this.guardarEventos();
  }

  async buscarEventos(filtro: string) {
    const filtroMin = filtro.toLowerCase();
    const eventos = await this.obtenerEventos();

    return eventos.filter((evento) => {
      const titulo = evento.titulo.toLowerCase();
      const categoria = evento.categoria.toLowerCase();

      return titulo.includes(filtroMin) || categoria.includes(filtroMin);
    });
  }

  async cambiarFavorito(evento: Evento) {
    evento.esFavorito = !evento.esFavorito;
    await this.guardarEventos();
  }

  async obtenerEvento(id: number) {
    const eventos = await this.obtenerEventos();
    return eventos.find((evento) => evento.id === id);
  }

  async eliminarEvento(id: number) {
    this.eventos = this.eventos.filter((evento) => evento.id !== id);
    await this.guardarEventos();
  }

  async guardarEventos() {
    await this.storage.set('eventos', JSON.stringify(this.eventos));
  }
}
