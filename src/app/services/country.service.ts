import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  getAllCountriesName(){
    return this.httpClient.get<any>('https://api.covidindiatracker.com/state_data.json')
  }

  getCountriesStat(slug){
    return this.httpClient.get<any>(`https://api.covid19api.com/summary`)
  }
}
