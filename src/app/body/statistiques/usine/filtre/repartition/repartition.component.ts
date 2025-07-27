import {MatIconModule} from '@angular/material/icon';
import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { NgChartjsModule } from 'ng-chartjs';

@Component({
  selector: 'app-repartition',
  standalone: true,
  imports: [MatIconModule,
    NgChartjsModule
  ],
  templateUrl: './repartition.component.html',
  styleUrl: './repartition.component.scss'
})
export class RepartitionComponent implements OnInit {
  @Input() polarLabels = ['R1', 'R2', 'R3', 'R4', 'R5']
  @Input() polarData = [15, 30, 10, 5, 25]

  // PolarArea
  public polarAreaChartLabels: string[] = this.polarLabels;
  public polarAreaChartData: number[] = this.polarData;
  public polarAreaLegend = true;

  public polarAreaChartType: Chart.ChartType = 'polarArea';

  test(){
    this.polarAreaChartLabels = this.polarLabels;
    this.polarAreaChartData = this.polarData;
    alert(this.polarAreaChartLabels)
    alert(this.polarAreaChartData)
  }

  // events
  public chartHovered(e: any): void {}

  ngOnInit() {}

}