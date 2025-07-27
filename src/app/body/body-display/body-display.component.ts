import { Component } from '@angular/core';
import { AllRobotTypeComponent } from '../robot-type/all-robot-type/all-robot-type.component';
import { AfficheurComponent } from '../statistiques/afficheur/afficheur.component';
import { TableFiltreDisplayComponent } from '../demande-global/table-filtre-display/table-filtre-display.component';

@Component({
  selector: 'app-body-display',
  standalone: true,
  imports: [TableFiltreDisplayComponent,
    AllRobotTypeComponent,
    AfficheurComponent
  ],
  templateUrl: './body-display.component.html',
  styleUrl: './body-display.component.scss'
})
export class BodyDisplayComponent {}
