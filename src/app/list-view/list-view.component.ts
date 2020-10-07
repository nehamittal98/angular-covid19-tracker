import { Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryService } from '../services/country.service';
import { DataService } from '../services/data.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  countryList: any[];
  global: any;
  search: any;
  sortedData: any;
  isShow: boolean;
  updated: string;
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
        this.countryList.forEach(country => country.img = `https://www.countryflags.io/${country.CountryCode}/flat/64.png`);
        this.countryList.forEach(country => country.TotalActive = country.TotalConfirmed - country.TotalRecovered - country.TotalDeaths);
        console.log(this.countryList[2].CountryCode);

        var time = new Date().getTime() - new Date(this.countryList[0].Date).getTime();
        var seconds = Math.floor((time) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        this.updated = `Updated ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds Ago`;
        console.log(this.updated);

        this.SpinnerService.hide();

      },
      error => {
        console.log(error);
      }
    );
  }

  // filterList(){
  //   alert(this.search);
  //   this.countryList.filter(country => {
  //     if(!country.Country.includes(this.search)){
  //       let index = JSON.parse(JSON.stringify(this.countryList)).find(country);
  //       this.countryList.splice(index, 1);
  //     }
  //   })
  // }

  filterList() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = this.search.toUpperCase();
    table = document.getElementById("country-details-table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
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

  sortData(sort: Sort) {
    const data = this.countryList;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Country': return compare(a.Country, b.Country, isAsc);
        case 'CountryCode': return compare(a.CountryCode, b.CountryCode, isAsc);
        case 'TotalActive': return compare(a.TotalActive, b.TotalActive, isAsc);
        case 'TotalRecovered': return compare(a.TotalRecovered, b.TotalRecovered, isAsc);
        case 'TotalDeaths': return compare(a.TotalDeaths, b.TotalDeaths, isAsc);
        case 'TotalConfirmed': return compare(a.TotalConfirmed, b.TotalConfirmed, isAsc);
        default: return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
