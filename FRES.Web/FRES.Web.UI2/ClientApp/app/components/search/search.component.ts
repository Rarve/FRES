import { Component } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { RealEstate } from '../structure/realestate';
import { Query } from '../structure/query';
import { Paging } from '../structure/paging';
import { MapComponent } from './map.component';
import { DDLProvinceComponent } from './province.component';
import { DDLBankComponent } from './bank.component';

@Component({
    selector: 'search',
    template: require('./search.component.html'),
    styles: [require('./search.component.css')]
})
export class SearchComponent {
    res: RealEstate[];
    params: Query;
    http: Http;
    sanitizer: DomSanitizer;
    paging: Paging = new Paging();
    log: string;

    constructor(http: Http, sanitizer: DomSanitizer) {
        this.http = http;
        this.sanitizer = sanitizer;
        this.paging.pageNumber = 10;
        this.paging.itemPerPage = 1;

        this.http.get('/api/realestate/all').subscribe(result => {
            if (result === undefined || result === null) {
                console.log("documentdb return null");
            }
            else {
                this.paging.all = result.json();
                this.paging.show = this.paging.all.slice(0, this.paging.itemPerPage);
                this.res = this.paging.show;
            }
        });
    }

    onScroll(event: Event) {
        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
                
        var scrollHeight = document.body.scrollHeight;
        this.log = Math.floor(height) + ' ' + Math.floor(window.scrollY) + ' ' + Math.floor(scrollHeight);
        
        if (Math.floor(scrollHeight) - (Math.floor(height) + Math.floor(window.scrollY)) < 2) {
            var begin = this.paging.itemPerPage * this.paging.pageNumber;
            this.paging.pageNumber++;
            var end = this.paging.itemPerPage * this.paging.pageNumber;
            for (var i = begin; i < end && i < this.paging.all.length; i++) {
                this.paging.show.push(this.paging.all[i]);
            }
            this.log = "end";
        }
    }

    getArrayLength(val: string[]) {        
        if (val === undefined || val === null) return 0;
        else if (val.length == 0) return 0;
        else if (val.length < 2) return 1;
        else { return 2 };
    }

    submit(value) {
        this.params = value;
        this.params.PriceMax = (this.params.PriceMax === undefined || this.params.PriceMax == null) ? 0 : this.params.PriceMax;
        this.params.PriceMin = (this.params.PriceMin === undefined || this.params.PriceMin == null) ? 0 : this.params.PriceMin;
        let body = JSON.stringify(this.params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('/api/realestate/search', body, options).subscribe(result => {
            this.paging.all = result.json();
            this.paging.show = this.paging.all.slice(0, this.paging.itemPerPage);
            this.res = this.paging.show;
            this.paging.pageNumber = 1;
        });
    }    
}