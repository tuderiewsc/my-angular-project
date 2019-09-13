export class ArticleModel {
    // tslint:disable-next-line: variable-name
    _id?: string;
    id: number;
    title: string;
    image: string;
    desc: string;
    slug: string;
    createdat?: number;
    submitted: boolean;
    isfavorite: boolean;
}

export class ArticleResolved {
    resolvedarticle: ArticleModel;
    error?: string;
}
