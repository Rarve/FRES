import { Component } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { RealEstate } from '../interface/irealestate';
import { Query } from '../interface/iquery';
import { MapComponent } from './map.component';
import { DDLProvinceComponent } from './province.component';
import { DDLBankComponent } from './bank.component';

@Component({
    selector: 'search',
    template: require('./search.component.html'),
    styles: [require('./search.component.css')],

})
export class SearchComponent {
    res: RealEstate[];
    params: Query;
    http: Http;
    sanitizer: DomSanitizer;
    
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
        this.http.post('/api/realestate/search', body, options).subscribe(result => { this.res = result.json(); });
    }    

    constructor(http: Http, sanitizer: DomSanitizer) {
        this.http = http;
        this.sanitizer = sanitizer;
        this.http.get('/api/realestate/all').subscribe(result => {
            if (result === undefined || result === null) {
                return "documentdb return null";
            }
            else {
                this.res = result.json();
            }
        });
    }


}

