import { ClientEntity } from '../enums/ClientEntity';

export type ClientModel = {
    id: string;
    clientId: number | string;
    entity: ClientEntity;
    firstName?: string;
    lastName?: string;
    companyName?: string; 
    relationToTheCompany: string;
    positionInTheCompany: string;
}