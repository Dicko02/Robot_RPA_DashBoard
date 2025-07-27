import { Injectable } from "@angular/core";
import { ModelStat } from '../filtre/model/model-stat';

import { HttpClient } from "@angular/common/http";

@Injectable(
    { providedIn: 'root' }
)

export class ServiceStat{
    date!: Date[]
    OVALatence!: number[]
    OVBLatence!: number[]
    OVTOLatence!: number[]
    polarData!: any[]
    barData!: any[]
    labels!: any[]


    modelStat!: ModelStat[];


    getServiceStatDate(j: number): Date{
        let date = [this.modelStat[0].date]
        for(let i=1; i< this.modelStat.length; i++){
            date.push(this.modelStat[i].date)
        }
        return date[j]
    }
    getServiceStatOVA(j: number): number{
        let OVALatence = [this.modelStat[0].OVALatence]
        for(let i=1; i< this.modelStat.length; i++){
            OVALatence.push(this.modelStat[i].OVALatence)
        }
        return OVALatence[j]
    }

    getServiceStatOVB(j: number): number{
        let OVBLatence = [this.modelStat[0].OVBLatence]
        for(let i=1; i< this.modelStat.length; i++){
            OVBLatence.push(this.modelStat[i].OVBLatence)
        }
        return OVBLatence[j]
    }

    getServiceStatOVTO(j: number): number{
        let OVTOLatence = [this.modelStat[0].OVTOLatence]
        for(let i=1; i< this.modelStat.length; i++){
            OVTOLatence.push(this.modelStat[i].OVTOLatence)
        }
        return OVTOLatence[j]
    }

    getServiceStatPolarData(j: number): number[]{
        let polarData = [this.modelStat[0].polarData]
        for(let i=1; i< this.modelStat.length; i++){
            polarData.push(this.modelStat[i].polarData)
        }
        return polarData[j]
    }

    alert(){
        console.log("length: "+this.modelStat.length)
        console.log("length2: "+this.getLength())
        console.log("OVTOLatence2: "+this.getServiceStatOVTO(0));
        console.log(this.getListStatistiques())
    }

    getServiceStatBarData(j: number): any[]{
        let barData = [[{ data: this.modelStat[0].barDataSucces, label: 'Succes' },
        { data: this.modelStat[0].barDataEchec, label: 'Echec' }]]
        for(let i=1; i< this.modelStat.length; i++){
            barData.push([{ data: this.modelStat[i].barDataSucces, label: 'Succes' },
                { data: this.modelStat[i].barDataEchec, label: 'Echec' }])
            ;
        }
        return barData[j]
    }

    getServiceStatLabels(j: number): string[]{
        let labels = [this.modelStat[0].labels]
        for(let i=1; i< this.modelStat.length; i++){
            labels.push(this.modelStat[i].labels)
        }
        return labels[j]
    }

    getLength(): number{
        return this.modelStat.length
    }


    API_URL_Statistiques="http://localhost:8080/API-DashBoard/statistiques.php";

    constructor(private httpClient: HttpClient){}

    getStatistiques(){
        return this.httpClient.get(this.API_URL_Statistiques);
    }

    getListStatistiques(): any{

        this.getStatistiques().subscribe((response) => {
    
            let entries = Object.entries(response)
            const {labels, polarData, barDataSucces, barDataEchec, OVTOLatence, OVBLatence, OVALatence, date} = entries[0][1]
            let data: { labels: any; polarData: any; barDataSucces: any; barDataEchec: any; OVTOLatence: any; OVBLatence: any; OVALatence: any; date: Date }[] = []
            entries.forEach((entry) => {
                data.push({
                    labels: entry[1].labels,
                    polarData: entry[1].polarData,
                    barDataSucces: entry[1].barDataSucces,
                    barDataEchec: entry[1].barDataEchec,
                    OVTOLatence: entry[1].OVTOLatence,
                    OVBLatence: entry[1].OVBLatence,
                    OVALatence: entry[1].OVALatence,
                    date: new Date(entry[1].date),
                });
            });
            console.log("data", data);
            
            // console.log("labels : "+ labels)
            // console.log("polarData : "+ polarData)
            // console.log("barDataSucces : "+ barDataSucces)
            // console.log("barDataEchec : "+ barDataEchec)
            // console.log("OVTOLatence : "+ OVTOLatence)
            // console.log("OVBLatence : "+ OVBLatence)
            // console.log("OVALatence : "+ OVALatence)
            // console.log("date : "+date)

            return this.modelStat = data as ModelStat[];
        });
    }


}
