export class ModelStat{

    constructor(
        public labels: string[],
        public polarData: number[],
        public barDataSucces: any[],
        public barDataEchec: any[],
        public OVTOLatence: number,
        public OVBLatence: number,
        public OVALatence: number,
        public date: Date,
    ){}
}