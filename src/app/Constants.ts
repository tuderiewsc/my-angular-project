export class Constants {
  public static baseUrl = 'http://127.0.0.1:8000/api';

  public static urlArticles = Constants.baseUrl+'/articles?page=';
  public static urlOne = Constants.baseUrl+'/articles';
  public static urlCats = Constants.baseUrl+'/categories';
  public static urlHeadCats = Constants.baseUrl+'/headCats';
  public static urlOneCat = Constants.baseUrl+'/articles/categories';
  public static urlArticlesList = Constants.baseUrl+'/articlesList';
  public static urlArticlesUpdate = Constants.baseUrl+'/articles/';
  public static regUrl = Constants.baseUrl+'/register';
  public static loginUrl = Constants.baseUrl+'/login';
  public static searchArticleUrl = Constants.baseUrl+'/searchArticle';
  public static uploadImageUrl = Constants.baseUrl+'/uploadImg';
  public static uploadImageList = Constants.baseUrl+'/uploadImagesList/';
  public static urlUpdateStatus = Constants.baseUrl+'/update_status/';
  public static urlUpdateUser = Constants.baseUrl+'/update_user/';
  public static urlgetUser = Constants.baseUrl+'/get_user/';

  public static AuthCookie = 'userLogin';
  public static UserID = '';
}


