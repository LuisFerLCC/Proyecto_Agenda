import { Injectable, signal } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  constructor(private storage: Storage) {
    this.storage.create().then(() => {
      this.obtenerEventos();
    });
  }

  eventos = signal<Evento[]>([]);

  async obtenerEventos() {
    const eventosJson = await this.storage.get('eventos');
    const eventos: Evento[] = eventosJson ? JSON.parse(eventosJson) : [];

    eventos.forEach((evento) => {
      evento.fecha = new Date(evento.fecha);
    });

    this.eventos.set(eventos);
    this.ordenarEventos();

    return this.eventos();
  }

  async obtenerEventosFavoritos() {
    const eventos = await this.obtenerEventos();
    return eventos.filter((evento) => evento.esFavorito);
  }

  async agregarEvento(evento: Evento) {
    evento.id = new Date().getTime();

    this.eventos.update((eventos) => [...eventos, evento]);
    this.ordenarEventos();

    await this.guardarEventos();
  }

  async buscarEventos(filtro: string) {
    if (!filtro) return;

    const filtroMin = filtro.toLowerCase();
    const eventos = await this.obtenerEventos();

    return eventos.filter((evento) => {
      const titulo = evento.titulo.toLowerCase();
      const categoria = evento.categoria?.toLowerCase() ?? '';

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
    this.eventos.update((eventos) =>
      eventos.filter((evento) => evento.id !== id)
    );
    await this.guardarEventos();
  }

  ordenarEventos() {
    this.eventos.update((eventos) =>
      eventos.sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    );
  }

  parseFecha(fecha: string, hora: string) {
    const numeros = [
      ...fecha.split('-').map((n) => parseInt(n, 10)),
      ...hora.split(':').map((n) => parseInt(n, 10)),
    ];
    numeros[1] -= 1;

    return new Date(numeros[0], numeros[1], numeros[2], numeros[3], numeros[4]);
  }

  async guardarEventos() {
    await this.storage.set('eventos', JSON.stringify(this.eventos()));
  }
}
