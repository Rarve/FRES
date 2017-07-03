"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MapComponent = (function () {
    function MapComponent() {
        this.positions = [];
    }
    MapComponent.prototype.showRandomMarkers = function () {
        var randomLat, randomLng;
        this.positions = [];
        for (var i = 0; i < 9; i++) {
            randomLat = Math.random() * 0.0099 + 43.7250;
            randomLng = Math.random() * 0.0099 + -79.7699;
            this.positions.push([randomLat, randomLng]);
        }
    };
    MapComponent.prototype.addMarker = function () {
        var randomLat = Math.random() * 0.0099 + 43.7250;
        var randomLng = Math.random() * 0.0099 + -79.7699;
        this.positions.push([randomLat, randomLng]);
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: require('./map.component.html')
    })
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map