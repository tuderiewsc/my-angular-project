export class ArticleModel {
    id: number;
    title: string;
    image: string;
    desc: string;
    category_id: number;
    user_id: number;
    created_at?: number;
    submitted: boolean;
    isfavorite: boolean;
    data: ArticleModel[];
}

export class ArticleResolved {
    resolvedarticle: ArticleModel;
    error?: string;
}
