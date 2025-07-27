import { Component } from '@angular/core';
import { FiltreComponent } from '../filtre/filtre.component';

@Component({
  selector: 'app-table-filtre-display',
  standalone: true,
  imports: [FiltreComponent,
  ],
  templateUrl: './table-filtre-display.component.html',
  styleUrl: './table-filtre-display.component.scss',
})
export class TableFiltreDisplayComponent {

}
