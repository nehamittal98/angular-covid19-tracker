import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryService } from '../services/country.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryList: any[];
  global: any;
  search: any;
  constructor(private countryService: CountryService, private dataService: DataService, private SpinnerService: NgxSpinnerService) { 
    this.countryList = [];
  }

  ngOnInit() {
    this.SpinnerService.show(); 
    this.countryService.getCountriesStat('india').subscribe(
      data => {
        console.log(data.Global);
        this.global = data.Global;
        console.log(this.global.NewConfirmed);
        
        console.log(data.Countries);
        this.countryList = data.Countries;
        this.countryList.forEach(country => country.img=`https://www.countryflags.io/${country.CountryCode}/flat/64.png`)
        console.log(this.countryList[2].CountryCode);
        this.SpinnerService.hide(); 
        
      },
      error => {
        console.log(error);
      }
    );
  }

  viewCountry(country){
    this.dataService.sendDataToOtherComponent(country);
  }

  filterList(){
    alert(this.search);
    this.countryList.filter(country => {
      if(!country.Country.includes(this.search)){
        let index = JSON.parse(JSON.stringify(this.countryList)).find(country);
        this.countryList.splice(index, 1);
      }
    })
  }

}
