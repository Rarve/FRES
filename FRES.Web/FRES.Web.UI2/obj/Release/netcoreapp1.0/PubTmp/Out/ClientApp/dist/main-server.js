(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(1);
	__webpack_require__(2);
	var core_1 = __webpack_require__(3);
	var angular2_universal_1 = __webpack_require__(4);
	var app_module_1 = __webpack_require__(5);
	core_1.enableProdMode();
	var platform = angular2_universal_1.platformNodeDynamic();
	function default_1(params) {
	    return new Promise(function (resolve, reject) {
	        var requestZone = Zone.current.fork({
	            name: 'angular-universal request',
	            properties: {
	                baseUrl: '/',
	                requestUrl: params.url,
	                originUrl: params.origin,
	                preboot: false,
	                // TODO: Render just the <app> component instead of wrapping it inside an extra HTML document
	                // Waiting on https://github.com/angular/universal/issues/347
	                document: '<!DOCTYPE html><html><head></head><body><app></app></body></html>'
	            },
	            onHandleError: function (parentZone, currentZone, targetZone, error) {
	                // If any error occurs while rendering the module, reject the whole operation
	                reject(error);
	                return true;
	            }
	        });
	        return requestZone.run(function () { return platform.serializeModule(app_module_1.AppModule); }).then(function (html) {
	            resolve({ html: html });
	        }, reject);
	    });
	}
	exports.default = default_1;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("angular2-universal-polyfills");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("zone.js");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("@angular/core");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("angular2-universal");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var platform_browser_1 = __webpack_require__(6);
	var forms_1 = __webpack_require__(7);
	var router_1 = __webpack_require__(8);
	var angular2_universal_1 = __webpack_require__(4);
	var app_component_1 = __webpack_require__(9);
	var navmenu_component_1 = __webpack_require__(14);
	var home_component_1 = __webpack_require__(18);
	var fetchdata_component_1 = __webpack_require__(22);
	var counter_component_1 = __webpack_require__(25);
	var search_component_1 = __webpack_require__(27);
	var map_1 = __webpack_require__(31);
	var map_component_1 = __webpack_require__(32);
	var province_component_1 = __webpack_require__(34);
	var bank_component_1 = __webpack_require__(36);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    return AppModule;
	}());
	AppModule = __decorate([
	    core_1.NgModule({
	        bootstrap: [app_component_1.AppComponent],
	        declarations: [
	            app_component_1.AppComponent,
	            navmenu_component_1.NavMenuComponent,
	            counter_component_1.CounterComponent,
	            fetchdata_component_1.FetchDataComponent,
	            search_component_1.SearchComponent,
	            home_component_1.HomeComponent,
	            map_component_1.MapComponent,
	            province_component_1.DDLProvinceComponent,
	            bank_component_1.DDLBankComponent
	        ],
	        imports: [
	            platform_browser_1.BrowserModule, forms_1.FormsModule,
	            map_1.NguiMapModule.forRoot({
	                apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing'
	            }),
	            angular2_universal_1.UniversalModule,
	            router_1.RouterModule.forRoot([
	                { path: '', redirectTo: 'home', pathMatch: 'full' },
	                { path: 'home', component: home_component_1.HomeComponent },
	                { path: 'counter', component: counter_component_1.CounterComponent },
	                { path: 'fetch-data', component: fetchdata_component_1.FetchDataComponent },
	                { path: 'search', component: search_component_1.SearchComponent },
	                { path: '**', redirectTo: 'home' }
	            ])
	        ]
	    })
	], AppModule);
	exports.AppModule = AppModule;
	//# sourceMappingURL=app.module.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("@angular/platform-browser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("@angular/forms");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("@angular/router");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var AppComponent = (function () {
	    function AppComponent() {
	    }
	    return AppComponent;
	}());
	AppComponent = __decorate([
	    core_1.Component({
	        selector: 'app',
	        template: __webpack_require__(10),
	        styles: [__webpack_require__(11)]
	    })
	], AppComponent);
	exports.AppComponent = AppComponent;
	//# sourceMappingURL=app.component.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = "\r\n<div class='container-fluid' style=\"background-color:#242424; height:100%;\">\r\n    <nav-menu></nav-menu>\r\n    <div class='row'>\r\n        <div class='col-sm-12 body-content'>\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(12);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, "@media (max-width: 767px) {\n    /* On small screens, the nav menu spans the full width of the screen. Leave a space for it. */\n    .body-content {\n        padding-top: 50px;\n    }\n    body{\r\n        height:100%;\r\n    }\n}", ""]);
	
	// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var NavMenuComponent = (function () {
	    function NavMenuComponent() {
	    }
	    return NavMenuComponent;
	}());
	NavMenuComponent = __decorate([
	    core_1.Component({
	        selector: 'nav-menu',
	        template: __webpack_require__(15),
	        styles: [__webpack_require__(16)]
	    })
	], NavMenuComponent);
	exports.NavMenuComponent = NavMenuComponent;
	//# sourceMappingURL=navmenu.component.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-inverse\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" href=\"#\">FRES</a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li [routerLinkActive]=\"['link-active']\">\r\n                    <a [routerLink]=\"['/home']\">\r\n                        <span class='glyphicon glyphicon-home'></span> Home\r\n                    </a>\r\n                </li>\r\n                <li [routerLinkActive]=\"['link-active']\">\r\n                    <a [routerLink]=\"['/search']\">\r\n                        <span class='glyphicon glyphicon-search'></span> Search\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>\r\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n"

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(17);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var HomeComponent = (function () {
	    function HomeComponent() {
	    }
	    return HomeComponent;
	}());
	HomeComponent = __decorate([
	    core_1.Component({
	        selector: 'home',
	        template: __webpack_require__(19),
	        styles: [__webpack_require__(20)]
	    })
	], HomeComponent);
	exports.HomeComponent = HomeComponent;
	//# sourceMappingURL=home.component.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"home\">\r\n    <h2>FRES</h2>\r\n    <h4>Welcome to Foreclosure Real Estate Search Engine</h4>\r\n    <br />\r\n    <p>This website gather foreclosure properties from various banks in Thailand.</p>\r\n    <ul>\r\n        <li><a href='http://www.ghbhomecenter.com/ghb'>Government Housing Bank (GHB)</a></li>\r\n        <li><a href='http://properties.gsb.or.th/'>Government Savings Bank (GSB)</a></li>\r\n        <li><a href='http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet'>Krung Thai Bank (KTB)</a></li>\r\n        <li><a href='http://www.buyatsiam.com/'>Siam Commercial Bank (SCB)</a></li>\r\n        <li><a href='http://www.thanachartnpa.com/'>Thanachart Bank</a></li>\r\n    </ul>\r\n    <br />\r\n    <h4>Technology Used in the website</h4>\r\n    <ul>\r\n        <li>.Net Core</li>\r\n        <li>AngularJS</li>\r\n        <li>Bootstrap</li>\r\n        <li>Azure Cosmos DB</li>\r\n        <li>Azure CDN</li>\r\n    </ul>\r\n    <br />\r\n    <h4>How do I gather all the properties</h4>\r\n    <p>\r\n        I basically download content in HTML for mat from each websites.\r\n        HTML is then transformed into json format.\r\n        The challenges are that each website has their own navigation system and HTML structure.\r\n        After that, the locations (lat, lon) is retrieved by selenium from\r\n        <a href='http://dolwms.dol.go.th/tvwebp/'>landmap</a>\r\n    </p>\r\n    <ul>\r\n        <li>.Net Framework 4.6</li>\r\n        <li>SQL CE + Entity Framework</li>\r\n        <li>HTML Agility Pack</li>\r\n        <li>Selenium</li>\r\n        <li>Lot of regular expressions</li>\r\n    </ul>\r\n</div>"

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(21);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".home {\r\n    color: #989898;\r\n}\r\n", ""]);
	
	// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(3);
	var http_1 = __webpack_require__(23);
	var FetchDataComponent = (function () {
	    function FetchDataComponent(http) {
	        var _this = this;
	        http.get('/api/RealEstate/GetAll').subscribe(function (result) {
	            _this.res = result.json();
	        });
	    }
	    return FetchDataComponent;
	}());
	FetchDataComponent = __decorate([
	    core_1.Component({
	        selector: 'fetchdata',
	        template: __webpack_require__(24)
	    }),
	    __metadata("design:paramtypes", [http_1.Http])
	], FetchDataComponent);
	exports.FetchDataComponent = FetchDataComponent;
	//# sourceMappingURL=fetchdata.component.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("@angular/http");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = "\r\n<h1>List</h1>\r\n<p *ngIf=\"!res\">\r\n    <em>Loading...</em>\r\n</p>\r\n<div className=\"col-lg-6 col-xs-6\" *ngFor=\"let re of res\">\r\n    <!--<div className=\"card-image\"><img src=\"{{re.images[0]}}\" /></div>-->\r\n    <div className=\"info\">\r\n        <div>{{re.code}}</div>\r\n        <div>\r\n            <a href={{re.url}}>{{re.source}}</a>\r\n        </div>\r\n        <div>{{re.name}}</div>\r\n        <div>{{re.price}}</div>\r\n        <div>{{re.sizeTotal}}</div>\r\n        <div>{{re.sizeTotalUnit}}</div>\r\n        <div>{{re.sizeTotalText}}</div>\r\n        <div>{{re.b\r\n        <div>{{re.bedRoom}}</div>\r\n        <div>{{re.bathRoom}}</div>\r\n        <div>{{re.storeys}}</div>\r\n        <div>{{re.parkingSpace}}</div>\r\n        <div>{{re.desc}}</div>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var CounterComponent = (function () {
	    function CounterComponent() {
	        this.currentCount = 0;
	    }
	    CounterComponent.prototype.incrementCounter = function () {
	        this.currentCount++;
	    };
	    return CounterComponent;
	}());
	CounterComponent = __decorate([
	    core_1.Component({
	        selector: 'counter',
	        template: __webpack_require__(26)
	    })
	], CounterComponent);
	exports.CounterComponent = CounterComponent;
	//# sourceMappingURL=counter.component.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = "<h2>Counter</h2>\n\n<p>This is a simple example of an Angular 2 component.</p>\n\n<p>Current count: <strong>{{ currentCount }}</strong></p>\n\n<button (click)=\"incrementCounter()\">Increment</button>"

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(3);
	var http_1 = __webpack_require__(23);
	var platform_browser_1 = __webpack_require__(6);
	var SearchComponent = (function () {
	    function SearchComponent(http, sanitizer) {
	        var _this = this;
	        this.http = http;
	        this.sanitizer = sanitizer;
	        this.http.get('/api/realestate/all').subscribe(function (result) {
	            _this.res = result.json();
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
	        template: __webpack_require__(28),
	        styles: [__webpack_require__(29)],
	    }),
	    __metadata("design:paramtypes", [http_1.Http, platform_browser_1.DomSanitizer])
	], SearchComponent);
	exports.SearchComponent = SearchComponent;
	//# sourceMappingURL=search.component.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = "\r\n<div class=\"row\">\r\n    <form #form=\"ngForm\" (ngSubmit)=\"submit(form.value)\" class=\"form-group row re-search-form \">\r\n        <div class=\"col-xs-1 col-lg12 nopadding\">\r\n            <input type=\"text\" name=\"PriceMin\" ngModel id=\"PriceMin\" placeholder=\"Min\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"col-xs-1 col-lg12 nopadding\">\r\n            <input type=\"text\" name=\"PriceMax\" ng-init=\"0\" ngModel id=\"PriceMax\" placeholder=\"Max\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"col-xs-2 col-lg12 nopadding\">\r\n            <ddl-bank name=\"Source\" ngModel id=\"Source\" ngDefaultControl></ddl-bank>\r\n        </div>\r\n        <div class=\"col-xs-2 col-lg12 nopadding\">\r\n            <ddl-province name=\"Province\" ngModel id=\"Province\" ngDefaultControl></ddl-province>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-info\"><span class=\"glyphicon glyphicon-search\"></span></button>\r\n    </form>\r\n</div>\r\n<div class=\"col-xs-12 col-lg-7 re-card\" *ngFor=\"let re of res; let i = index\" [attr.data-index]=\"i\">\r\n    <div class=\"re-image-container col-lg-9 col-md-9\">\r\n        <img *ngIf=\"getArrayLength(re.images) == 0\" src=\"/Images/default-thumbnail.jpg\" class=\"re-image img-responsive\" />\r\n        <div id=\"carousel-{{i}}\" class=\"carousel slide\" data-ride=\"carousel\">\r\n            <div class=\"carousel-inner\">\r\n                <div class=\"item{{j == 0 ? ' active' : ''}}\" *ngFor=\"let image of re.images; let j = index\" [attr.data-index]=\"j\">\r\n                    <img src=\"{{image}}\" class=\"re-image img-responsive\" fallback-src=\"/Images/default-thumbnail.jpg\">\r\n                </div>\r\n            </div>\r\n            <a *ngIf=\"getArrayLength(re.images) > 1\" class=\"left carousel-control\" href=\"#carousel-{{i}}\" data-slide=\"prev\">\r\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                <span class=\"sr-only\">Previous</span>\r\n            </a>\r\n            <a *ngIf=\"getArrayLength(re.images) > 1\" class=\"right carousel-control\" href=\"#carousel-{{i}}\" data-slide=\"next\">\r\n                <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n                <span class=\"sr-only\">Next</span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"re-card-details fill col-lg-3 col-md-3\">\r\n        <div class=\"row\" style=\" color:#585858;\">\r\n            <div class=\"col-xs-12\">{{re.price | number}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">{{re.map.province}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\" style=\"font-size:0.8em; color:#8c8c8c;\">{{re.sizeTotal + \" \" + re.sizeTotalUnit}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\" style=\"font-size:0.8em; color:#8c8c8c;\">{{re.map.desc}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\" style=\"font-size:0.8em; color:#8c8c8c;\">{{re.bed}}</div>\r\n        </div>\r\n        <div class=\"row re-card-glyp\">\r\n            <div *ngIf=\"re.bedRoom\" class=\"col-lg-12 col-xs-12\">\r\n                {{re.bedRoom}}\r\n                <i class=\"fa fa-bed\" aria-hidden=\"true\"></i>&nbsp;\r\n                {{re.bathRoom}}\r\n                <i class=\"fa fa-bath\" aria-hidden=\"true\"></i>&nbsp;\r\n                {{re.parkingSpace}}\r\n                <i class=\"fa fa-car\" aria-hidden=\"true\"></i>\r\n            </div>\r\n            <div class=\"debug\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" [attr.data-target]=\"'#modal-'+ i\">\r\n                    <span data-toggle=\"modal\" data-target=\"#\" class=\"glyphicon glyphicon-zoom-in\" aria-hidden=\"true\"></span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"modal fade\" id=\"modal-{{i}}\" role=\"dialog\">\r\n            <div class=\"modal-dialog\">\r\n                <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"col-lg-3 col-md-12 col-xs-12\"><pre style=\"text-align:left; font-size:0.8em;\">{{re | json }}</pre></div>\r\n                        <!--<pre [attr.pretty-json]=\"{{re}}\"></pre>-->\r\n                        <div class=\"col-lg-9 col-md-12 col-xs-12\" style=\"height:200%;\"><iframe [src]='sanitizer.bypassSecurityTrustResourceUrl(re.url)' style=\"width:100%; height:100%\"></iframe></div>\r\n                    </div>\r\n                    <div class=\"modal-footer\">\r\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--<pre>\r\n{{form.value | json}}\r\n    </pre>\r\n\r\n<pre>\r\n{{res | json}}\r\n    </pre>\r\n<h4>Submitted</h4>\r\n<pre>\r\n{{value | json }}\r\n    </pre>-->\r\n"

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(30);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".carousel-control.left, .carousel-control.right {\r\n    background-image: none !important;\r\n    filter: none !important;\r\n}\r\n[class*=\"col-\"] {\r\n    float: left;\r\n    vertical-align: top;\r\n}\r\nhtml, body {\r\n    height: 100%;\r\n}\r\n.fill {\r\n    min-height: 100%;\r\n    height: 100%;\r\n}\r\n.nopadding {\r\n    padding: 0 !important;\r\n    margin: 0 !important;\r\n}\r\n.re-search-form\r\n{\r\n    margin:18px;\r\n}\r\n\r\n.re-card {\r\n    border: 1px solid #e0e0e0;\r\n    margin: 3px 3px 3px 3px;\r\n    text-align: center;\r\n    background-color: white;\r\n    border-radius: 5px;\r\n    padding: 10px;\r\n}\r\n.re-image-congainer {\r\n    /*height:200px;*/\r\n}\r\n.re-image {\r\n    border: 1px solid #efefef;\r\n    margin-bottom:5px;\r\n}\r\n\r\n.re-card-details {\r\n    padding: 5px;\r\n    text-align: left;\r\n}\r\n    .re-card-details .row {\r\n        margin-top:5px;\r\n    }\r\n.re-card-glyp {\r\n    color: #8c8c8c;\r\n}\r\n    .re-card-glyp .debug {\r\n        position: absolute;\r\n        right: 0%;\r\n        margin-top: -5px;\r\n    }\r\n\r\n#myModal {\r\n    width: 100% !important;\r\n    height: 100% !important;\r\n}\r\n\r\n.modal-body {\r\n    width: 100% !important;\r\n    height: 90% !important;\r\n}\r\n\r\n.modal-content {\r\n    width: 100% !important;\r\n    height: 100% !important;\r\n}\r\n\r\n.modal-dialog {\r\n    margin: 0px 0px 0px 0px;\r\n    width: 100% !important;\r\n    height: 100% !important;\r\n}\r\n", ""]);
	
	// exports


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = require("@ngui/map");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
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
	        template: __webpack_require__(33)
	    })
	], MapComponent);
	exports.MapComponent = MapComponent;
	//# sourceMappingURL=map.component.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = "<ngui-map zoom=\"14\" center=\"Brampton, Canada\">\r\n    <marker *ngFor=\"let pos of positions\"\r\n            (click)=\"showInfoWindow($event)\"\r\n            [position]=\"pos\"></marker>\r\n</ngui-map>\r\n<button (click)=\"showRandomMarkers()\">Show Random Markers</button>\r\n<br />\r\n<button (click)=\"addMarker()\">Add Marker</button>"

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var DDLProvinceComponent = (function () {
	    function DDLProvinceComponent() {
	    }
	    return DDLProvinceComponent;
	}());
	DDLProvinceComponent = __decorate([
	    core_1.Component({
	        selector: 'ddl-province',
	        template: __webpack_require__(35)
	    })
	], DDLProvinceComponent);
	exports.DDLProvinceComponent = DDLProvinceComponent;
	//# sourceMappingURL=province.component.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = "<select class=\"form-control\">\r\n    <option selected=\"selected\" value=\"\">- ทั้งหมด -\r\n    <option value=\"กระบี่\">กระบี่</option>\r\n    <option value=\"กรุงเทพมหานคร\">กรุงเทพมหานคร</option>\r\n    <option value=\"กาญจนบุรี\">กาญจนบุรี</option>\r\n    <option value=\"กาฬสินธุ์\">กาฬสินธุ์</option>\r\n    <option value=\"กำแพงเพชร\">กำแพงเพชร</option>\r\n    <option value=\"ขอนแก่น\">ขอนแก่น</option>\r\n    <option value=\"จันทบุรี\">จันทบุรี</option>\r\n    <option value=\"ฉะเชิงเทรา\">ฉะเชิงเทรา</option>\r\n    <option value=\"ชลบุรี\">ชลบุรี</option>\r\n    <option value=\"ชัยนาท\">ชัยนาท</option>\r\n    <option value=\"ชัยภูมิ\">ชัยภูมิ</option>\r\n    <option value=\"ชุมพร\">ชุมพร</option>\r\n    <option value=\"เชียงราย\">เชียงราย</option>\r\n    <option value=\"เชียงใหม่\">เชียงใหม่</option>\r\n    <option value=\"ตรัง\">ตรัง</option>\r\n    <option value=\"ตราด\">ตราด</option>\r\n    <option value=\"ตาก\">ตาก</option>\r\n    <option value=\"นครนายก\">นครนายก</option>\r\n    <option value=\"นครปฐม\">นครปฐม</option>\r\n    <option value=\"นครพนม\">นครพนม</option>\r\n    <option value=\"นครราชสีมา\">นครราชสีมา</option>\r\n    <option value=\"นครศรีธรรมราช\">นครศรีธรรมราช</option>\r\n    <option value=\"นครสวรรค์\">นครสวรรค์</option>\r\n    <option value=\"นนทบุรี\">นนทบุรี</option>\r\n    <option value=\"นราธิวาส\">นราธิวาส</option>\r\n    <option value=\"น่าน\">น่าน</option>\r\n    <option value=\"บึงกาฬ\">บึงกาฬ</option>\r\n    <option value=\"บุรีรัมย์\">บุรีรัมย์</option>\r\n    <option value=\"ปทุมธานี\">ปทุมธานี</option>\r\n    <option value=\"ประจวบคีรีขันธ์\">ประจวบคีรีขันธ์</option>\r\n    <option value=\"ปราจีนบุรี\">ปราจีนบุรี</option>\r\n    <option value=\"ปัตตานี\">ปัตตานี</option>\r\n    <option value=\"พระนครศรีอยุธยา\">พระนครศรีอยุธยา</option>\r\n    <option value=\"พะเยา\">พะเยา</option>\r\n    <option value=\"พังงา\">พังงา</option>\r\n    <option value=\"พัทลุง\">พัทลุง</option>\r\n    <option value=\"พิจิตร\">พิจิตร</option>\r\n    <option value=\"พิษณุโลก\">พิษณุโลก</option>\r\n    <option value=\"เพชรบุรี\">เพชรบุรี</option>\r\n    <option value=\"เพชรบูรณ์\">เพชรบูรณ์</option>\r\n    <option value=\"แพร่\">แพร่</option>\r\n    <option value=\"ภูเก็ต\">ภูเก็ต</option>\r\n    <option value=\"มหาสารคาม\">มหาสารคาม</option>\r\n    <option value=\"มุกดาหาร\">มุกดาหาร</option>\r\n    <option value=\"แม่ฮ่องสอน\">แม่ฮ่องสอน</option>\r\n    <option value=\"ยโสธร\">ยโสธร</option>\r\n    <option value=\"ยะลา\">ยะลา</option>\r\n    <option value=\"ร้อยเอ็ด\">ร้อยเอ็ด</option>\r\n    <option value=\"ระนอง\">ระนอง</option>\r\n    <option value=\"ระยอง\">ระยอง</option>\r\n    <option value=\"ราชบุรี\">ราชบุรี</option>\r\n    <option value=\"ลพบุรี\">ลพบุรี</option>\r\n    <option value=\"ลำปาง\">ลำปาง</option>\r\n    <option value=\"ลำพูน\">ลำพูน</option>\r\n    <option value=\"เลย\">เลย</option>\r\n    <option value=\"ศรีสะเกษ\">ศรีสะเกษ</option>\r\n    <option value=\"สกลนคร\">สกลนคร</option>\r\n    <option value=\"สงขลา\">สงขลา</option>\r\n    <option value=\"สตูล\">สตูล</option>\r\n    <option value=\"สมุทรปราการ\">สมุทรปราการ</option>\r\n    <option value=\"สมุทรสงคราม\">สมุทรสงคราม</option>\r\n    <option value=\"สมุทรสาคร\">สมุทรสาคร</option>\r\n    <option value=\"สระแก้ว\">สระแก้ว</option>\r\n    <option value=\"สระบุรี\">สระบุรี</option>\r\n    <option value=\"สิงห์บุรี\">สิงห์บุรี</option>\r\n    <option value=\"สุโขทัย\">สุโขทัย</option>\r\n    <option value=\"สุพรรณบุรี\">สุพรรณบุรี</option>\r\n    <option value=\"สุราษฎร์ธานี\">สุราษฎร์ธานี</option>\r\n    <option value=\"สุรินทร์\">สุรินทร์</option>\r\n    <option value=\"หนองคาย\">หนองคาย</option>\r\n    <option value=\"หนองบัวลำภู\">หนองบัวลำภู</option>\r\n    <option value=\"อ่างทอง\">อ่างทอง</option>\r\n    <option value=\"อำนาจเจริญ\">อำนาจเจริญ</option>\r\n    <option value=\"อุดรธานี\">อุดรธานี</option>\r\n    <option value=\"อุตรดิตถ์\">อุตรดิตถ์</option>\r\n    <option value=\"อุทัยธานี\">อุทัยธานี</option>\r\n    <option value=\"อุบลราชธานี\">อุบลราชธานี</option>\r\n</select>\r\n\r\n<!--<select class=\"form-control\">\r\n    <option selected=\"selected\" value=\"0\">- ทั้งหมด -</option>\r\n    <option value=\"81\">กระบี่</option>\r\n    <option value=\"10\">กรุงเทพมหานคร</option>\r\n    <option value=\"71\">กาญจนบุรี</option>\r\n    <option value=\"46\">กาฬสินธุ์</option>\r\n    <option value=\"62\">กำแพงเพชร</option>\r\n    <option value=\"40\">ขอนแก่น</option>\r\n    <option value=\"22\">จันทบุรี</option>\r\n    <option value=\"24\">ฉะเชิงเทรา</option>\r\n    <option value=\"20\">ชลบุรี</option>\r\n    <option value=\"18\">ชัยนาท</option>\r\n    <option value=\"36\">ชัยภูมิ</option>\r\n    <option value=\"86\">ชุมพร</option>\r\n    <option value=\"57\">เชียงราย</option>\r\n    <option value=\"50\">เชียงใหม่</option>\r\n    <option value=\"92\">ตรัง</option>\r\n    <option value=\"23\">ตราด</option>\r\n    <option value=\"63\">ตาก</option>\r\n    <option value=\"26\">นครนายก</option>\r\n    <option value=\"73\">นครปฐม</option>\r\n    <option value=\"48\">นครพนม</option>\r\n    <option value=\"30\">นครราชสีมา</option>\r\n    <option value=\"80\">นครศรีธรรมราช</option>\r\n    <option value=\"60\">นครสวรรค์</option>\r\n    <option value=\"12\">นนทบุรี</option>\r\n    <option value=\"96\">นราธิวาส</option>\r\n    <option value=\"55\">น่าน</option>\r\n    <option value=\"38\">บึงกาฬ</option>\r\n    <option value=\"31\">บุรีรัมย์</option>\r\n    <option value=\"13\">ปทุมธานี</option>\r\n    <option value=\"77\">ประจวบคีรีขันธ์</option>\r\n    <option value=\"25\">ปราจีนบุรี</option>\r\n    <option value=\"94\">ปัตตานี</option>\r\n    <option value=\"14\">พระนครศรีอยุธยา</option>\r\n    <option value=\"56\">พะเยา</option>\r\n    <option value=\"82\">พังงา</option>\r\n    <option value=\"93\">พัทลุง</option>\r\n    <option value=\"66\">พิจิตร</option>\r\n    <option value=\"65\">พิษณุโลก</option>\r\n    <option value=\"76\">เพชรบุรี</option>\r\n    <option value=\"67\">เพชรบูรณ์</option>\r\n    <option value=\"54\">แพร่</option>\r\n    <option value=\"83\">ภูเก็ต</option>\r\n    <option value=\"44\">มหาสารคาม</option>\r\n    <option value=\"49\">มุกดาหาร</option>\r\n    <option value=\"58\">แม่ฮ่องสอน</option>\r\n    <option value=\"35\">ยโสธร</option>\r\n    <option value=\"95\">ยะลา</option>\r\n    <option value=\"45\">ร้อยเอ็ด</option>\r\n    <option value=\"85\">ระนอง</option>\r\n    <option value=\"21\">ระยอง</option>\r\n    <option value=\"70\">ราชบุรี</option>\r\n    <option value=\"16\">ลพบุรี</option>\r\n    <option value=\"52\">ลำปาง</option>\r\n    <option value=\"51\">ลำพูน</option>\r\n    <option value=\"42\">เลย</option>\r\n    <option value=\"33\">ศรีสะเกษ</option>\r\n    <option value=\"47\">สกลนคร</option>\r\n    <option value=\"90\">สงขลา</option>\r\n    <option value=\"91\">สตูล</option>\r\n    <option value=\"11\">สมุทรปราการ</option>\r\n    <option value=\"75\">สมุทรสงคราม</option>\r\n    <option value=\"74\">สมุทรสาคร</option>\r\n    <option value=\"27\">สระแก้ว</option>\r\n    <option value=\"19\">สระบุรี</option>\r\n    <option value=\"17\">สิงห์บุรี</option>\r\n    <option value=\"64\">สุโขทัย</option>\r\n    <option value=\"72\">สุพรรณบุรี</option>\r\n    <option value=\"84\">สุราษฎร์ธานี</option>\r\n    <option value=\"32\">สุรินทร์</option>\r\n    <option value=\"43\">หนองคาย</option>\r\n    <option value=\"39\">หนองบัวลำภู</option>\r\n    <option value=\"15\">อ่างทอง</option>\r\n    <option value=\"37\">อำนาจเจริญ</option>\r\n    <option value=\"41\">อุดรธานี</option>\r\n    <option value=\"53\">อุตรดิตถ์</option>\r\n    <option value=\"61\">อุทัยธานี</option>\r\n    <option value=\"34\">อุบลราชธานี</option>\r\n</select>-->"

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var DDLBankComponent = (function () {
	    function DDLBankComponent() {
	    }
	    return DDLBankComponent;
	}());
	DDLBankComponent = __decorate([
	    core_1.Component({
	        selector: 'ddl-bank',
	        template: __webpack_require__(37)
	    })
	], DDLBankComponent);
	exports.DDLBankComponent = DDLBankComponent;
	//# sourceMappingURL=bank.component.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = "<select class=\"form-control\">\r\n    <option selected=\"selected\" value=\"0\">- ทั้งหมด -</option>\r\n    <option value=\"GHB\">GHB</option>\r\n    <option value=\"GSB\">GSB</option>\r\n    <option value=\"KTB\">KTB</option>\r\n    <option value=\"SCB\">SCB</option>\r\n    <option value=\"TNB\">TNB</option>\r\n</select>"

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmJjMDEyZjc0YThmZWEwYzJjYjUiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ6b25lLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvYXBwLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvZm9ybXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50LmNzcz9kZGMzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvbmF2bWVudS9uYXZtZW51LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvbmF2bWVudS9uYXZtZW51LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50LmNzcz85ZjY0Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50LmNzcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcz83NzM4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvZmV0Y2hkYXRhL2ZldGNoZGF0YS5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvaHR0cFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9mZXRjaGRhdGEvZmV0Y2hkYXRhLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9jb3VudGVyL2NvdW50ZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9jb3VudGVyL2NvdW50ZXIuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3M/N2NiMCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZ3VpL21hcFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvbWFwLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL21hcC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvYmFuay5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9iYW5rLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0Esd0JBQXNDO0FBQ3RDLHdCQUFpQjtBQUNqQixxQ0FBK0M7QUFDL0MsbURBQXlEO0FBQ3pELDJDQUE2QztBQUU3QyxzQkFBYyxFQUFFLENBQUM7QUFDakIsS0FBTSxRQUFRLEdBQUcsd0NBQW1CLEVBQUUsQ0FBQztBQUV2QyxvQkFBeUIsTUFBVztLQUNoQyxNQUFNLENB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Q3BDQSwyVzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0EsK0NBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsK0M7Ozs7OztBQ3JCQSw2aFA7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBLCtDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLDJDOzs7Ozs7QUNyQkEsd1YiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiYmMwMTJmNzRhOGZlYTBjMmNiNSIsImltcG9ydCAnYW5ndWxhcjItdW5pdmVyc2FsLXBvbHlmaWxscyc7XG5pbXBvcnQgJ3pvbmUuanMnO1xuaW1wb3J0IHsgZW5hYmxlUHJvZE1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYXRmb3JtTm9kZUR5bmFtaWMgfSBmcm9tICdhbmd1bGFyMi11bml2ZXJzYWwnO1xuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAvYXBwLm1vZHVsZSc7XG5cbmVuYWJsZVByb2RNb2RlKCk7XG5jb25zdCBwbGF0Zm9ybSA9IHBsYXRmb3JtTm9kZUR5bmFtaWMoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHBhcmFtczogYW55KTogUHJvbWlzZTx7IGh0bWw6IHN0cmluZywgZ2xvYmFscz86IGFueSB9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdFpvbmUgPSBab25lLmN1cnJlbnQuZm9yayh7XG4gICAgICAgICAgICBuYW1lOiAnYW5ndWxhci11bml2ZXJzYWwgcmVxdWVzdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgYmFzZVVybDogJy8nLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RVcmw6IHBhcmFtcy51cmwsXG4gICAgICAgICAgICAgICAgb3JpZ2luVXJsOiBwYXJhbXMub3JpZ2luLFxuICAgICAgICAgICAgICAgIHByZWJvb3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlbmRlciBqdXN0IHRoZSA8YXBwPiBjb21wb25lbnQgaW5zdGVhZCBvZiB3cmFwcGluZyBpdCBpbnNpZGUgYW4gZXh0cmEgSFRNTCBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC8vIFdhaXRpbmcgb24gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsL2lzc3Vlcy8zNDdcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogJzwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjwvaGVhZD48Ym9keT48YXBwPjwvYXBwPjwvYm9keT48L2h0bWw+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSGFuZGxlRXJyb3I6IChwYXJlbnRab25lLCBjdXJyZW50Wm9uZSwgdGFyZ2V0Wm9uZSwgZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhbnkgZXJyb3Igb2NjdXJzIHdoaWxlIHJlbmRlcmluZyB0aGUgbW9kdWxlLCByZWplY3QgdGhlIHdob2xlIG9wZXJhdGlvblxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0Wm9uZS5ydW48UHJvbWlzZTxzdHJpbmc+PigoKSA9PiBwbGF0Zm9ybS5zZXJpYWxpemVNb2R1bGUoQXBwTW9kdWxlKSkudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoeyBodG1sOiBodG1sIH0pO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgIH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9ib290LXNlcnZlci50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyMi11bml2ZXJzYWwtcG9seWZpbGxzXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiem9uZS5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInpvbmUuanNcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGFuZ3VsYXIvY29yZVwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFuZ3VsYXIyLXVuaXZlcnNhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbFwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIHBsYXRmb3JtX2Jyb3dzZXJfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCIpO1xyXG52YXIgZm9ybXNfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9mb3Jtc1wiKTtcclxudmFyIHJvdXRlcl8xID0gcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKTtcclxudmFyIGFuZ3VsYXIyX3VuaXZlcnNhbF8xID0gcmVxdWlyZShcImFuZ3VsYXIyLXVuaXZlcnNhbFwiKTtcclxudmFyIGFwcF9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnRcIik7XHJcbnZhciBuYXZtZW51X2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50XCIpO1xyXG52YXIgaG9tZV9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudFwiKTtcclxudmFyIGZldGNoZGF0YV9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZmV0Y2hkYXRhL2ZldGNoZGF0YS5jb21wb25lbnRcIik7XHJcbnZhciBjb3VudGVyX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb3VudGVyL2NvdW50ZXIuY29tcG9uZW50XCIpO1xyXG52YXIgc2VhcmNoX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudFwiKTtcclxudmFyIG1hcF8xID0gcmVxdWlyZShcIkBuZ3VpL21hcFwiKTtcclxudmFyIG1hcF9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2VhcmNoL21hcC5jb21wb25lbnRcIik7XHJcbnZhciBwcm92aW5jZV9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudFwiKTtcclxudmFyIGJhbmtfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlYXJjaC9iYW5rLmNvbXBvbmVudFwiKTtcclxudmFyIEFwcE1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcHBNb2R1bGUoKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQXBwTW9kdWxlO1xyXG59KCkpO1xyXG5BcHBNb2R1bGUgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5OZ01vZHVsZSh7XHJcbiAgICAgICAgYm9vdHN0cmFwOiBbYXBwX2NvbXBvbmVudF8xLkFwcENvbXBvbmVudF0sXHJcbiAgICAgICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgICAgIGFwcF9jb21wb25lbnRfMS5BcHBDb21wb25lbnQsXHJcbiAgICAgICAgICAgIG5hdm1lbnVfY29tcG9uZW50XzEuTmF2TWVudUNvbXBvbmVudCxcclxuICAgICAgICAgICAgY291bnRlcl9jb21wb25lbnRfMS5Db3VudGVyQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBmZXRjaGRhdGFfY29tcG9uZW50XzEuRmV0Y2hEYXRhQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBzZWFyY2hfY29tcG9uZW50XzEuU2VhcmNoQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBob21lX2NvbXBvbmVudF8xLkhvbWVDb21wb25lbnQsXHJcbiAgICAgICAgICAgIG1hcF9jb21wb25lbnRfMS5NYXBDb21wb25lbnQsXHJcbiAgICAgICAgICAgIHByb3ZpbmNlX2NvbXBvbmVudF8xLkRETFByb3ZpbmNlQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBiYW5rX2NvbXBvbmVudF8xLkRETEJhbmtDb21wb25lbnRcclxuICAgICAgICBdLFxyXG4gICAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAgICAgcGxhdGZvcm1fYnJvd3Nlcl8xLkJyb3dzZXJNb2R1bGUsIGZvcm1zXzEuRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgICAgIG1hcF8xLk5ndWlNYXBNb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgICAgICAgICBhcGlVcmw6ICdodHRwczovL21hcHMuZ29vZ2xlLmNvbS9tYXBzL2FwaS9qcz9saWJyYXJpZXM9dmlzdWFsaXphdGlvbixwbGFjZXMsZHJhd2luZydcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGFuZ3VsYXIyX3VuaXZlcnNhbF8xLlVuaXZlcnNhbE1vZHVsZSxcclxuICAgICAgICAgICAgcm91dGVyXzEuUm91dGVyTW9kdWxlLmZvclJvb3QoW1xyXG4gICAgICAgICAgICAgICAgeyBwYXRoOiAnJywgcmVkaXJlY3RUbzogJ2hvbWUnLCBwYXRoTWF0Y2g6ICdmdWxsJyB9LFxyXG4gICAgICAgICAgICAgICAgeyBwYXRoOiAnaG9tZScsIGNvbXBvbmVudDogaG9tZV9jb21wb25lbnRfMS5Ib21lQ29tcG9uZW50IH0sXHJcbiAgICAgICAgICAgICAgICB7IHBhdGg6ICdjb3VudGVyJywgY29tcG9uZW50OiBjb3VudGVyX2NvbXBvbmVudF8xLkNvdW50ZXJDb21wb25lbnQgfSxcclxuICAgICAgICAgICAgICAgIHsgcGF0aDogJ2ZldGNoLWRhdGEnLCBjb21wb25lbnQ6IGZldGNoZGF0YV9jb21wb25lbnRfMS5GZXRjaERhdGFDb21wb25lbnQgfSxcclxuICAgICAgICAgICAgICAgIHsgcGF0aDogJ3NlYXJjaCcsIGNvbXBvbmVudDogc2VhcmNoX2NvbXBvbmVudF8xLlNlYXJjaENvbXBvbmVudCB9LFxyXG4gICAgICAgICAgICAgICAgeyBwYXRoOiAnKionLCByZWRpcmVjdFRvOiAnaG9tZScgfVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbl0sIEFwcE1vZHVsZSk7XHJcbmV4cG9ydHMuQXBwTW9kdWxlID0gQXBwTW9kdWxlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAubW9kdWxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9hcHAubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFuZ3VsYXIvZm9ybXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9mb3Jtc1wiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL3JvdXRlclwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIEFwcENvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcHBDb21wb25lbnQoKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQXBwQ29tcG9uZW50O1xyXG59KCkpO1xyXG5BcHBDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnYXBwJyxcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hcHAuY29tcG9uZW50Lmh0bWwnKSxcclxuICAgICAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL2FwcC5jb21wb25lbnQuY3NzJyldXHJcbiAgICB9KVxyXG5dLCBBcHBDb21wb25lbnQpO1xyXG5leHBvcnRzLkFwcENvbXBvbmVudCA9IEFwcENvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiXFxyXFxuPGRpdiBjbGFzcz0nY29udGFpbmVyLWZsdWlkJyBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjojMjQyNDI0OyBoZWlnaHQ6MTAwJTtcXFwiPlxcclxcbiAgICA8bmF2LW1lbnU+PC9uYXYtbWVudT5cXHJcXG4gICAgPGRpdiBjbGFzcz0ncm93Jz5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9J2NvbC1zbS0xMiBib2R5LWNvbnRlbnQnPlxcclxcbiAgICAgICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuY29tcG9uZW50LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gICAgLyogT24gc21hbGwgc2NyZWVucywgdGhlIG5hdiBtZW51IHNwYW5zIHRoZSBmdWxsIHdpZHRoIG9mIHRoZSBzY3JlZW4uIExlYXZlIGEgc3BhY2UgZm9yIGl0LiAqL1xcbiAgICAuYm9keS1jb250ZW50IHtcXG4gICAgICAgIHBhZGRpbmctdG9wOiA1MHB4O1xcbiAgICB9XFxuICAgIGJvZHl7XFxyXFxuICAgICAgICBoZWlnaHQ6MTAwJTtcXHJcXG4gICAgfVxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIE5hdk1lbnVDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmF2TWVudUNvbXBvbmVudCgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBOYXZNZW51Q29tcG9uZW50O1xyXG59KCkpO1xyXG5OYXZNZW51Q29tcG9uZW50ID0gX19kZWNvcmF0ZShbXHJcbiAgICBjb3JlXzEuQ29tcG9uZW50KHtcclxuICAgICAgICBzZWxlY3RvcjogJ25hdi1tZW51JyxcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9uYXZtZW51LmNvbXBvbmVudC5odG1sJyksXHJcbiAgICAgICAgc3R5bGVzOiBbcmVxdWlyZSgnLi9uYXZtZW51LmNvbXBvbmVudC5jc3MnKV1cclxuICAgIH0pXHJcbl0sIE5hdk1lbnVDb21wb25lbnQpO1xyXG5leHBvcnRzLk5hdk1lbnVDb21wb25lbnQgPSBOYXZNZW51Q29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXZtZW51LmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdiBjbGFzcz1cXFwibmF2YmFyIG5hdmJhci1pbnZlcnNlXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyLWZsdWlkXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm5hdmJhci1oZWFkZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibmF2YmFyLXRvZ2dsZVxcXCIgZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIiBkYXRhLXRhcmdldD1cXFwiI215TmF2YmFyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJpY29uLWJhclxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiaWNvbi1iYXJcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kXFxcIiBocmVmPVxcXCIjXFxcIj5GUkVTPC9hPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcXFwiIGlkPVxcXCJteU5hdmJhclxcXCI+XFxyXFxuICAgICAgICAgICAgPHVsIGNsYXNzPVxcXCJuYXYgbmF2YmFyLW5hdlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxsaSBbcm91dGVyTGlua0FjdGl2ZV09XFxcIlsnbGluay1hY3RpdmUnXVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XFxcIlsnL2hvbWUnXVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2dseXBoaWNvbiBnbHlwaGljb24taG9tZSc+PC9zcGFuPiBIb21lXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgIDxsaSBbcm91dGVyTGlua0FjdGl2ZV09XFxcIlsnbGluay1hY3RpdmUnXVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XFxcIlsnL3NlYXJjaCddXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2gnPjwvc3Bhbj4gU2VhcmNoXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgPC91bD5cXHJcXG4gICAgICAgICAgICA8dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVxcXCIjXFxcIj48c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXFxcIj48L3NwYW4+IFNpZ24gVXA8L2E+PC9saT5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1pblxcXCI+PC9zcGFuPiBMb2dpbjwvYT48L2xpPlxcclxcbiAgICAgICAgICAgIDwvdWw+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9uYXY+XFxyXFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uYXZtZW51LmNvbXBvbmVudC5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL25hdm1lbnUvbmF2bWVudS5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50LmNzc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgSG9tZUNvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIb21lQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEhvbWVDb21wb25lbnQ7XHJcbn0oKSk7XHJcbkhvbWVDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnaG9tZScsXHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaG9tZS5jb21wb25lbnQuaHRtbCcpLFxyXG4gICAgICAgIHN0eWxlczogW3JlcXVpcmUoJy4vaG9tZS5jb21wb25lbnQuY3NzJyldXHJcbiAgICB9KVxyXG5dLCBIb21lQ29tcG9uZW50KTtcclxuZXhwb3J0cy5Ib21lQ29tcG9uZW50ID0gSG9tZUNvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aG9tZS5jb21wb25lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImhvbWVcXFwiPlxcclxcbiAgICA8aDI+RlJFUzwvaDI+XFxyXFxuICAgIDxoND5XZWxjb21lIHRvIEZvcmVjbG9zdXJlIFJlYWwgRXN0YXRlIFNlYXJjaCBFbmdpbmU8L2g0PlxcclxcbiAgICA8YnIgLz5cXHJcXG4gICAgPHA+VGhpcyB3ZWJzaXRlIGdhdGhlciBmb3JlY2xvc3VyZSBwcm9wZXJ0aWVzIGZyb20gdmFyaW91cyBiYW5rcyBpbiBUaGFpbGFuZC48L3A+XFxyXFxuICAgIDx1bD5cXHJcXG4gICAgICAgIDxsaT48YSBocmVmPSdodHRwOi8vd3d3LmdoYmhvbWVjZW50ZXIuY29tL2doYic+R292ZXJubWVudCBIb3VzaW5nIEJhbmsgKEdIQik8L2E+PC9saT5cXHJcXG4gICAgICAgIDxsaT48YSBocmVmPSdodHRwOi8vcHJvcGVydGllcy5nc2Iub3IudGgvJz5Hb3Zlcm5tZW50IFNhdmluZ3MgQmFuayAoR1NCKTwvYT48L2xpPlxcclxcbiAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHA6Ly93d3cubnBhc2hvd3Jvb20ua3RiLmNvLnRoL1dlYlNob3dSb29tL1NlYXJjaFNlcnZsZXQnPktydW5nIFRoYWkgQmFuayAoS1RCKTwvYT48L2xpPlxcclxcbiAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHA6Ly93d3cuYnV5YXRzaWFtLmNvbS8nPlNpYW0gQ29tbWVyY2lhbCBCYW5rIChTQ0IpPC9hPjwvbGk+XFxyXFxuICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL3d3dy50aGFuYWNoYXJ0bnBhLmNvbS8nPlRoYW5hY2hhcnQgQmFuazwvYT48L2xpPlxcclxcbiAgICA8L3VsPlxcclxcbiAgICA8YnIgLz5cXHJcXG4gICAgPGg0PlRlY2hub2xvZ3kgVXNlZCBpbiB0aGUgd2Vic2l0ZTwvaDQ+XFxyXFxuICAgIDx1bD5cXHJcXG4gICAgICAgIDxsaT4uTmV0IENvcmU8L2xpPlxcclxcbiAgICAgICAgPGxpPkFuZ3VsYXJKUzwvbGk+XFxyXFxuICAgICAgICA8bGk+Qm9vdHN0cmFwPC9saT5cXHJcXG4gICAgICAgIDxsaT5BenVyZSBDb3Ntb3MgREI8L2xpPlxcclxcbiAgICAgICAgPGxpPkF6dXJlIENETjwvbGk+XFxyXFxuICAgIDwvdWw+XFxyXFxuICAgIDxiciAvPlxcclxcbiAgICA8aDQ+SG93IGRvIEkgZ2F0aGVyIGFsbCB0aGUgcHJvcGVydGllczwvaDQ+XFxyXFxuICAgIDxwPlxcclxcbiAgICAgICAgSSBiYXNpY2FsbHkgZG93bmxvYWQgY29udGVudCBpbiBIVE1MIGZvciBtYXQgZnJvbSBlYWNoIHdlYnNpdGVzLlxcclxcbiAgICAgICAgSFRNTCBpcyB0aGVuIHRyYW5zZm9ybWVkIGludG8ganNvbiBmb3JtYXQuXFxyXFxuICAgICAgICBUaGUgY2hhbGxlbmdlcyBhcmUgdGhhdCBlYWNoIHdlYnNpdGUgaGFzIHRoZWlyIG93biBuYXZpZ2F0aW9uIHN5c3RlbSBhbmQgSFRNTCBzdHJ1Y3R1cmUuXFxyXFxuICAgICAgICBBZnRlciB0aGF0LCB0aGUgbG9jYXRpb25zIChsYXQsIGxvbikgaXMgcmV0cmlldmVkIGJ5IHNlbGVuaXVtIGZyb21cXHJcXG4gICAgICAgIDxhIGhyZWY9J2h0dHA6Ly9kb2x3bXMuZG9sLmdvLnRoL3R2d2VicC8nPmxhbmRtYXA8L2E+XFxyXFxuICAgIDwvcD5cXHJcXG4gICAgPHVsPlxcclxcbiAgICAgICAgPGxpPi5OZXQgRnJhbWV3b3JrIDQuNjwvbGk+XFxyXFxuICAgICAgICA8bGk+U1FMIENFICsgRW50aXR5IEZyYW1ld29yazwvbGk+XFxyXFxuICAgICAgICA8bGk+SFRNTCBBZ2lsaXR5IFBhY2s8L2xpPlxcclxcbiAgICAgICAgPGxpPlNlbGVuaXVtPC9saT5cXHJcXG4gICAgICAgIDxsaT5Mb3Qgb2YgcmVndWxhciBleHByZXNzaW9uczwvbGk+XFxyXFxuICAgIDwvdWw+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9ob21lLmNvbXBvbmVudC5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuaG9tZSB7XFxyXFxuICAgIGNvbG9yOiAjOTg5ODk4O1xcclxcbn1cXHJcXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIGh0dHBfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9odHRwXCIpO1xyXG52YXIgRmV0Y2hEYXRhQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEZldGNoRGF0YUNvbXBvbmVudChodHRwKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBodHRwLmdldCgnL2FwaS9SZWFsRXN0YXRlL0dldEFsbCcpLnN1YnNjcmliZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlcyA9IHJlc3VsdC5qc29uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRmV0Y2hEYXRhQ29tcG9uZW50O1xyXG59KCkpO1xyXG5GZXRjaERhdGFDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnZmV0Y2hkYXRhJyxcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9mZXRjaGRhdGEuY29tcG9uZW50Lmh0bWwnKVxyXG4gICAgfSksXHJcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW2h0dHBfMS5IdHRwXSlcclxuXSwgRmV0Y2hEYXRhQ29tcG9uZW50KTtcclxuZXhwb3J0cy5GZXRjaERhdGFDb21wb25lbnQgPSBGZXRjaERhdGFDb21wb25lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZldGNoZGF0YS5jb21wb25lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvZmV0Y2hkYXRhL2ZldGNoZGF0YS5jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbmd1bGFyL2h0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9odHRwXCJcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJcXHJcXG48aDE+TGlzdDwvaDE+XFxyXFxuPHAgKm5nSWY9XFxcIiFyZXNcXFwiPlxcclxcbiAgICA8ZW0+TG9hZGluZy4uLjwvZW0+XFxyXFxuPC9wPlxcclxcbjxkaXYgY2xhc3NOYW1lPVxcXCJjb2wtbGctNiBjb2wteHMtNlxcXCIgKm5nRm9yPVxcXCJsZXQgcmUgb2YgcmVzXFxcIj5cXHJcXG4gICAgPCEtLTxkaXYgY2xhc3NOYW1lPVxcXCJjYXJkLWltYWdlXFxcIj48aW1nIHNyYz1cXFwie3tyZS5pbWFnZXNbMF19fVxcXCIgLz48L2Rpdj4tLT5cXHJcXG4gICAgPGRpdiBjbGFzc05hbWU9XFxcImluZm9cXFwiPlxcclxcbiAgICAgICAgPGRpdj57e3JlLmNvZGV9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8YSBocmVmPXt7cmUudXJsfX0+e3tyZS5zb3VyY2V9fTwvYT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLm5hbWV9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLnByaWNlfX08L2Rpdj5cXHJcXG4gICAgICAgIDxkaXY+e3tyZS5zaXplVG90YWx9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLnNpemVUb3RhbFVuaXR9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLnNpemVUb3RhbFRleHR9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLmJcXHJcXG4gICAgICAgIDxkaXY+e3tyZS5iZWRSb29tfX08L2Rpdj5cXHJcXG4gICAgICAgIDxkaXY+e3tyZS5iYXRoUm9vbX19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUuc3RvcmV5c319PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUucGFya2luZ1NwYWNlfX08L2Rpdj5cXHJcXG4gICAgICAgIDxkaXY+e3tyZS5kZXNjfX08L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXFxyXFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9mZXRjaGRhdGEvZmV0Y2hkYXRhLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29yZV8xID0gcmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIik7XHJcbnZhciBDb3VudGVyQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvdW50ZXJDb21wb25lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q291bnQgPSAwO1xyXG4gICAgfVxyXG4gICAgQ291bnRlckNvbXBvbmVudC5wcm90b3R5cGUuaW5jcmVtZW50Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRDb3VudCsrO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb3VudGVyQ29tcG9uZW50O1xyXG59KCkpO1xyXG5Db3VudGVyQ29tcG9uZW50ID0gX19kZWNvcmF0ZShbXHJcbiAgICBjb3JlXzEuQ29tcG9uZW50KHtcclxuICAgICAgICBzZWxlY3RvcjogJ2NvdW50ZXInLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2NvdW50ZXIuY29tcG9uZW50Lmh0bWwnKVxyXG4gICAgfSlcclxuXSwgQ291bnRlckNvbXBvbmVudCk7XHJcbmV4cG9ydHMuQ291bnRlckNvbXBvbmVudCA9IENvdW50ZXJDb21wb25lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvdW50ZXIuY29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2NvdW50ZXIvY291bnRlci5jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8aDI+Q291bnRlcjwvaDI+XFxuXFxuPHA+VGhpcyBpcyBhIHNpbXBsZSBleGFtcGxlIG9mIGFuIEFuZ3VsYXIgMiBjb21wb25lbnQuPC9wPlxcblxcbjxwPkN1cnJlbnQgY291bnQ6IDxzdHJvbmc+e3sgY3VycmVudENvdW50IH19PC9zdHJvbmc+PC9wPlxcblxcbjxidXR0b24gKGNsaWNrKT1cXFwiaW5jcmVtZW50Q291bnRlcigpXFxcIj5JbmNyZW1lbnQ8L2J1dHRvbj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2NvdW50ZXIvY291bnRlci5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIGh0dHBfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9odHRwXCIpO1xyXG52YXIgcGxhdGZvcm1fYnJvd3Nlcl8xID0gcmVxdWlyZShcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIik7XHJcbnZhciBTZWFyY2hDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU2VhcmNoQ29tcG9uZW50KGh0dHAsIHNhbml0aXplcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcclxuICAgICAgICB0aGlzLnNhbml0aXplciA9IHNhbml0aXplcjtcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KCcvYXBpL3JlYWxlc3RhdGUvYWxsJykuc3Vic2NyaWJlKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgX3RoaXMucmVzID0gcmVzdWx0Lmpzb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFNlYXJjaENvbXBvbmVudC5wcm90b3R5cGUuZ2V0QXJyYXlMZW5ndGggPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBlbHNlIGlmICh2YWwubGVuZ3RoIDwgMilcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICB9O1xyXG4gICAgU2VhcmNoQ29tcG9uZW50LnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuUHJpY2VNYXggPSAodGhpcy5wYXJhbXMuUHJpY2VNYXggPT09IHVuZGVmaW5lZCB8fCB0aGlzLnBhcmFtcy5QcmljZU1heCA9PSBudWxsKSA/IDAgOiB0aGlzLnBhcmFtcy5QcmljZU1heDtcclxuICAgICAgICB0aGlzLnBhcmFtcy5QcmljZU1pbiA9ICh0aGlzLnBhcmFtcy5QcmljZU1pbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucGFyYW1zLlByaWNlTWluID09IG51bGwpID8gMCA6IHRoaXMucGFyYW1zLlByaWNlTWluO1xyXG4gICAgICAgIHZhciBib2R5ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJhbXMpO1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IGh0dHBfMS5IZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBodHRwXzEuUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KCcvYXBpL3JlYWxlc3RhdGUvc2VhcmNoJywgYm9keSwgb3B0aW9ucykuc3Vic2NyaWJlKGZ1bmN0aW9uIChyZXN1bHQpIHsgX3RoaXMucmVzID0gcmVzdWx0Lmpzb24oKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNlYXJjaENvbXBvbmVudDtcclxufSgpKTtcclxuU2VhcmNoQ29tcG9uZW50ID0gX19kZWNvcmF0ZShbXHJcbiAgICBjb3JlXzEuQ29tcG9uZW50KHtcclxuICAgICAgICBzZWxlY3RvcjogJ3NlYXJjaCcsXHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vc2VhcmNoLmNvbXBvbmVudC5odG1sJyksXHJcbiAgICAgICAgc3R5bGVzOiBbcmVxdWlyZSgnLi9zZWFyY2guY29tcG9uZW50LmNzcycpXSxcclxuICAgIH0pLFxyXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtodHRwXzEuSHR0cCwgcGxhdGZvcm1fYnJvd3Nlcl8xLkRvbVNhbml0aXplcl0pXHJcbl0sIFNlYXJjaENvbXBvbmVudCk7XHJcbmV4cG9ydHMuU2VhcmNoQ29tcG9uZW50ID0gU2VhcmNoQ29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZWFyY2guY29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiXFxyXFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgPGZvcm0gI2Zvcm09XFxcIm5nRm9ybVxcXCIgKG5nU3VibWl0KT1cXFwic3VibWl0KGZvcm0udmFsdWUpXFxcIiBjbGFzcz1cXFwiZm9ybS1ncm91cCByb3cgcmUtc2VhcmNoLWZvcm0gXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0xIGNvbC1sZzEyIG5vcGFkZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIlByaWNlTWluXFxcIiBuZ01vZGVsIGlkPVxcXCJQcmljZU1pblxcXCIgcGxhY2Vob2xkZXI9XFxcIk1pblxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0xIGNvbC1sZzEyIG5vcGFkZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIlByaWNlTWF4XFxcIiBuZy1pbml0PVxcXCIwXFxcIiBuZ01vZGVsIGlkPVxcXCJQcmljZU1heFxcXCIgcGxhY2Vob2xkZXI9XFxcIk1heFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0yIGNvbC1sZzEyIG5vcGFkZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRkbC1iYW5rIG5hbWU9XFxcIlNvdXJjZVxcXCIgbmdNb2RlbCBpZD1cXFwiU291cmNlXFxcIiBuZ0RlZmF1bHRDb250cm9sPjwvZGRsLWJhbms+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0yIGNvbC1sZzEyIG5vcGFkZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRkbC1wcm92aW5jZSBuYW1lPVxcXCJQcm92aW5jZVxcXCIgbmdNb2RlbCBpZD1cXFwiUHJvdmluY2VcXFwiIG5nRGVmYXVsdENvbnRyb2w+PC9kZGwtcHJvdmluY2U+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1pbmZvXFxcIj48c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2hcXFwiPjwvc3Bhbj48L2J1dHRvbj5cXHJcXG4gICAgPC9mb3JtPlxcclxcbjwvZGl2PlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiBjb2wtbGctNyByZS1jYXJkXFxcIiAqbmdGb3I9XFxcImxldCByZSBvZiByZXM7IGxldCBpID0gaW5kZXhcXFwiIFthdHRyLmRhdGEtaW5kZXhdPVxcXCJpXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicmUtaW1hZ2UtY29udGFpbmVyIGNvbC1sZy05IGNvbC1tZC05XFxcIj5cXHJcXG4gICAgICAgIDxpbWcgKm5nSWY9XFxcImdldEFycmF5TGVuZ3RoKHJlLmltYWdlcykgPT0gMFxcXCIgc3JjPVxcXCIvSW1hZ2VzL2RlZmF1bHQtdGh1bWJuYWlsLmpwZ1xcXCIgY2xhc3M9XFxcInJlLWltYWdlIGltZy1yZXNwb25zaXZlXFxcIiAvPlxcclxcbiAgICAgICAgPGRpdiBpZD1cXFwiY2Fyb3VzZWwte3tpfX1cXFwiIGNsYXNzPVxcXCJjYXJvdXNlbCBzbGlkZVxcXCIgZGF0YS1yaWRlPVxcXCJjYXJvdXNlbFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2Fyb3VzZWwtaW5uZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVte3tqID09IDAgPyAnIGFjdGl2ZScgOiAnJ319XFxcIiAqbmdGb3I9XFxcImxldCBpbWFnZSBvZiByZS5pbWFnZXM7IGxldCBqID0gaW5kZXhcXFwiIFthdHRyLmRhdGEtaW5kZXhdPVxcXCJqXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJ7e2ltYWdlfX1cXFwiIGNsYXNzPVxcXCJyZS1pbWFnZSBpbWctcmVzcG9uc2l2ZVxcXCIgZmFsbGJhY2stc3JjPVxcXCIvSW1hZ2VzL2RlZmF1bHQtdGh1bWJuYWlsLmpwZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxhICpuZ0lmPVxcXCJnZXRBcnJheUxlbmd0aChyZS5pbWFnZXMpID4gMVxcXCIgY2xhc3M9XFxcImxlZnQgY2Fyb3VzZWwtY29udHJvbFxcXCIgaHJlZj1cXFwiI2Nhcm91c2VsLXt7aX19XFxcIiBkYXRhLXNsaWRlPVxcXCJwcmV2XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5QcmV2aW91czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgPGEgKm5nSWY9XFxcImdldEFycmF5TGVuZ3RoKHJlLmltYWdlcykgPiAxXFxcIiBjbGFzcz1cXFwicmlnaHQgY2Fyb3VzZWwtY29udHJvbFxcXCIgaHJlZj1cXFwiI2Nhcm91c2VsLXt7aX19XFxcIiBkYXRhLXNsaWRlPVxcXCJuZXh0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+TmV4dDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJlLWNhcmQtZGV0YWlscyBmaWxsIGNvbC1sZy0zIGNvbC1tZC0zXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgc3R5bGU9XFxcIiBjb2xvcjojNTg1ODU4O1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj57e3JlLnByaWNlIHwgbnVtYmVyfX08L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPnt7cmUubWFwLnByb3ZpbmNlfX08L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiIHN0eWxlPVxcXCJmb250LXNpemU6MC44ZW07IGNvbG9yOiM4YzhjOGM7XFxcIj57e3JlLnNpemVUb3RhbCArIFxcXCIgXFxcIiArIHJlLnNpemVUb3RhbFVuaXR9fTwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCIgc3R5bGU9XFxcImZvbnQtc2l6ZTowLjhlbTsgY29sb3I6IzhjOGM4YztcXFwiPnt7cmUubWFwLmRlc2N9fTwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCIgc3R5bGU9XFxcImZvbnQtc2l6ZTowLjhlbTsgY29sb3I6IzhjOGM4YztcXFwiPnt7cmUuYmVkfX08L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHJlLWNhcmQtZ2x5cFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cXFwicmUuYmVkUm9vbVxcXCIgY2xhc3M9XFxcImNvbC1sZy0xMiBjb2wteHMtMTJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICB7e3JlLmJlZFJvb219fVxcclxcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYmVkXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9pPiZuYnNwO1xcclxcbiAgICAgICAgICAgICAgICB7e3JlLmJhdGhSb29tfX1cXHJcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWJhdGhcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+Jm5ic3A7XFxyXFxuICAgICAgICAgICAgICAgIHt7cmUucGFya2luZ1NwYWNlfX1cXHJcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNhclxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvaT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZWJ1Z1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBkYXRhLXRvZ2dsZT1cXFwibW9kYWxcXFwiIFthdHRyLmRhdGEtdGFyZ2V0XT1cXFwiJyNtb2RhbC0nKyBpXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtdG9nZ2xlPVxcXCJtb2RhbFxcXCIgZGF0YS10YXJnZXQ9XFxcIiNcXFwiIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIiBpZD1cXFwibW9kYWwte3tpfX1cXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiPiZ0aW1lczs8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLWxnLTMgY29sLW1kLTEyIGNvbC14cy0xMlxcXCI+PHByZSBzdHlsZT1cXFwidGV4dC1hbGlnbjpsZWZ0OyBmb250LXNpemU6MC44ZW07XFxcIj57e3JlIHwganNvbiB9fTwvcHJlPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08cHJlIFthdHRyLnByZXR0eS1qc29uXT1cXFwie3tyZX19XFxcIj48L3ByZT4tLT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctOSBjb2wtbWQtMTIgY29sLXhzLTEyXFxcIiBzdHlsZT1cXFwiaGVpZ2h0OjIwMCU7XFxcIj48aWZyYW1lIFtzcmNdPSdzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHJlLnVybCknIHN0eWxlPVxcXCJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJVxcXCI+PC9pZnJhbWU+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiPkNsb3NlPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPCEtLTxwcmU+XFxyXFxue3tmb3JtLnZhbHVlIHwganNvbn19XFxyXFxuICAgIDwvcHJlPlxcclxcblxcclxcbjxwcmU+XFxyXFxue3tyZXMgfCBqc29ufX1cXHJcXG4gICAgPC9wcmU+XFxyXFxuPGg0PlN1Ym1pdHRlZDwvaDQ+XFxyXFxuPHByZT5cXHJcXG57e3ZhbHVlIHwganNvbiB9fVxcclxcbiAgICA8L3ByZT4tLT5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2guY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zZWFyY2guY29tcG9uZW50LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY2Fyb3VzZWwtY29udHJvbC5sZWZ0LCAuY2Fyb3VzZWwtY29udHJvbC5yaWdodCB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmUgIWltcG9ydGFudDtcXHJcXG4gICAgZmlsdGVyOiBub25lICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcbltjbGFzcyo9XFxcImNvbC1cXFwiXSB7XFxyXFxuICAgIGZsb2F0OiBsZWZ0O1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbn1cXHJcXG5odG1sLCBib2R5IHtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG4uZmlsbCB7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuLm5vcGFkZGluZyB7XFxyXFxuICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcXHJcXG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcbi5yZS1zZWFyY2gtZm9ybVxcclxcbntcXHJcXG4gICAgbWFyZ2luOjE4cHg7XFxyXFxufVxcclxcblxcclxcbi5yZS1jYXJkIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcXHJcXG4gICAgbWFyZ2luOiAzcHggM3B4IDNweCAzcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuLnJlLWltYWdlLWNvbmdhaW5lciB7XFxyXFxuICAgIC8qaGVpZ2h0OjIwMHB4OyovXFxyXFxufVxcclxcbi5yZS1pbWFnZSB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmUtY2FyZC1kZXRhaWxzIHtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG4gICAgLnJlLWNhcmQtZGV0YWlscyAucm93IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6NXB4O1xcclxcbiAgICB9XFxyXFxuLnJlLWNhcmQtZ2x5cCB7XFxyXFxuICAgIGNvbG9yOiAjOGM4YzhjO1xcclxcbn1cXHJcXG4gICAgLnJlLWNhcmQtZ2x5cCAuZGVidWcge1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgcmlnaHQ6IDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiNteU1vZGFsIHtcXHJcXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1ib2R5IHtcXHJcXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXHJcXG4gICAgaGVpZ2h0OiA5MCUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRlbnQge1xcclxcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcclxcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWRpYWxvZyB7XFxyXFxuICAgIG1hcmdpbjogMHB4IDBweCAwcHggMHB4O1xcclxcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcclxcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmd1aS9tYXBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAbmd1aS9tYXBcIlxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgTWFwQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1hcENvbXBvbmVudCgpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xyXG4gICAgfVxyXG4gICAgTWFwQ29tcG9uZW50LnByb3RvdHlwZS5zaG93UmFuZG9tTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmFuZG9tTGF0LCByYW5kb21Mbmc7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICByYW5kb21MYXQgPSBNYXRoLnJhbmRvbSgpICogMC4wMDk5ICsgNDMuNzI1MDtcclxuICAgICAgICAgICAgcmFuZG9tTG5nID0gTWF0aC5yYW5kb20oKSAqIDAuMDA5OSArIC03OS43Njk5O1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKFtyYW5kb21MYXQsIHJhbmRvbUxuZ10pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNYXBDb21wb25lbnQucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmFuZG9tTGF0ID0gTWF0aC5yYW5kb20oKSAqIDAuMDA5OSArIDQzLjcyNTA7XHJcbiAgICAgICAgdmFyIHJhbmRvbUxuZyA9IE1hdGgucmFuZG9tKCkgKiAwLjAwOTkgKyAtNzkuNzY5OTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKFtyYW5kb21MYXQsIHJhbmRvbUxuZ10pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNYXBDb21wb25lbnQ7XHJcbn0oKSk7XHJcbk1hcENvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdteS1hcHAnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21hcC5jb21wb25lbnQuaHRtbCcpXHJcbiAgICB9KVxyXG5dLCBNYXBDb21wb25lbnQpO1xyXG5leHBvcnRzLk1hcENvbXBvbmVudCA9IE1hcENvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvbWFwLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuZ3VpLW1hcCB6b29tPVxcXCIxNFxcXCIgY2VudGVyPVxcXCJCcmFtcHRvbiwgQ2FuYWRhXFxcIj5cXHJcXG4gICAgPG1hcmtlciAqbmdGb3I9XFxcImxldCBwb3Mgb2YgcG9zaXRpb25zXFxcIlxcclxcbiAgICAgICAgICAgIChjbGljayk9XFxcInNob3dJbmZvV2luZG93KCRldmVudClcXFwiXFxyXFxuICAgICAgICAgICAgW3Bvc2l0aW9uXT1cXFwicG9zXFxcIj48L21hcmtlcj5cXHJcXG48L25ndWktbWFwPlxcclxcbjxidXR0b24gKGNsaWNrKT1cXFwic2hvd1JhbmRvbU1hcmtlcnMoKVxcXCI+U2hvdyBSYW5kb20gTWFya2VyczwvYnV0dG9uPlxcclxcbjxiciAvPlxcclxcbjxidXR0b24gKGNsaWNrKT1cXFwiYWRkTWFya2VyKClcXFwiPkFkZCBNYXJrZXI8L2J1dHRvbj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9tYXAuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIERETFByb3ZpbmNlQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERETFByb3ZpbmNlQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERETFByb3ZpbmNlQ29tcG9uZW50O1xyXG59KCkpO1xyXG5ERExQcm92aW5jZUNvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdkZGwtcHJvdmluY2UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3Byb3ZpbmNlLmNvbXBvbmVudC5odG1sJylcclxuICAgIH0pXHJcbl0sIERETFByb3ZpbmNlQ29tcG9uZW50KTtcclxuZXhwb3J0cy5ERExQcm92aW5jZUNvbXBvbmVudCA9IERETFByb3ZpbmNlQ29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm92aW5jZS5jb21wb25lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzZWxlY3QgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgIDxvcHRpb24gc2VsZWN0ZWQ9XFxcInNlbGVjdGVkXFxcIiB2YWx1ZT1cXFwiXFxcIj4tIOC4l+C4seC5ieC4h+C4q+C4oeC4lCAtXFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4o+C4sOC4muC4teC5iFxcXCI+4LiB4Lij4Liw4Lia4Li14LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4o+C4uOC4h+C5gOC4l+C4nuC4oeC4q+C4suC4meC4hOC4o1xcXCI+4LiB4Lij4Li44LiH4LmA4LiX4Lie4Lih4Lir4Liy4LiZ4LiE4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4suC4jeC4iOC4meC4muC4uOC4o+C4tVxcXCI+4LiB4Liy4LiN4LiI4LiZ4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4suC4rOC4quC4tOC4meC4mOC4uOC5jFxcXCI+4LiB4Liy4Lis4Liq4Li04LiZ4LiY4Li44LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4s+C5geC4nuC4h+C5gOC4nuC4iuC4o1xcXCI+4LiB4Liz4LmB4Lie4LiH4LmA4Lie4LiK4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4guC4reC4meC5geC4geC5iOC4mVxcXCI+4LiC4Lit4LiZ4LmB4LiB4LmI4LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iOC4seC4meC4l+C4muC4uOC4o+C4tVxcXCI+4LiI4Lix4LiZ4LiX4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4ieC4sOC5gOC4iuC4tOC4h+C5gOC4l+C4o+C4slxcXCI+4LiJ4Liw4LmA4LiK4Li04LiH4LmA4LiX4Lij4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4peC4muC4uOC4o+C4tVxcXCI+4LiK4Lil4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4seC4ouC4meC4suC4l1xcXCI+4LiK4Lix4Lii4LiZ4Liy4LiXPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4seC4ouC4oOC4ueC4oeC4tFxcXCI+4LiK4Lix4Lii4Lig4Li54Lih4Li0PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4uOC4oeC4nuC4o1xcXCI+4LiK4Li44Lih4Lie4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4iuC4teC4ouC4h+C4o+C4suC4olxcXCI+4LmA4LiK4Li14Lii4LiH4Lij4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4iuC4teC4ouC4h+C5g+C4q+C4oeC5iFxcXCI+4LmA4LiK4Li14Lii4LiH4LmD4Lir4Lih4LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4leC4o+C4seC4h1xcXCI+4LiV4Lij4Lix4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4leC4o+C4suC4lFxcXCI+4LiV4Lij4Liy4LiUPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4leC4suC4gVxcXCI+4LiV4Liy4LiBPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4meC4suC4ouC4gVxcXCI+4LiZ4LiE4Lij4LiZ4Liy4Lii4LiBPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4m+C4kOC4oVxcXCI+4LiZ4LiE4Lij4Lib4LiQ4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4nuC4meC4oVxcXCI+4LiZ4LiE4Lij4Lie4LiZ4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4o+C4suC4iuC4quC4teC4oeC4slxcXCI+4LiZ4LiE4Lij4Lij4Liy4LiK4Liq4Li14Lih4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4qOC4o+C4teC4mOC4o+C4o+C4oeC4o+C4suC4ilxcXCI+4LiZ4LiE4Lij4Lio4Lij4Li14LiY4Lij4Lij4Lih4Lij4Liy4LiKPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4quC4p+C4o+C4o+C4hOC5jFxcXCI+4LiZ4LiE4Lij4Liq4Lin4Lij4Lij4LiE4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4meC4l+C4muC4uOC4o+C4tVxcXCI+4LiZ4LiZ4LiX4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4o+C4suC4mOC4tOC4p+C4suC4qlxcXCI+4LiZ4Lij4Liy4LiY4Li04Lin4Liy4LiqPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC5iOC4suC4mVxcXCI+4LiZ4LmI4Liy4LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4muC4tuC4h+C4geC4suC4rFxcXCI+4Lia4Li24LiH4LiB4Liy4LisPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4muC4uOC4o+C4teC4o+C4seC4oeC4ouC5jFxcXCI+4Lia4Li44Lij4Li14Lij4Lix4Lih4Lii4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4l+C4uOC4oeC4mOC4suC4meC4tVxcXCI+4Lib4LiX4Li44Lih4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4o+C4sOC4iOC4p+C4muC4hOC4teC4o+C4teC4guC4seC4meC4mOC5jFxcXCI+4Lib4Lij4Liw4LiI4Lin4Lia4LiE4Li14Lij4Li14LiC4Lix4LiZ4LiY4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4o+C4suC4iOC4teC4meC4muC4uOC4o+C4tVxcXCI+4Lib4Lij4Liy4LiI4Li14LiZ4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4seC4leC4leC4suC4meC4tVxcXCI+4Lib4Lix4LiV4LiV4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4o+C4sOC4meC4hOC4o+C4qOC4o+C4teC4reC4ouC4uOC4mOC4ouC4slxcXCI+4Lie4Lij4Liw4LiZ4LiE4Lij4Lio4Lij4Li14Lit4Lii4Li44LiY4Lii4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4sOC5gOC4ouC4slxcXCI+4Lie4Liw4LmA4Lii4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4seC4h+C4h+C4slxcXCI+4Lie4Lix4LiH4LiH4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4seC4l+C4peC4uOC4h1xcXCI+4Lie4Lix4LiX4Lil4Li44LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4tOC4iOC4tOC4leC4o1xcXCI+4Lie4Li04LiI4Li04LiV4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4tOC4qeC4k+C4uOC5guC4peC4gVxcXCI+4Lie4Li04Lip4LiT4Li44LmC4Lil4LiBPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4nuC4iuC4o+C4muC4uOC4o+C4tVxcXCI+4LmA4Lie4LiK4Lij4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4nuC4iuC4o+C4muC4ueC4o+C4k+C5jFxcXCI+4LmA4Lie4LiK4Lij4Lia4Li54Lij4LiT4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5geC4nuC4o+C5iFxcXCI+4LmB4Lie4Lij4LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4oOC4ueC5gOC4geC5h+C4lVxcXCI+4Lig4Li54LmA4LiB4LmH4LiVPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4oeC4q+C4suC4quC4suC4o+C4hOC4suC4oVxcXCI+4Lih4Lir4Liy4Liq4Liy4Lij4LiE4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4oeC4uOC4geC4lOC4suC4q+C4suC4o1xcXCI+4Lih4Li44LiB4LiU4Liy4Lir4Liy4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5geC4oeC5iOC4ruC5iOC4reC4h+C4quC4reC4mVxcXCI+4LmB4Lih4LmI4Liu4LmI4Lit4LiH4Liq4Lit4LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4ouC5guC4quC4mOC4o1xcXCI+4Lii4LmC4Liq4LiY4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4ouC4sOC4peC4slxcXCI+4Lii4Liw4Lil4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C5ieC4reC4ouC5gOC4reC5h+C4lFxcXCI+4Lij4LmJ4Lit4Lii4LmA4Lit4LmH4LiUPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C4sOC4meC4reC4h1xcXCI+4Lij4Liw4LiZ4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C4sOC4ouC4reC4h1xcXCI+4Lij4Liw4Lii4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C4suC4iuC4muC4uOC4o+C4tVxcXCI+4Lij4Liy4LiK4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4peC4nuC4muC4uOC4o+C4tVxcXCI+4Lil4Lie4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4peC4s+C4m+C4suC4h1xcXCI+4Lil4Liz4Lib4Liy4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4peC4s+C4nuC4ueC4mVxcXCI+4Lil4Liz4Lie4Li54LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4peC4olxcXCI+4LmA4Lil4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4qOC4o+C4teC4quC4sOC5gOC4geC4qVxcXCI+4Lio4Lij4Li14Liq4Liw4LmA4LiB4LipPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4geC4peC4meC4hOC4o1xcXCI+4Liq4LiB4Lil4LiZ4LiE4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4h+C4guC4peC4slxcXCI+4Liq4LiH4LiC4Lil4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4leC4ueC4pVxcXCI+4Liq4LiV4Li54LilPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4oeC4uOC4l+C4o+C4m+C4o+C4suC4geC4suC4o1xcXCI+4Liq4Lih4Li44LiX4Lij4Lib4Lij4Liy4LiB4Liy4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4oeC4uOC4l+C4o+C4quC4h+C4hOC4o+C4suC4oVxcXCI+4Liq4Lih4Li44LiX4Lij4Liq4LiH4LiE4Lij4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4oeC4uOC4l+C4o+C4quC4suC4hOC4o1xcXCI+4Liq4Lih4Li44LiX4Lij4Liq4Liy4LiE4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4o+C4sOC5geC4geC5ieC4p1xcXCI+4Liq4Lij4Liw4LmB4LiB4LmJ4LinPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4o+C4sOC4muC4uOC4o+C4tVxcXCI+4Liq4Lij4Liw4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4tOC4h+C4q+C5jOC4muC4uOC4o+C4tVxcXCI+4Liq4Li04LiH4Lir4LmM4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC5guC4guC4l+C4seC4olxcXCI+4Liq4Li44LmC4LiC4LiX4Lix4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC4nuC4o+C4o+C4k+C4muC4uOC4o+C4tVxcXCI+4Liq4Li44Lie4Lij4Lij4LiT4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC4o+C4suC4qeC4juC4o+C5jOC4mOC4suC4meC4tVxcXCI+4Liq4Li44Lij4Liy4Lip4LiO4Lij4LmM4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC4o+C4tOC4meC4l+C4o+C5jFxcXCI+4Liq4Li44Lij4Li04LiZ4LiX4Lij4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4q+C4meC4reC4h+C4hOC4suC4olxcXCI+4Lir4LiZ4Lit4LiH4LiE4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4q+C4meC4reC4h+C4muC4seC4p+C4peC4s+C4oOC4uVxcXCI+4Lir4LiZ4Lit4LiH4Lia4Lix4Lin4Lil4Liz4Lig4Li5PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC5iOC4suC4h+C4l+C4reC4h1xcXCI+4Lit4LmI4Liy4LiH4LiX4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4s+C4meC4suC4iOC5gOC4iOC4o+C4tOC4jVxcXCI+4Lit4Liz4LiZ4Liy4LiI4LmA4LiI4Lij4Li04LiNPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4lOC4o+C4mOC4suC4meC4tVxcXCI+4Lit4Li44LiU4Lij4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4leC4o+C4lOC4tOC4leC4luC5jFxcXCI+4Lit4Li44LiV4Lij4LiU4Li04LiV4LiW4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4l+C4seC4ouC4mOC4suC4meC4tVxcXCI+4Lit4Li44LiX4Lix4Lii4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4muC4peC4o+C4suC4iuC4mOC4suC4meC4tVxcXCI+4Lit4Li44Lia4Lil4Lij4Liy4LiK4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuPC9zZWxlY3Q+XFxyXFxuXFxyXFxuPCEtLTxzZWxlY3QgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgIDxvcHRpb24gc2VsZWN0ZWQ9XFxcInNlbGVjdGVkXFxcIiB2YWx1ZT1cXFwiMFxcXCI+LSDguJfguLHguYnguIfguKvguKHguJQgLTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI4MVxcXCI+4LiB4Lij4Liw4Lia4Li14LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjEwXFxcIj7guIHguKPguLjguIfguYDguJfguJ7guKHguKvguLLguJnguITguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzFcXFwiPuC4geC4suC4jeC4iOC4meC4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0NlxcXCI+4LiB4Liy4Lis4Liq4Li04LiZ4LiY4Li44LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjYyXFxcIj7guIHguLPguYHguJ7guIfguYDguJ7guIrguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNDBcXFwiPuC4guC4reC4meC5geC4geC5iOC4mTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIyMlxcXCI+4LiI4Lix4LiZ4LiX4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjI0XFxcIj7guInguLDguYDguIrguLTguIfguYDguJfguKPguLI8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMjBcXFwiPuC4iuC4peC4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIxOFxcXCI+4LiK4Lix4Lii4LiZ4Liy4LiXPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjM2XFxcIj7guIrguLHguKLguKDguLnguKHguLQ8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiODZcXFwiPuC4iuC4uOC4oeC4nuC4ozwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI1N1xcXCI+4LmA4LiK4Li14Lii4LiH4Lij4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjUwXFxcIj7guYDguIrguLXguKLguIfguYPguKvguKHguYg8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiOTJcXFwiPuC4leC4o+C4seC4hzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIyM1xcXCI+4LiV4Lij4Liy4LiUPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjYzXFxcIj7guJXguLLguIE8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMjZcXFwiPuC4meC4hOC4o+C4meC4suC4ouC4gTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI3M1xcXCI+4LiZ4LiE4Lij4Lib4LiQ4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjQ4XFxcIj7guJnguITguKPguJ7guJnguKE8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMzBcXFwiPuC4meC4hOC4o+C4o+C4suC4iuC4quC4teC4oeC4sjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI4MFxcXCI+4LiZ4LiE4Lij4Lio4Lij4Li14LiY4Lij4Lij4Lih4Lij4Liy4LiKPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjYwXFxcIj7guJnguITguKPguKrguKfguKPguKPguITguYw8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTJcXFwiPuC4meC4meC4l+C4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI5NlxcXCI+4LiZ4Lij4Liy4LiY4Li04Lin4Liy4LiqPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjU1XFxcIj7guJnguYjguLLguJk8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMzhcXFwiPuC4muC4tuC4h+C4geC4suC4rDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIzMVxcXCI+4Lia4Li44Lij4Li14Lij4Lix4Lih4Lii4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjEzXFxcIj7guJvguJfguLjguKHguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzdcXFwiPuC4m+C4o+C4sOC4iOC4p+C4muC4hOC4teC4o+C4teC4guC4seC4meC4mOC5jDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIyNVxcXCI+4Lib4Lij4Liy4LiI4Li14LiZ4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjk0XFxcIj7guJvguLHguJXguJXguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTRcXFwiPuC4nuC4o+C4sOC4meC4hOC4o+C4qOC4o+C4teC4reC4ouC4uOC4mOC4ouC4sjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI1NlxcXCI+4Lie4Liw4LmA4Lii4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjgyXFxcIj7guJ7guLHguIfguIfguLI8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiOTNcXFwiPuC4nuC4seC4l+C4peC4uOC4hzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI2NlxcXCI+4Lie4Li04LiI4Li04LiV4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjY1XFxcIj7guJ7guLTguKnguJPguLjguYLguKXguIE8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzZcXFwiPuC5gOC4nuC4iuC4o+C4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI2N1xcXCI+4LmA4Lie4LiK4Lij4Lia4Li54Lij4LiT4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjU0XFxcIj7guYHguJ7guKPguYg8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiODNcXFwiPuC4oOC4ueC5gOC4geC5h+C4lTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0NFxcXCI+4Lih4Lir4Liy4Liq4Liy4Lij4LiE4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjQ5XFxcIj7guKHguLjguIHguJTguLLguKvguLLguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNThcXFwiPuC5geC4oeC5iOC4ruC5iOC4reC4h+C4quC4reC4mTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIzNVxcXCI+4Lii4LmC4Liq4LiY4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjk1XFxcIj7guKLguLDguKXguLI8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNDVcXFwiPuC4o+C5ieC4reC4ouC5gOC4reC5h+C4lDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI4NVxcXCI+4Lij4Liw4LiZ4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjIxXFxcIj7guKPguLDguKLguK3guIc8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzBcXFwiPuC4o+C4suC4iuC4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIxNlxcXCI+4Lil4Lie4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjUyXFxcIj7guKXguLPguJvguLLguIc8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNTFcXFwiPuC4peC4s+C4nuC4ueC4mTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0MlxcXCI+4LmA4Lil4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjMzXFxcIj7guKjguKPguLXguKrguLDguYDguIHguKk8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNDdcXFwiPuC4quC4geC4peC4meC4hOC4ozwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI5MFxcXCI+4Liq4LiH4LiC4Lil4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjkxXFxcIj7guKrguJXguLnguKU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTFcXFwiPuC4quC4oeC4uOC4l+C4o+C4m+C4o+C4suC4geC4suC4ozwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI3NVxcXCI+4Liq4Lih4Li44LiX4Lij4Liq4LiH4LiE4Lij4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjc0XFxcIj7guKrguKHguLjguJfguKPguKrguLLguITguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMjdcXFwiPuC4quC4o+C4sOC5geC4geC5ieC4pzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIxOVxcXCI+4Liq4Lij4Liw4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjE3XFxcIj7guKrguLTguIfguKvguYzguJrguLjguKPguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNjRcXFwiPuC4quC4uOC5guC4guC4l+C4seC4ojwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI3MlxcXCI+4Liq4Li44Lie4Lij4Lij4LiT4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjg0XFxcIj7guKrguLjguKPguLLguKnguI7guKPguYzguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMzJcXFwiPuC4quC4uOC4o+C4tOC4meC4l+C4o+C5jDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0M1xcXCI+4Lir4LiZ4Lit4LiH4LiE4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjM5XFxcIj7guKvguJnguK3guIfguJrguLHguKfguKXguLPguKDguLk8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTVcXFwiPuC4reC5iOC4suC4h+C4l+C4reC4hzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIzN1xcXCI+4Lit4Liz4LiZ4Liy4LiI4LmA4LiI4Lij4Li04LiNPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjQxXFxcIj7guK3guLjguJTguKPguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNTNcXFwiPuC4reC4uOC4leC4o+C4lOC4tOC4leC4luC5jDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI2MVxcXCI+4Lit4Li44LiX4Lix4Lii4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjM0XFxcIj7guK3guLjguJrguKXguKPguLLguIrguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG48L3NlbGVjdD4tLT5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9wcm92aW5jZS5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgRERMQmFua0NvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBERExCYW5rQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERETEJhbmtDb21wb25lbnQ7XHJcbn0oKSk7XHJcbkRETEJhbmtDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnZGRsLWJhbmsnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2JhbmsuY29tcG9uZW50Lmh0bWwnKVxyXG4gICAgfSlcclxuXSwgRERMQmFua0NvbXBvbmVudCk7XHJcbmV4cG9ydHMuRERMQmFua0NvbXBvbmVudCA9IERETEJhbmtDb21wb25lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhbmsuY29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9iYW5rLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzZWxlY3QgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgIDxvcHRpb24gc2VsZWN0ZWQ9XFxcInNlbGVjdGVkXFxcIiB2YWx1ZT1cXFwiMFxcXCI+LSDguJfguLHguYnguIfguKvguKHguJQgLTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCJHSEJcXFwiPkdIQjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCJHU0JcXFwiPkdTQjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCJLVEJcXFwiPktUQjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCJTQ0JcXFwiPlNDQjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCJUTkJcXFwiPlROQjwvb3B0aW9uPlxcclxcbjwvc2VsZWN0PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL2JhbmsuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=