import { Component } from '@angular/core';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  arrowBackOutline,
  camera,
  close,
  cloud,
  cloudDone,
  cloudOffline,
  create,
  heart,
  heartDislike,
  save,
  settings,
  share,
  trash,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      'add-outline': addOutline,
      'arrow-back-outline': arrowBackOutline,
      camera,
      close,
      cloud,
      'cloud-done': cloudDone,
      'cloud-offline': cloudOffline,
      create,
      heart,
      'heart-dislike': heartDislike,
      save,
      settings,
      share,
      trash,
    });
  }
}
