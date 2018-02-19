import { Injectable } from '@angular/core';
import {HttpModule,Http, Headers} from  '@angular/http';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Customer } from './customer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {Observable} from "rxjs/Observable";


@Injectable()
export class SearchService {


  constructor(private _http: Http ) { }

  search(terms: Observable<string>){
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term=> this.rawsearch(term));

  }

  rawsearch(term:string){
    let headers =
      new Headers({'Content-Type': 'application/json'});
    let search = new URLSearchParams();
    search.set('srch', term);
    let obs = this._http.get('http://localhost/api/customersapi', {search})
      .map(response  => response.json());
    return obs;

  }
}
