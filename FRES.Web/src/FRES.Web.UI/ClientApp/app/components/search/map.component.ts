import { Component } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NguiMapComponent } from '@ngui/map';
@Component({
    selector: 'my-app',
    template: require('./map.component.html')
})
export class MapComponent {
    positions = [];

    showRandomMarkers() {
        let randomLat: number, randomLng: number;
        this.positions = [];
        for (let i = 0; i < 9; i++) {
            randomLat = Math.random() * 0.0099 + 43.7250;
            randomLng = Math.random() * 0.0099 + -79.7699;
            this.positions.push([randomLat, randomLng]);
        }
    }
    addMarker() {
        let randomLat = Math.random() * 0.0099 + 43.7250;
        let randomLng = Math.random() * 0.0099 + -79.7699;
        this.positions.push([randomLat, randomLng]);
    }

}
