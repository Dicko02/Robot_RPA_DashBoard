import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { TableDemandeComponent } from './demandes/table-demande/table-demande.component';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-filtre-2',
  standalone: true,
  imports: [MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    TableDemandeComponent,
    MatIcon
  ],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss',
})
export class FiltreComponent {

  startDate: Date = new Date();
  endDate: Date = new Date();

}
