import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html')
})
export class FetchDataComponent {
    public res: RealEstate[];

    constructor(http: Http) {
        http.get('/api/RealEstate/GetAll').subscribe(result => {
            this.res = result.json();
        });
    }
}

interface RealEstate {
    url: string;
    code: string;
    name: string;
    images: string[];
}