import { Injectable } from '@angular/core';
import { Color } from '@ionic/core';
import { ConnectionStatus, ConnectionType, Network } from '@capacitor/network';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NubeService {
  constructor(private toastController: ToastController) {}

  redPreferida: ConnectionType = 'wifi';
  conectado = false;
  iconoNube = 'cloud';

  async init() {
    Network.addListener('networkStatusChange', async (status) => {
      this.notificarConexion(status);
    });
  }

  async notificarConexion(estado: ConnectionStatus) {
    this.conectado =
      estado.connectionType === 'wifi' ||
      (estado.connectionType === 'cellular' &&
        this.redPreferida === 'cellular');

    const mensaje = this.conectado
      ? `Conectado a ${
          estado.connectionType === 'wifi' ? 'Wi-Fi' : 'datos móviles'
        }. Sincronizando...`
      : 'Se ha perdido la conexión a Internet.';
    const color: Color = this.conectado ? 'success' : 'warning';
    this.iconoNube = this.conectado ? 'cloud-done' : 'cloud-offline';

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      color: color,
      animated: true,
      position: 'bottom',
      icon: this.iconoNube,
    });
    await toast.present();
  }
}
