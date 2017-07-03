"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var SearchComponent = (function () {
    function SearchComponent(http, sanitizer) {
        var _this = this;
        this.http = http;
        this.sanitizer = sanitizer;
        this.http.get('/api/realestate/all').subscribe(function (result) {
            if (result === undefined || result === null) {
                return "documentdb return null";
            }
            else {
                _this.res = result.json();
            }
        });
    }
    SearchComponent.prototype.getArrayLength = function (val) {
        if (val === undefined || val === null)
            return 0;
        else if (val.length == 0)
            return 0;
        else if (val.length < 2)
            return 1;
        else {
            return 2;
        }
        ;
    };
    SearchComponent.prototype.submit = function (value) {
        var _this = this;
        this.params = value;
        this.params.PriceMax = (this.params.PriceMax === undefined || this.params.PriceMax == null) ? 0 : this.params.PriceMax;
        this.params.PriceMin = (this.params.PriceMin === undefined || this.params.PriceMin == null) ? 0 : this.params.PriceMin;
        var body = JSON.stringify(this.params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('/api/realestate/search', body, options).subscribe(function (result) { _this.res = result.json(); });
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        template: require('./search.component.html'),
        styles: [require('./search.component.css')],
    }),
    __metadata("design:paramtypes", [http_1.Http, platform_browser_1.DomSanitizer])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map