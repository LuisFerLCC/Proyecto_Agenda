import { Injectable, signal } from '@angular/core';

import { ConnectionStatus, ConnectionType, Network } from '@capacitor/network';
import { Color } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class NubeService {
  constructor(
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.storage.create().then(() => {
      this.init();
    });
  }

  redPreferida: ConnectionType = 'wifi';
  conectado = false;
  iconoNube = signal('cloud');

  async init() {
    if (!(await this.storage.get('redPreferida')))
      await this.storage.set('redPreferida', 'wifi');

    this.redPreferida = await this.storage.get('redPreferida');
  }

  async activar() {
    const status = await Network.getStatus();
    this.notificarConexion(status);

    Network.addListener('networkStatusChange', async (status) => {
      this.notificarConexion(status);
    });
  }

  async cambiarRedPreferida(redPreferida: ConnectionType) {
    this.redPreferida = redPreferida;
    await this.storage.set('redPreferida', redPreferida);
  }

  async notificarConexion(status: ConnectionStatus) {
    this.conectado =
      status.connected &&
      (status.connectionType === 'wifi' ||
        (status.connectionType === 'cellular' &&
          this.redPreferida === 'cellular'));

    const mensaje = this.conectado
      ? `Conectado a ${
          status.connectionType === 'wifi' ? 'Wi-Fi' : 'datos móviles'
        }. Sincronizando...`
      : 'Se ha perdido la conexión a Internet.';
    const color: Color = this.conectado ? 'success' : 'warning';
    this.iconoNube.set(this.conectado ? 'cloud-done' : 'cloud-offline');

    const toast = this.toastController.create({
      message: mensaje,
      duration: 5000,
      color: color,
      animated: true,
      position: 'bottom',
      icon: this.iconoNube(),
    });
    console.log(toast);
    await (await toast).present();
  }
}
