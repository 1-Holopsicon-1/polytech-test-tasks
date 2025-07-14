export interface Publication {
    id: string;
    title: string;
    type: 'article' | 'thesis' | 'report';
    author: string;
    createdDate: string;
    status: 'pending' | 'approved' | 'rejected' | 'under_review';
    expertFile?: string;
    subtype?: string;
    materialName?: string;
    authorsFromMospolytech?: string;
    coAuthors?: string;
    contactInfo?: string;
    expertiseResult?: string;
    expertiseNumber?: string;
    expertiseDate?: string;
    expertiseStartDate?: string;
    expertiseEndDate?: string;
}