import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '../modules/ionic/ionic.module';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class DetallesPage {
  botones = [
    { text: 'Cancelar', role: 'cancel', handler() {} },
    {
      text: 'Eliminar',
      role: 'delete',
      handler() {
        console.log('Eliminar');
      },
    },
  ];
}
