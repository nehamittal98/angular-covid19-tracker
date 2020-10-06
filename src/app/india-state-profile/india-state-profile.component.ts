import { Component, HostListener, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-india-state-profile',
  templateUrl: './india-state-profile.component.html',
  styleUrls: ['./india-state-profile.component.css']
})
export class IndiaStateProfileComponent implements OnInit {

  indianStates: any[];
  search: any;
  sortedData: any[];
  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.shareDataSubject.subscribe(
      data => {
        this.indianStates = JSON.parse(JSON.stringify(data)).districtData;
        console.log(this.indianStates);
        
      }
    )
  }

  filterList() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = this.search.toUpperCase();
    table = document.getElementById("india-district-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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
    const data = this.indianStates;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        // case 'active': return compare(a.active, b.active, isAsc);
        case 'recovered': return compare(a.recovered, b.recovered, isAsc);
        case 'deaths': return compare(a.deaths, b.deaths, isAsc);
        case 'confirmed': return compare(a.confirmed, b.confirmed, isAsc);
        default: return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

