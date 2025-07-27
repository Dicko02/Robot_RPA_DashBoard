import { Component, OnInit } from '@angular/core';
import { OneRobotTypeComponent } from '../one-robot-type/one-robot-type.component';
import { RobotsService } from '../sevice/robots-sevice';
import { MatGridListModule } from '@angular/material/grid-list';

const phoneWidth = 599.98;
const tabletteWidth = 959.98;

@Component({
  selector: 'app-all-robot-type',
  standalone: true,
  imports: [OneRobotTypeComponent,
    MatGridListModule
  ],
  providers: [RobotsService],
  templateUrl: './all-robot-type.component.html',
  styleUrl: './all-robot-type.component.scss'
})
export class AllRobotTypeComponent implements OnInit{

  myBreakPoint!: number;

  constructor(private service: RobotsService){};

  models: any;

  ngOnInit(){
    //this.models = this.service.getService();
    
    if(window.innerWidth <= phoneWidth){
      this.myBreakPoint = 1

    }else if(window.innerWidth <= tabletteWidth){
      this.myBreakPoint = 2

    }else{
      this.myBreakPoint = 3
    }

    this.getListCanals(); // exemple de requete à un service
  }

  // canal service

  getListCanals(){
    this.service.getCanals().subscribe((response) => {
      console.log(response);
      this.models = response;
    });
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
