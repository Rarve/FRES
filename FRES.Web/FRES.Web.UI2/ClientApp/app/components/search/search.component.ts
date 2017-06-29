import { Component } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { IRealEstate } from '../structure/irealestate';
import { IQuery } from '../structure/iquery';
import { MapComponent } from './map.component';
import { DDLProvinceComponent } from './province.component';
import { DDLBankComponent } from './bank.component';

@Component({
    selector: 'search',
    template: require('./search.component.html'),
    styles: [require('./search.component.css')],

})
export class SearchComponent {
    res: IRealEstate[];
    params: IQuery;
    http: Http;
    sanitizer: DomSanitizer;

    constructor(http: Http, sanitizer: DomSanitizer) {
        this.http = http;
        this.sanitizer = sanitizer;
        //this.http.get('/api/realestate/all').subscribe(result => {
            //if (result === undefined || result === null) {
            //    console.log("documentdb return null");
            //}
            //else {
            //    this.res = result.json();
            //}
        //});
    }

    onScroll(event: Event) {
        //var height = window.innerHeight
        //    || document.documentElement.clientHeight
        //    || document.body.clientHeight;
                
        //var scrollHeight = document.body.scrollHeight;
        //this.log = Math.floor(height) + ' ' + Math.floor(window.scrollY) + ' ' + Math.floor(scrollHeight);

        //var more: IRealEstate[];
        //if (Math.floor(scrollHeight) - (Math.floor(height) + Math.floor(window.scrollY)) < 2) {
        //    this.log = 'end';
        //    this.http.get('/api/realestate/all').subscribe(result => {
        //        more = result.json();
        //        for (var i = 0; i < more.length; i++) {
        //            this.res.push(more[i]);
        //        }
        //    });

        //    //this.log = more.length.toString();
        //}
    }

    getArrayLength(val: string[]) {        
        if (val === undefined || val === null) return 0;
        else if (val.length == 0) return 0;
        else if (val.length < 2) return 1;
        else { return 2 };
    }

    submit(value) {
        //this.params = value;
        //this.params.PriceMax = (this.params.PriceMax === undefined || this.params.PriceMax == null) ? 0 : this.params.PriceMax;
        //this.params.PriceMin = (this.params.PriceMin === undefined || this.params.PriceMin == null) ? 0 : this.params.PriceMin;
        //let body = JSON.stringify(this.params);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //this.http.post('/api/realestate/search', body, options).subscribe(result => { this.res = result.json(); });
    }    
}