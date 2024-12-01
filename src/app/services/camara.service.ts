import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  constructor(private platform: Platform) {}

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: this.platform.is('mobile')
        ? CameraSource.Prompt
        : CameraSource.Photos,
    });
    console.log(foto);

    return `data:image/jpeg;base64,${foto.base64String}`;
  }
}
