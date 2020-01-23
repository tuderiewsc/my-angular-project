export class ArticleModel {
    id: number;
    title: string;
    image: string;
    desc: string;
    category_id: number;
    user_id: number;
    user?:string;
    created_at?: number;
    submitted: boolean;
    isfavorite: boolean;
    views: number;
    data: ArticleModel[];
}

export class ArticleResolved {
    resolvedarticle: ArticleModel;
    error?: string;
}
