import { Component } from '@angular/core';
import { FiltreComponent } from '../usine/filtre/filtre.component';

@Component({
  selector: 'app-afficheur',
  standalone: true,
  imports: [
    FiltreComponent
  ],
  templateUrl: './afficheur.component.html',
  styleUrl: './afficheur.component.scss'
})
export class AfficheurComponent {

}
