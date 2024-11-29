import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '../modules/ionic/ionic.module';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AjustesPage {}
