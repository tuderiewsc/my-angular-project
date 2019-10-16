export class ArticleModel {
    id: number;
    title: string;
    image: string;
    desc: string;
    //slug: string;
    category_id: number;
    createdat?: number;
    submitted: boolean;
    isfavorite: boolean;
    data: ArticleModel[];
}

export class ArticleResolved {
    resolvedarticle: ArticleModel;
    error?: string;
}
