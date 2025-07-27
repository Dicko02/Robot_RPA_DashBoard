import { Component, ViewChild, Injectable, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from  '@angular/material/paginator' ;
import { Interface } from '../interface/interface';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClient } from "@angular/common/http";

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

import {DateAdapter} from '@angular/material/core';

import{
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Injectable()

export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -2);
      const end = this._dateAdapter.addCalendarDays(date, 2);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}


@Component({
  selector: 'app-table-demande',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    DatePipe,
    CommonModule,
  ],
  providers:[MatDatepickerModule,
    {provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    }
  ],
  templateUrl: './table-demande.component.html',
  styleUrl: './table-demande.component.scss'
})
export class  TableDemandeComponent implements OnInit{
  database: Interface [] = [];

  @Input() fromDate = new Date()
  @Input() toDate = new Date()


  displayedColumns = ['id', 'nomClient', 'offre', 'categorie', 'operation', 'dateIntervention', 'status', 'detail'];

  dataSource = new MatTableDataSource(this.database.filter((item: any) => {
    return item.dateIntervention.getDate() >= this.fromDate.getDate() && item.dateIntervention.getDate() <= this.toDate.getDate();
  }));

  filtre = this.database.filter((item: any) => {
    return item.dateIntervention.getDate() >= this.fromDate?.getDate() && item.dateIntervention.getDate() <= this.toDate.getDate();
  })

  verifie(){
    this.dataSource = new MatTableDataSource(this.database.filter((item: any) => {
      return item.dateIntervention.getDate() >= this.fromDate.getDate() && item.dateIntervention.getDate() <= this.toDate.getDate();
    }));
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;}


    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //Recuperation et affichage des donnees stocke dans l'API

  API_URL_Demandes="http://localhost:8080/API-DashBoard/demandes.php";

  constructor(private httpClient: HttpClient){
  }

  getDemandes(){
      return this.httpClient.get(this.API_URL_Demandes);
  }
  
  getListDemandes(){
    this.getDemandes().subscribe((response) => {

      let entries = Object.entries(response)
      const {id, nomClient, offre, categorie, operation, dateIntervention, status} = entries[0][1]
      let data: { id: any; nomClient: any; offre: any; categorie: any; operation: any; dateIntervention: Date; status: any; detail: any; }[] = []
      entries.forEach((entry) => {
        data.push({
          id: entry[1].id,
          nomClient: entry[1].nomClient,
          offre: entry[1].offre,
          categorie: entry[1].categorie,
          operation: entry[1].operation,
          dateIntervention: new Date(entry[1].dateIntervention),
          status: entry[1].status,
          detail: entry[1].detail
        });
      });
      console.log("id: ", id[0])
      this.database = data as Interface[]
      this.dataSource = new MatTableDataSource(this.database)
    });
  }

  ngOnInit():void{
    this.getListDemandes()
    
  }

  table: any = document.querySelector(".container");
  tableau!: any;

  getApp(): any {
    this.tableau = document.createElement('div');
    this.tableau.appendChild(document.createElement(this.tablePdf()));
  };


  tablePdf(): any{
    let tableauValeur = new Array();
    let tableauValeurFinal = `
      <table>
        <tr>
          <th class="ID">ID</th>
          <th>NomClient</th>
          <th>Offre</th>
          <th>Categorie</th>
          <th>Operation</th>
          <th>DateIntervention</th>
          <th>Status</th>
        </tr>`;

    for(let i = 0; i < document.getElementsByClassName("ID").length ; i++){
      tableauValeur[i] = `<tr>
        <td>${document?.getElementsByClassName("ID")[i]?.textContent}</td>
        <td>${document?.getElementsByClassName("NomClient")[i]?.textContent}</td>
        <td>${document?.getElementsByClassName("Offre")[i]?.textContent}</td>
        <td>${document?.getElementsByClassName("Categorie")[i]?.textContent}</td>
        <td>${document?.getElementsByClassName("Operation")[i]?.textContent}</td>
        <td>${document?.getElementsByClassName("DateIntervention")[i]?.textContent}</td>
        <td>${document?.getElementsByClassName("Status")[i]?.textContent}</td>
      </tr>`
    };

    tableauValeurFinal += tableauValeur.join("").toString();

  
    tableauValeurFinal += `</table>`
    document.write(tableauValeurFinal)

    console.log("tableauValeurFinal => ", tableauValeurFinal)

    const doc = new jsPDF("l", "px", "a3");

    doc.html(document.body, {
      callback: function (doc) {
        doc.setFontSize(12);
        doc.save("demandes.pdf");
      },
    });
  }

}