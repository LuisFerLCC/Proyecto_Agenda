import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConnectionType } from '@capacitor/network';

import { IonicModule } from '../modules/ionic/ionic.module';

import { NubeService } from '../services/nube.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AjustesPage {
  constructor(public nubeService: NubeService) {}

  async cambiarRedPreferida(redPreferida: ConnectionType) {
    this.nubeService.cambiarRedPreferida(redPreferida);
  }
}
