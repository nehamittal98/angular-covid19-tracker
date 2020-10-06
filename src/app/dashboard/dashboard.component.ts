import { Component, HostListener, OnInit } from '@angular/core';
import { Country } from '../model/country';
import { CountryService } from '../services/country.service';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countryList: any[];
  global: any;
  search: any;
  isShow: boolean;
  topPosToStartShowing = 100;
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

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  // filterCard() {
  //   // Declare variables
  //   var filter, card, tr, td, i, txtValue;
  //   filter = this.search.toUpperCase();
  //   card = document.getElementById("country-details-card");
  //   tr = card.getElementsByTagName("mat-card-title");
  
  //   // Loop through all table rows, and hide those who don't match the search query
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td")[1];
  //     if (td) {
  //       txtValue = td.textContent || td.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // }


}