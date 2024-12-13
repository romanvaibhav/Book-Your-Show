import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "./../../env/env"
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static baseUrl = environment.API_HOST_URL;

  constructor(private httpClient: HttpClient) { }


  getProductList(): Observable<object> {
    return this.httpClient.get(`http://localhost:3002/user/city/movie`);
  }

  getCityList(): Observable<object> {
    return this.httpClient.get(`http://localhost:3002/user/city`);
  }


  //Gettting Movies By Filtering
  getMovieFilertByCity(Obj: any): Observable<object> {
    console.log("Sending Params");
    let params = new HttpParams();
    console.log(Obj._Id)
    if (Obj?._Id) {
      params = params.set('cityId', Obj._Id);
    }
    console.log('Constructed Params:', params.toString());
    return this.httpClient.get(`http://localhost:3002/user/city/fmovie`, { params });
  }


  //Getting Single Movie
  getOneMovie(_id: string | undefined | null): Observable<object> {
    let params = new HttpParams();

    if (_id) {
      params = params.set('_id', _id);
    }
    return this.httpClient.get(`http://localhost:3002/user/city/onemovie`, { params })
  }


  //Getting Halls In the City
  getHallInCity(cityId: string | null | undefined): Observable<object> {
    let params = new HttpParams();
    if (cityId) {
      params = params.set("cityId", cityId);
    }
    return this.httpClient.get(`http://localhost:3002/user/city/hall`, { params })
  }



  getAllSlot(cityId: string | null | undefined, movieId: string | null | undefined): Observable<object> {
    let params = new HttpParams();
    if (movieId && cityId) {
      params = params.set('cityId', cityId).set("movieId", movieId);
    }
    return this.httpClient.get(`http://localhost:3002/user/city/slot`, { params })
  }
  
  gotgetAllSlot(): Observable<object> {
    // let params = new HttpParams();
    // if (movieId && cityId) {
    //   params = params.set('cityId', cityId).set("movieId", movieId);
    // }
    return this.httpClient.get(`http://localhost:3002/user/city/allslot`)
  }



  getOneShow(_id:string | null |undefined):Observable<object>{
    let params=new HttpParams();
    if(_id){
      params=params.set('_id',_id);
    }
    return this.httpClient.get(`http://localhost:3002/user/city/oneshow`,{ params })

  }

  patchSeats(_id:String | undefined | null ,seatIds:any[]):Observable<object>{
    const body = {
      _id,
      seatIds,
    };
    return this.httpClient.patch(`http://localhost:3002/user/city/confirm`,body);

  }

  postShowCreation(showcreation:any ):Observable<object>{

    return this.httpClient.post(`http://localhost:3002/user/city/slot`,showcreation);

  }

  getDateWiseShow(date:string, cityId:string |null ){
    let params=new HttpParams;
    if(cityId && date){
      params=params.set("date",date).set("cityId",cityId);
    }

    return this.httpClient.get(`http://localhost:3002/user/city/date`,{ params })
  }



  //Deleting Shows
  deleteShow(_id:string):Observable<object>{
    let params=new HttpParams;
    if(_id){
      params=params.set("_id",_id);
    }
    return this.httpClient.delete(`http://localhost:3002/user/city/show/delete`,{ params })

  }


}




