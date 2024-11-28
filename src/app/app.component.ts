import { Component } from '@angular/core';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  camera,
  close,
  cloud,
  create,
  heart,
  heartDislike,
  save,
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
      camera,
      close,
      cloud,
      create,
      heart,
      'heart-dislike': heartDislike,
      save,
      share,
      trash,
    });
  }
}
