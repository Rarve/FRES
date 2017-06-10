import { Component } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';

@Component({
    selector: 'search',
    template: require('./search.component.html'),
})
export class SearchComponent {
    res: RealEstate[];
    params: Query;
    http: Http;

    submit(value) {
        this.params.priceMin = 0;
        this.params.priceMax = 0;
        this.params = value;
        let body = JSON.stringify(this.params);
        alert(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('/api/realestate/search', body, options).subscribe(result => { this.res = result.json(); });
    }    

    constructor(http: Http) {
        this.http = http;
        this.http.get('/api/realestate/all').subscribe(result => { this.res = result.json(); });
    }
}

interface Query {
    source: string;
    priceMin: number;
    priceMax: number;
    lat: number;
    lon: number;
}

interface RealEstate {
    url: string;
    code: string;
    name: string;
    images: string[];
}


