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
var paging_1 = require("../structure/paging");
var SearchComponent = (function () {
    function SearchComponent(http, sanitizer) {
        var _this = this;
        this.paging = new paging_1.Paging();
        this.http = http;
        this.sanitizer = sanitizer;
        this.paging.pageNumber = 1;
        this.paging.itemPerPage = 10;
        this.http.get('/api/realestate/all').subscribe(function (result) {
            if (result === undefined || result === null) {
                console.log("documentdb return null");
            }
            else {
                _this.paging.all = result.json();
                _this.paging.show = _this.paging.all.slice(0, _this.paging.itemPerPage);
                _this.res = _this.paging.show;
            }
        });
    }
    SearchComponent.prototype.onScroll = function (event) {
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
    };
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
        this.params.PageNumber = this.paging.pageNumber;
        this.params.ItemPerPage = this.paging.itemPerPage;
        var body = JSON.stringify(this.params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('/api/realestate/search', body, options).subscribe(function (result) {
            _this.paging.all = result.json();
            _this.paging.show = _this.paging.all.slice(0, _this.paging.itemPerPage);
            _this.res = _this.paging.show;
            _this.paging.pageNumber = 1;
        });
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        template: require('./search.component.html'),
        styles: [require('./search.component.css')]
    }),
    __metadata("design:paramtypes", [http_1.Http, platform_browser_1.DomSanitizer])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map