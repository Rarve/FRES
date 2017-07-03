import { Injectable, Input, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RealEstate } from '../interface/irealestate';

@Component({
    selector: 'list',
    template: require('./list.component.html'),
})

export class ListComponent {
    @Input() res: RealEstate[];
    sanitizer: DomSanitizer;

    constructor(sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer;
    }
}

