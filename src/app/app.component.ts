import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	Titel = "RecipeApp";
	//JSON.parse(localStorage.getItem('currentUser')).username;


  constructor() {
  }

  
  ngOnInit() {

  }


}
