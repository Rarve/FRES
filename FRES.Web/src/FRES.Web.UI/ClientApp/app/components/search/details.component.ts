import { Component } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { RealEstate } from '../interface/irealestate';

@Component({
    selector: 'search',
    template: require('./details.component.html'),
})
export class DetailsComponent {
    re: RealEstate;

    constructor(http: Http) {
        alert(this.re);
    }
}


