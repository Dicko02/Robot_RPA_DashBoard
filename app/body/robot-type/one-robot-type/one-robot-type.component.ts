import { Component, Input } from '@angular/core';
import { Model } from '../model/model';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-one-robot-type',
  standalone: true,
  imports: [
    DatePipe,
    MatIconModule
  ],
  providers: [],
  templateUrl: './one-robot-type.component.html',
  styleUrl: './one-robot-type.component.scss'
})
export class OneRobotTypeComponent{

  @Input() robot!: Model;

}
