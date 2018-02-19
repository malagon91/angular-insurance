import { Customer } from './../customer';
import { SearchService } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  term$ = new Subject<string>();
  customers: Customer[];
  constructor(private _search: SearchService){
    this._search.search(this.term$).subscribe(result=> this.customers = result);
    this.term$.next('new');
  }
}
