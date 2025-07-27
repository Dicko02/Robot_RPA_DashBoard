import {MatIconModule} from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { NgChartjsModule } from 'ng-chartjs';

@Component({
  selector: 'app-taux-efficacite',
  standalone: true,
  imports: [NgChartjsModule,
    MatIconModule
  ],
  templateUrl: './taux-efficacite.component.html',
  styleUrl: './taux-efficacite.component.scss'
})
export class TauxEfficaciteComponent {
  @Input() barLabels = ['R1', 'R2', 'R3', 'R4', 'R5'];
  @Input() barData = [
    { data: [3, 9, 4, 6, 8], label: 'Succes' },
    { data: [0, -1, 0, -1, -1], label: 'Echec' }
];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = this.barLabels;
  public barChartType: Chart.ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = this.barData;

  test(){
    this.barChartLabels = this.barLabels;
    this.barChartData = this.barData;
  }

  // events
  public chartHovered(e: any): void {}

}
