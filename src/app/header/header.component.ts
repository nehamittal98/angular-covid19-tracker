import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNoteView = true;

  constructor(private routerService: RouterService){}
  
  ngOnInit(){
  }

  navigateToListView(){
    this.routerService.routeToListView();
    this.isNoteView = true;
  }

  navigateToTileView(){
    this.routerService.routeToDashboard();
    this.isNoteView = false;
  }

}
