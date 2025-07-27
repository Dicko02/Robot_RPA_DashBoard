import {MatIconModule} from '@angular/material/icon';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-latence',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './latence.component.html',
  styleUrl: './latence.component.scss'
})
export class LatenceComponent {
  @Input() OVTOLatence = 0;
  @Input() OVBLatence = 0;
  @Input() OVALatence = 0;
}
