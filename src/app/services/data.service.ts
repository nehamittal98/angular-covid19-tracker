import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  countryList: Country[] = [];
  public shareDataSubject = new BehaviorSubject<any>(this.countryList);

  sendDataToOtherComponent(somedata) {
    this.shareDataSubject.next(somedata);
  }
}
