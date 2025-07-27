import { Component, OnInit } from '@angular/core'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatGridListModule } from '@angular/material/grid-list'
import { LatenceComponent } from './latence/latence.component'
import { RepartitionComponent } from './repartition/repartition.component'
import { TauxEfficaciteComponent } from './taux-efficacite/taux-efficacite.component'
import {ServiceStat} from '../service-stat/service-stat.service'
import { ModelStat } from './model/model-stat'
import { FormsModule } from '@angular/forms'
import { MatIcon } from '@angular/material/icon'

const phoneWidth = 500;
const tabletteWidth = 1024;

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [MatDatepickerModule,
    MatFormFieldModule,
    LatenceComponent,
    RepartitionComponent,
    TauxEfficaciteComponent,
    FormsModule,
    MatGridListModule,
    MatIcon
  ],
  providers: [
    ServiceStat
  ],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent implements OnInit{
  constructor(private service: ServiceStat){}

  startDate = new Date();

  date!: Date
  labels!: string[]
  polarData!: number[]
  barData!: any[]
  OVTO!: number
  OVB!: number
  OVA!: number

  modelStat!: ModelStat[]

  active(){
    let date
    for(let i=0; i< this.service.getLength(); i++){
      date = this.service.getServiceStatDate(i)
      if(this.startDate.getDate() == date.getDate()){
        this.labels = this.service.getServiceStatLabels(i)
        this.polarData = this.service.getServiceStatPolarData(i)
        this.barData = this.service.getServiceStatBarData(i)
        this.OVTO = this.service.getServiceStatOVTO(i)
        this.OVB = this.service.getServiceStatOVB(i)
        this.OVA = this.service.getServiceStatOVA(i)
      }
    }
    this.service.alert()
  }

  getGetListStatistiques(): any{
    this.modelStat = this.service.getListStatistiques()
  }

  myBreakPoint!: number;

  ngOnInit(){
    this.getGetListStatistiques()

    if(window.innerWidth <= phoneWidth){
      this.myBreakPoint = 1

    }else if(window.innerWidth <= tabletteWidth){
      this.myBreakPoint = 2

    }else{
      this.myBreakPoint = 3
    }

  }

  handleSize(e: any) {

    if(window.innerWidth <= phoneWidth){
      this.myBreakPoint = 1

    }else if(window.innerWidth <= tabletteWidth){
      this.myBreakPoint = 2

    }else{
      this.myBreakPoint = 3

    }  

  }
}
