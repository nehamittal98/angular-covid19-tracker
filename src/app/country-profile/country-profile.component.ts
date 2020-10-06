import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { DataService } from '../services/data.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-country-profile',
  templateUrl: './country-profile.component.html',
  styleUrls: ['./country-profile.component.css']
})
export class CountryProfileComponent implements OnInit {

  country: any;
  constructor(private countryService: CountryService, private dataService: DataService, private routerService: RouterService) { 
  }

  ngOnInit() {
    this.dataService.shareDataSubject.subscribe(
      data => {
        this.country = data
      }
    );
    
  }

  back(){
    this.routerService.routeBack();
  }

}
