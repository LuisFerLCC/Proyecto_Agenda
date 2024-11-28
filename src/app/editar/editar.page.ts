import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CATEGORIAS } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class EditarPage {
  constructor(private location: Location) {}

  categorias = CATEGORIAS;

  fotoTomada = false;

  guardar() {
    this.location.back();
  }

  cancelar() {
    this.location.back();
  }
}
