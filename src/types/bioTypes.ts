export interface BioDictItem {
    id: number;
    name: string;
    benefit: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BioSkincareItem {
    id: number;
    name: string;
    benefit: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BioArticle {
    id: number;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}