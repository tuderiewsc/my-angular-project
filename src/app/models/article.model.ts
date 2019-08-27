export class ArticleModel {
    // tslint:disable-next-line: variable-name
    _id?: string;
    id: number;
    title: string;
    image: string;
    desc: string;
    createdat?: number;
    submitted: boolean;
}

export class ArticleResolved {
    resolvedarticle: ArticleModel;
    error?: string;
}
