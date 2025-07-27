import { categorie } from '../table-demande/type/categorie.type';
import { operation } from '../table-demande/type/operation.type';
import { status } from '../table-demande/type/status.type';

export interface Interface{
    id: number;
    nomClient: string;
    offre: string;
    categorie: categorie;
    operation: operation;
    dateIntervention: Date;
    status: status;
    detail?: string; 
}