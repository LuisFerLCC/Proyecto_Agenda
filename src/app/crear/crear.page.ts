import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CATEGORIAS } from '../models/evento.model';

import { IonicModule } from '../modules/ionic/ionic.module';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class CrearPage {
  constructor(private location: Location) {}

  categorias = CATEGORIAS;

  fotoTomada = false;

  cancelar() {
    this.location.back();
  }
}
