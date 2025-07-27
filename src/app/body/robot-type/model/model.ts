
export class Model{

    constructor(
        public id: number,
        public type: string,
        public date: Date,
        public total: number,
        public achieved: number,
        public waiting: number,
        public failed: number,
    ){}
}