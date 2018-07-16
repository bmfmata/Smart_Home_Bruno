import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

    
  private site = "https://api.themoviedb.org/3/"
  private api = "?api_key=96764d3fca6c9c53ad32f882c764ea38"
  constructor(
    public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }


  getLastestMovies(){
    return this.http.get(this.site + "movie/popular" + this.api)
  }

  getMoviesDetails(filmeid){
    return this.http.get(this.site + `movie/${filmeid}` + this.api)
  }
 

}
