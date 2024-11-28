import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '../modules/ionic/ionic.module';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class DetallesPage {
  constructor() {}
}
