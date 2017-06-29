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
	var map_1 = __webpack_require__(32);
	var map_component_1 = __webpack_require__(33);
	var province_component_1 = __webpack_require__(35);
	var bank_component_1 = __webpack_require__(37);
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
	var paging_1 = __webpack_require__(28);
	var SearchComponent = (function () {
	    function SearchComponent(http, sanitizer) {
	        var _this = this;
	        this.paging = new paging_1.Paging();
	        this.http = http;
	        this.sanitizer = sanitizer;
	        this.paging.pageNumber = 10;
	        this.paging.itemPerPage = 1;
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
	        template: __webpack_require__(29),
	        styles: [__webpack_require__(30)]
	    }),
	    __metadata("design:paramtypes", [http_1.Http, platform_browser_1.DomSanitizer])
	], SearchComponent);
	exports.SearchComponent = SearchComponent;
	//# sourceMappingURL=search.component.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Paging = (function () {
	    function Paging() {
	    }
	    return Paging;
	}());
	exports.Paging = Paging;
	//# sourceMappingURL=paging.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = "\r\n<div class=\"row\">\r\n    <form #form=\"ngForm\" (ngSubmit)=\"submit(form.value)\" class=\"form-group row re-search-form \">\r\n        <div class=\"col-xs-1 col-lg12 nopadding\">\r\n            <input type=\"text\" name=\"PriceMin\" ngModel id=\"PriceMin\" placeholder=\"Min\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"col-xs-1 col-lg12 nopadding\">\r\n            <input type=\"text\" name=\"PriceMax\" ng-init=\"0\" ngModel id=\"PriceMax\" placeholder=\"Max\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"col-xs-2 col-lg12 nopadding\">\r\n            <ddl-bank name=\"Source\" ngModel id=\"Source\" ngDefaultControl></ddl-bank>\r\n        </div>\r\n        <div class=\"col-xs-2 col-lg12 nopadding\">\r\n            <ddl-province name=\"Province\" ngModel id=\"Province\" ngDefaultControl></ddl-province>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-info\"><span class=\"glyphicon glyphicon-search\"></span></button>\r\n    </form>\r\n</div>\r\n<div (window:scroll)=\"onScroll($event)\">\r\n    <div class=\"col-xs-12 col-lg-7 re-card\" *ngFor=\"let re of res; let i = index\" [attr.data-index]=\"i\">\r\n        <div class=\"re-image-container col-lg-9 col-md-9\">\r\n            <img *ngIf=\"getArrayLength(re.images) == 0\" src=\"/Images/default-thumbnail.jpg\" class=\"re-image img-responsive\" />\r\n            <div id=\"carousel-{{i}}\" class=\"carousel slide\" data-ride=\"carousel\">\r\n                <div class=\"carousel-inner\">\r\n                    <div class=\"item{{j == 0 ? ' active' : ''}}\" *ngFor=\"let image of re.images; let j = index\" [attr.data-index]=\"j\">\r\n                        <img src=\"{{image}}\" class=\"re-image img-responsive\" fallback-src=\"/Images/default-thumbnail.jpg\">\r\n                    </div>\r\n                </div>\r\n                <a *ngIf=\"getArrayLength(re.images) > 1\" class=\"left carousel-control\" href=\"#carousel-{{i}}\" data-slide=\"prev\">\r\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                    <span class=\"sr-only\">Previous</span>\r\n                </a>\r\n                <a *ngIf=\"getArrayLength(re.images) > 1\" class=\"right carousel-control\" href=\"#carousel-{{i}}\" data-slide=\"next\">\r\n                    <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n                    <span class=\"sr-only\">Next</span>\r\n                </a>\r\n            </div>\r\n        </div>\r\n        <div class=\"re-card-details fill col-lg-3 col-md-3\">\r\n            <div class=\"row\" style=\" color:#585858;\">\r\n                <div class=\"col-xs-12\">{{re.price | number}}</div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\">{{re.map.province}}</div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\" style=\"font-size:0.8em; color:#8c8c8c;\">{{re.sizeTotal + \" \" + re.sizeTotalUnit}}</div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\" style=\"font-size:0.8em; color:#8c8c8c;\">{{re.map.desc}}</div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\" style=\"font-size:0.8em; color:#8c8c8c;\">{{re.bed}}</div>\r\n            </div>\r\n            <div class=\"row re-card-glyp\">\r\n                <div *ngIf=\"re.bedRoom\" class=\"col-lg-12 col-xs-12\">\r\n                    {{re.bedRoom}}\r\n                    <i class=\"fa fa-bed\" aria-hidden=\"true\"></i>&nbsp;\r\n                    {{re.bathRoom}}\r\n                    <i class=\"fa fa-bath\" aria-hidden=\"true\"></i>&nbsp;\r\n                    {{re.parkingSpace}}\r\n                    <i class=\"fa fa-car\" aria-hidden=\"true\"></i>\r\n                </div>\r\n                <!--<div>{{log}}</div>-->\r\n                <div class=\"debug\">\r\n                    <button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" [attr.data-target]=\"'#modal-'+ i\">\r\n                        <span data-toggle=\"modal\" data-target=\"#\" class=\"glyphicon glyphicon-zoom-in\" aria-hidden=\"true\"></span>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal fade\" id=\"modal-{{i}}\" role=\"dialog\">\r\n                <div class=\"modal-dialog\">\r\n                    <div class=\"modal-content\">\r\n                        <div class=\"modal-header\">\r\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                        </div>\r\n                        <div class=\"modal-body\">\r\n                            <div class=\"col-lg-3 col-md-12 col-xs-12\"><pre style=\"text-align:left; font-size:0.8em;\">{{re | json }}</pre></div>\r\n                            <!--<pre [attr.pretty-json]=\"{{re}}\"></pre>-->\r\n                        </div>\r\n                        <div class=\"modal-footer\">\r\n                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--<pre>\r\n{{form.value | json}}\r\n    </pre>\r\n\r\n<pre>\r\n{{res | json}}\r\n    </pre>\r\n<h4>Submitted</h4>\r\n<pre>\r\n{{value | json }}\r\n    </pre>-->\r\n"

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(31);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".carousel-control.left, .carousel-control.right {\r\n    background-image: none !important;\r\n    filter: none !important;\r\n}\r\n[class*=\"col-\"] {\r\n    float: left;\r\n    vertical-align: top;\r\n}\r\nhtml, body {\r\n    height: 100%;\r\n}\r\n.fill {\r\n    min-height: 100%;\r\n    height: 100%;\r\n}\r\n.nopadding {\r\n    padding: 0 !important;\r\n    margin: 0 !important;\r\n}\r\n.re-search-form\r\n{\r\n    margin:18px;\r\n}\r\n\r\n.re-card {\r\n    border: 1px solid #e0e0e0;\r\n    margin: 3px 3px 3px 3px;\r\n    text-align: center;\r\n    background-color: white;\r\n    border-radius: 5px;\r\n    padding: 10px;\r\n}\r\n.re-image-congainer {\r\n    /*height:200px;*/\r\n}\r\n.re-image {\r\n    border: 1px solid #efefef;\r\n    margin-bottom:5px;\r\n}\r\n\r\n.re-card-details {\r\n    padding: 5px;\r\n    text-align: left;\r\n}\r\n    .re-card-details .row {\r\n        margin-top:5px;\r\n    }\r\n.re-card-glyp {\r\n    color: #8c8c8c;\r\n}\r\n    .re-card-glyp .debug {\r\n        position: absolute;\r\n        right: 0%;\r\n        margin-top: -5px;\r\n    }\r\n\r\n#myModal {\r\n    width: 100% !important;\r\n    height: 100% !important;\r\n}\r\n\r\n.modal-body {\r\n    width: 100% !important;\r\n    height: 90% !important;\r\n}\r\n\r\n.modal-content {\r\n    width: 100% !important;\r\n    height: 100% !important;\r\n}\r\n\r\n.modal-dialog {\r\n    margin: 0px 0px 0px 0px;\r\n    width: 100% !important;\r\n    height: 100% !important;\r\n}\r\n", ""]);
	
	// exports


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = require("@ngui/map");

/***/ }),
/* 33 */
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
	        template: __webpack_require__(34)
	    })
	], MapComponent);
	exports.MapComponent = MapComponent;
	//# sourceMappingURL=map.component.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = "<ngui-map zoom=\"14\" center=\"Brampton, Canada\">\r\n    <marker *ngFor=\"let pos of positions\"\r\n            (click)=\"showInfoWindow($event)\"\r\n            [position]=\"pos\"></marker>\r\n</ngui-map>\r\n<button (click)=\"showRandomMarkers()\">Show Random Markers</button>\r\n<br />\r\n<button (click)=\"addMarker()\">Add Marker</button>"

/***/ }),
/* 35 */
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
	        template: __webpack_require__(36)
	    })
	], DDLProvinceComponent);
	exports.DDLProvinceComponent = DDLProvinceComponent;
	//# sourceMappingURL=province.component.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	module.exports = "<select class=\"form-control\">\r\n    <option selected=\"selected\" value=\"\">- ทั้งหมด -\r\n    <option value=\"กระบี่\">กระบี่</option>\r\n    <option value=\"กรุงเทพมหานคร\">กรุงเทพมหานคร</option>\r\n    <option value=\"กาญจนบุรี\">กาญจนบุรี</option>\r\n    <option value=\"กาฬสินธุ์\">กาฬสินธุ์</option>\r\n    <option value=\"กำแพงเพชร\">กำแพงเพชร</option>\r\n    <option value=\"ขอนแก่น\">ขอนแก่น</option>\r\n    <option value=\"จันทบุรี\">จันทบุรี</option>\r\n    <option value=\"ฉะเชิงเทรา\">ฉะเชิงเทรา</option>\r\n    <option value=\"ชลบุรี\">ชลบุรี</option>\r\n    <option value=\"ชัยนาท\">ชัยนาท</option>\r\n    <option value=\"ชัยภูมิ\">ชัยภูมิ</option>\r\n    <option value=\"ชุมพร\">ชุมพร</option>\r\n    <option value=\"เชียงราย\">เชียงราย</option>\r\n    <option value=\"เชียงใหม่\">เชียงใหม่</option>\r\n    <option value=\"ตรัง\">ตรัง</option>\r\n    <option value=\"ตราด\">ตราด</option>\r\n    <option value=\"ตาก\">ตาก</option>\r\n    <option value=\"นครนายก\">นครนายก</option>\r\n    <option value=\"นครปฐม\">นครปฐม</option>\r\n    <option value=\"นครพนม\">นครพนม</option>\r\n    <option value=\"นครราชสีมา\">นครราชสีมา</option>\r\n    <option value=\"นครศรีธรรมราช\">นครศรีธรรมราช</option>\r\n    <option value=\"นครสวรรค์\">นครสวรรค์</option>\r\n    <option value=\"นนทบุรี\">นนทบุรี</option>\r\n    <option value=\"นราธิวาส\">นราธิวาส</option>\r\n    <option value=\"น่าน\">น่าน</option>\r\n    <option value=\"บึงกาฬ\">บึงกาฬ</option>\r\n    <option value=\"บุรีรัมย์\">บุรีรัมย์</option>\r\n    <option value=\"ปทุมธานี\">ปทุมธานี</option>\r\n    <option value=\"ประจวบคีรีขันธ์\">ประจวบคีรีขันธ์</option>\r\n    <option value=\"ปราจีนบุรี\">ปราจีนบุรี</option>\r\n    <option value=\"ปัตตานี\">ปัตตานี</option>\r\n    <option value=\"พระนครศรีอยุธยา\">พระนครศรีอยุธยา</option>\r\n    <option value=\"พะเยา\">พะเยา</option>\r\n    <option value=\"พังงา\">พังงา</option>\r\n    <option value=\"พัทลุง\">พัทลุง</option>\r\n    <option value=\"พิจิตร\">พิจิตร</option>\r\n    <option value=\"พิษณุโลก\">พิษณุโลก</option>\r\n    <option value=\"เพชรบุรี\">เพชรบุรี</option>\r\n    <option value=\"เพชรบูรณ์\">เพชรบูรณ์</option>\r\n    <option value=\"แพร่\">แพร่</option>\r\n    <option value=\"ภูเก็ต\">ภูเก็ต</option>\r\n    <option value=\"มหาสารคาม\">มหาสารคาม</option>\r\n    <option value=\"มุกดาหาร\">มุกดาหาร</option>\r\n    <option value=\"แม่ฮ่องสอน\">แม่ฮ่องสอน</option>\r\n    <option value=\"ยโสธร\">ยโสธร</option>\r\n    <option value=\"ยะลา\">ยะลา</option>\r\n    <option value=\"ร้อยเอ็ด\">ร้อยเอ็ด</option>\r\n    <option value=\"ระนอง\">ระนอง</option>\r\n    <option value=\"ระยอง\">ระยอง</option>\r\n    <option value=\"ราชบุรี\">ราชบุรี</option>\r\n    <option value=\"ลพบุรี\">ลพบุรี</option>\r\n    <option value=\"ลำปาง\">ลำปาง</option>\r\n    <option value=\"ลำพูน\">ลำพูน</option>\r\n    <option value=\"เลย\">เลย</option>\r\n    <option value=\"ศรีสะเกษ\">ศรีสะเกษ</option>\r\n    <option value=\"สกลนคร\">สกลนคร</option>\r\n    <option value=\"สงขลา\">สงขลา</option>\r\n    <option value=\"สตูล\">สตูล</option>\r\n    <option value=\"สมุทรปราการ\">สมุทรปราการ</option>\r\n    <option value=\"สมุทรสงคราม\">สมุทรสงคราม</option>\r\n    <option value=\"สมุทรสาคร\">สมุทรสาคร</option>\r\n    <option value=\"สระแก้ว\">สระแก้ว</option>\r\n    <option value=\"สระบุรี\">สระบุรี</option>\r\n    <option value=\"สิงห์บุรี\">สิงห์บุรี</option>\r\n    <option value=\"สุโขทัย\">สุโขทัย</option>\r\n    <option value=\"สุพรรณบุรี\">สุพรรณบุรี</option>\r\n    <option value=\"สุราษฎร์ธานี\">สุราษฎร์ธานี</option>\r\n    <option value=\"สุรินทร์\">สุรินทร์</option>\r\n    <option value=\"หนองคาย\">หนองคาย</option>\r\n    <option value=\"หนองบัวลำภู\">หนองบัวลำภู</option>\r\n    <option value=\"อ่างทอง\">อ่างทอง</option>\r\n    <option value=\"อำนาจเจริญ\">อำนาจเจริญ</option>\r\n    <option value=\"อุดรธานี\">อุดรธานี</option>\r\n    <option value=\"อุตรดิตถ์\">อุตรดิตถ์</option>\r\n    <option value=\"อุทัยธานี\">อุทัยธานี</option>\r\n    <option value=\"อุบลราชธานี\">อุบลราชธานี</option>\r\n</select>\r\n\r\n<!--<select class=\"form-control\">\r\n    <option selected=\"selected\" value=\"0\">- ทั้งหมด -</option>\r\n    <option value=\"81\">กระบี่</option>\r\n    <option value=\"10\">กรุงเทพมหานคร</option>\r\n    <option value=\"71\">กาญจนบุรี</option>\r\n    <option value=\"46\">กาฬสินธุ์</option>\r\n    <option value=\"62\">กำแพงเพชร</option>\r\n    <option value=\"40\">ขอนแก่น</option>\r\n    <option value=\"22\">จันทบุรี</option>\r\n    <option value=\"24\">ฉะเชิงเทรา</option>\r\n    <option value=\"20\">ชลบุรี</option>\r\n    <option value=\"18\">ชัยนาท</option>\r\n    <option value=\"36\">ชัยภูมิ</option>\r\n    <option value=\"86\">ชุมพร</option>\r\n    <option value=\"57\">เชียงราย</option>\r\n    <option value=\"50\">เชียงใหม่</option>\r\n    <option value=\"92\">ตรัง</option>\r\n    <option value=\"23\">ตราด</option>\r\n    <option value=\"63\">ตาก</option>\r\n    <option value=\"26\">นครนายก</option>\r\n    <option value=\"73\">นครปฐม</option>\r\n    <option value=\"48\">นครพนม</option>\r\n    <option value=\"30\">นครราชสีมา</option>\r\n    <option value=\"80\">นครศรีธรรมราช</option>\r\n    <option value=\"60\">นครสวรรค์</option>\r\n    <option value=\"12\">นนทบุรี</option>\r\n    <option value=\"96\">นราธิวาส</option>\r\n    <option value=\"55\">น่าน</option>\r\n    <option value=\"38\">บึงกาฬ</option>\r\n    <option value=\"31\">บุรีรัมย์</option>\r\n    <option value=\"13\">ปทุมธานี</option>\r\n    <option value=\"77\">ประจวบคีรีขันธ์</option>\r\n    <option value=\"25\">ปราจีนบุรี</option>\r\n    <option value=\"94\">ปัตตานี</option>\r\n    <option value=\"14\">พระนครศรีอยุธยา</option>\r\n    <option value=\"56\">พะเยา</option>\r\n    <option value=\"82\">พังงา</option>\r\n    <option value=\"93\">พัทลุง</option>\r\n    <option value=\"66\">พิจิตร</option>\r\n    <option value=\"65\">พิษณุโลก</option>\r\n    <option value=\"76\">เพชรบุรี</option>\r\n    <option value=\"67\">เพชรบูรณ์</option>\r\n    <option value=\"54\">แพร่</option>\r\n    <option value=\"83\">ภูเก็ต</option>\r\n    <option value=\"44\">มหาสารคาม</option>\r\n    <option value=\"49\">มุกดาหาร</option>\r\n    <option value=\"58\">แม่ฮ่องสอน</option>\r\n    <option value=\"35\">ยโสธร</option>\r\n    <option value=\"95\">ยะลา</option>\r\n    <option value=\"45\">ร้อยเอ็ด</option>\r\n    <option value=\"85\">ระนอง</option>\r\n    <option value=\"21\">ระยอง</option>\r\n    <option value=\"70\">ราชบุรี</option>\r\n    <option value=\"16\">ลพบุรี</option>\r\n    <option value=\"52\">ลำปาง</option>\r\n    <option value=\"51\">ลำพูน</option>\r\n    <option value=\"42\">เลย</option>\r\n    <option value=\"33\">ศรีสะเกษ</option>\r\n    <option value=\"47\">สกลนคร</option>\r\n    <option value=\"90\">สงขลา</option>\r\n    <option value=\"91\">สตูล</option>\r\n    <option value=\"11\">สมุทรปราการ</option>\r\n    <option value=\"75\">สมุทรสงคราม</option>\r\n    <option value=\"74\">สมุทรสาคร</option>\r\n    <option value=\"27\">สระแก้ว</option>\r\n    <option value=\"19\">สระบุรี</option>\r\n    <option value=\"17\">สิงห์บุรี</option>\r\n    <option value=\"64\">สุโขทัย</option>\r\n    <option value=\"72\">สุพรรณบุรี</option>\r\n    <option value=\"84\">สุราษฎร์ธานี</option>\r\n    <option value=\"32\">สุรินทร์</option>\r\n    <option value=\"43\">หนองคาย</option>\r\n    <option value=\"39\">หนองบัวลำภู</option>\r\n    <option value=\"15\">อ่างทอง</option>\r\n    <option value=\"37\">อำนาจเจริญ</option>\r\n    <option value=\"41\">อุดรธานี</option>\r\n    <option value=\"53\">อุตรดิตถ์</option>\r\n    <option value=\"61\">อุทัยธานี</option>\r\n    <option value=\"34\">อุบลราชธานี</option>\r\n</select>-->"

/***/ }),
/* 37 */
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
	        template: __webpack_require__(38)
	    })
	], DDLBankComponent);
	exports.DDLBankComponent = DDLBankComponent;
	//# sourceMappingURL=bank.component.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = "\r\n\r\n<div class=\"col-xs-12 col-lg-7 re-card\" *ngFor=\"let re of res; let i = index\" [attr.data-index]=\"i\">\r\n\r\n</div>\r\n\r\n"

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2E0Y2M5YTE3NTM1OTVmOTg3YzYiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ6b25lLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvYXBwLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvZm9ybXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50LmNzcz9kZGMzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvbmF2bWVudS9uYXZtZW51LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvbmF2bWVudS9uYXZtZW51LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50LmNzcz85ZjY0Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9uYXZtZW51L25hdm1lbnUuY29tcG9uZW50LmNzcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcz83NzM4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvZmV0Y2hkYXRhL2ZldGNoZGF0YS5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvaHR0cFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9mZXRjaGRhdGEvZmV0Y2hkYXRhLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9jb3VudGVyL2NvdW50ZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9jb3VudGVyL2NvdW50ZXIuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zdHJ1Y3R1cmUvcGFnaW5nLmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3M/N2NiMCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZ3VpL21hcFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvbWFwLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL21hcC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvYmFuay5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9iYW5rLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0Esd0JBQXNDO0FBQ3RDLHdCQUFpQjtBQUNqQixxQ0FBK0M7QUFDL0MsbURBQXlEO0FBQ3pELDJDQUE2QztBQUU3QyxzQkFBYyxFQUFFLENBQUM7QUFDakIsS0FB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K0JBQStCLGdDQUFnQyxLQUFLOztBQUV4OUM7Ozs7Ozs7QUNQQSx1Qzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0EsK0NBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLDBDOzs7Ozs7QUNwQ0EsMlc7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBLCtDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLCtDOzs7Ozs7QUNyQkEsNmhQOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQSwrQ0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSwyQzs7Ozs7O0FDckJBLDRGQUEyRixnRSIsImZpbGUiOiJtYWluLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNhNGNjOWExNzUzNTk1Zjk4N2M2IiwiaW1wb3J0ICdhbmd1bGFyMi11bml2ZXJzYWwtcG9seWZpbGxzJztcbmltcG9ydCAnem9uZS5qcyc7XG5pbXBvcnQgeyBlbmFibGVQcm9kTW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhdGZvcm1Ob2RlRHluYW1pYyB9IGZyb20gJ2FuZ3VsYXIyLXVuaXZlcnNhbCc7XG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcblxuZW5hYmxlUHJvZE1vZGUoKTtcbmNvbnN0IHBsYXRmb3JtID0gcGxhdGZvcm1Ob2RlRHluYW1pYygpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocGFyYW1zOiBhbnkpOiBQcm9taXNlPHsgaHRtbDogc3RyaW5nLCBnbG9iYWxzPzogYW55IH0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0Wm9uZSA9IFpvbmUuY3VycmVudC5mb3JrKHtcbiAgICAgICAgICAgIG5hbWU6ICdhbmd1bGFyLXVuaXZlcnNhbCByZXF1ZXN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBiYXNlVXJsOiAnLycsXG4gICAgICAgICAgICAgICAgcmVxdWVzdFVybDogcGFyYW1zLnVybCxcbiAgICAgICAgICAgICAgICBvcmlnaW5Vcmw6IHBhcmFtcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgcHJlYm9vdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVuZGVyIGp1c3QgdGhlIDxhcHA+IGNvbXBvbmVudCBpbnN0ZWFkIG9mIHdyYXBwaW5nIGl0IGluc2lkZSBhbiBleHRyYSBIVE1MIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgLy8gV2FpdGluZyBvbiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci91bml2ZXJzYWwvaXNzdWVzLzM0N1xuICAgICAgICAgICAgICAgIGRvY3VtZW50OiAnPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PjxhcHA+PC9hcHA+PC9ib2R5PjwvaHRtbD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25IYW5kbGVFcnJvcjogKHBhcmVudFpvbmUsIGN1cnJlbnRab25lLCB0YXJnZXRab25lLCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIElmIGFueSBlcnJvciBvY2N1cnMgd2hpbGUgcmVuZGVyaW5nIHRoZSBtb2R1bGUsIHJlamVjdCB0aGUgd2hvbGUgb3BlcmF0aW9uXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcXVlc3Rab25lLnJ1bjxQcm9taXNlPHN0cmluZz4+KCgpID0+IHBsYXRmb3JtLnNlcmlhbGl6ZU1vZHVsZShBcHBNb2R1bGUpKS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh7IGh0bWw6IGh0bWwgfSk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW5ndWxhcjItdW5pdmVyc2FsLXBvbHlmaWxsc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHNcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6b25lLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiem9uZS5qc1wiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW5ndWxhcjItdW5pdmVyc2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYW5ndWxhcjItdW5pdmVyc2FsXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgcGxhdGZvcm1fYnJvd3Nlcl8xID0gcmVxdWlyZShcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIik7XHJcbnZhciBmb3Jtc18xID0gcmVxdWlyZShcIkBhbmd1bGFyL2Zvcm1zXCIpO1xyXG52YXIgcm91dGVyXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvcm91dGVyXCIpO1xyXG52YXIgYW5ndWxhcjJfdW5pdmVyc2FsXzEgPSByZXF1aXJlKFwiYW5ndWxhcjItdW5pdmVyc2FsXCIpO1xyXG52YXIgYXBwX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudFwiKTtcclxudmFyIG5hdm1lbnVfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL25hdm1lbnUvbmF2bWVudS5jb21wb25lbnRcIik7XHJcbnZhciBob21lX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCIpO1xyXG52YXIgZmV0Y2hkYXRhX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9mZXRjaGRhdGEvZmV0Y2hkYXRhLmNvbXBvbmVudFwiKTtcclxudmFyIGNvdW50ZXJfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2NvdW50ZXIvY291bnRlci5jb21wb25lbnRcIik7XHJcbnZhciBzZWFyY2hfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2guY29tcG9uZW50XCIpO1xyXG52YXIgbWFwXzEgPSByZXF1aXJlKFwiQG5ndWkvbWFwXCIpO1xyXG52YXIgbWFwX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZWFyY2gvbWFwLmNvbXBvbmVudFwiKTtcclxudmFyIHByb3ZpbmNlX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZWFyY2gvcHJvdmluY2UuY29tcG9uZW50XCIpO1xyXG52YXIgYmFua19jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2VhcmNoL2JhbmsuY29tcG9uZW50XCIpO1xyXG52YXIgQXBwTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFwcE1vZHVsZSgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBBcHBNb2R1bGU7XHJcbn0oKSk7XHJcbkFwcE1vZHVsZSA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLk5nTW9kdWxlKHtcclxuICAgICAgICBib290c3RyYXA6IFthcHBfY29tcG9uZW50XzEuQXBwQ29tcG9uZW50XSxcclxuICAgICAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICAgICAgYXBwX2NvbXBvbmVudF8xLkFwcENvbXBvbmVudCxcclxuICAgICAgICAgICAgbmF2bWVudV9jb21wb25lbnRfMS5OYXZNZW51Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBjb3VudGVyX2NvbXBvbmVudF8xLkNvdW50ZXJDb21wb25lbnQsXHJcbiAgICAgICAgICAgIGZldGNoZGF0YV9jb21wb25lbnRfMS5GZXRjaERhdGFDb21wb25lbnQsXHJcbiAgICAgICAgICAgIHNlYXJjaF9jb21wb25lbnRfMS5TZWFyY2hDb21wb25lbnQsXHJcbiAgICAgICAgICAgIGhvbWVfY29tcG9uZW50XzEuSG9tZUNvbXBvbmVudCxcclxuICAgICAgICAgICAgbWFwX2NvbXBvbmVudF8xLk1hcENvbXBvbmVudCxcclxuICAgICAgICAgICAgcHJvdmluY2VfY29tcG9uZW50XzEuRERMUHJvdmluY2VDb21wb25lbnQsXHJcbiAgICAgICAgICAgIGJhbmtfY29tcG9uZW50XzEuRERMQmFua0NvbXBvbmVudFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgICBwbGF0Zm9ybV9icm93c2VyXzEuQnJvd3Nlck1vZHVsZSwgZm9ybXNfMS5Gb3Jtc01vZHVsZSxcclxuICAgICAgICAgICAgbWFwXzEuTmd1aU1hcE1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAgICAgICAgIGFwaVVybDogJ2h0dHBzOi8vbWFwcy5nb29nbGUuY29tL21hcHMvYXBpL2pzP2xpYnJhcmllcz12aXN1YWxpemF0aW9uLHBsYWNlcyxkcmF3aW5nJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgYW5ndWxhcjJfdW5pdmVyc2FsXzEuVW5pdmVyc2FsTW9kdWxlLFxyXG4gICAgICAgICAgICByb3V0ZXJfMS5Sb3V0ZXJNb2R1bGUuZm9yUm9vdChbXHJcbiAgICAgICAgICAgICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnaG9tZScsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXHJcbiAgICAgICAgICAgICAgICB7IHBhdGg6ICdob21lJywgY29tcG9uZW50OiBob21lX2NvbXBvbmVudF8xLkhvbWVDb21wb25lbnQgfSxcclxuICAgICAgICAgICAgICAgIHsgcGF0aDogJ2NvdW50ZXInLCBjb21wb25lbnQ6IGNvdW50ZXJfY29tcG9uZW50XzEuQ291bnRlckNvbXBvbmVudCB9LFxyXG4gICAgICAgICAgICAgICAgeyBwYXRoOiAnZmV0Y2gtZGF0YScsIGNvbXBvbmVudDogZmV0Y2hkYXRhX2NvbXBvbmVudF8xLkZldGNoRGF0YUNvbXBvbmVudCB9LFxyXG4gICAgICAgICAgICAgICAgeyBwYXRoOiAnc2VhcmNoJywgY29tcG9uZW50OiBzZWFyY2hfY29tcG9uZW50XzEuU2VhcmNoQ29tcG9uZW50IH0sXHJcbiAgICAgICAgICAgICAgICB7IHBhdGg6ICcqKicsIHJlZGlyZWN0VG86ICdob21lJyB9XHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXVxyXG4gICAgfSlcclxuXSwgQXBwTW9kdWxlKTtcclxuZXhwb3J0cy5BcHBNb2R1bGUgPSBBcHBNb2R1bGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5tb2R1bGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2FwcC5tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYW5ndWxhci9mb3Jtc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL2Zvcm1zXCJcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFuZ3VsYXIvcm91dGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGFuZ3VsYXIvcm91dGVyXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgQXBwQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFwcENvbXBvbmVudCgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBBcHBDb21wb25lbnQ7XHJcbn0oKSk7XHJcbkFwcENvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdhcHAnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FwcC5jb21wb25lbnQuaHRtbCcpLFxyXG4gICAgICAgIHN0eWxlczogW3JlcXVpcmUoJy4vYXBwLmNvbXBvbmVudC5jc3MnKV1cclxuICAgIH0pXHJcbl0sIEFwcENvbXBvbmVudCk7XHJcbmV4cG9ydHMuQXBwQ29tcG9uZW50ID0gQXBwQ29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuY29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJcXHJcXG48ZGl2IGNsYXNzPSdjb250YWluZXItZmx1aWQnIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOiMyNDI0MjQ7IGhlaWdodDoxMDAlO1xcXCI+XFxyXFxuICAgIDxuYXYtbWVudT48L25hdi1tZW51PlxcclxcbiAgICA8ZGl2IGNsYXNzPSdyb3cnPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz0nY29sLXNtLTEyIGJvZHktY29udGVudCc+XFxyXFxuICAgICAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jb21wb25lbnQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgICAvKiBPbiBzbWFsbCBzY3JlZW5zLCB0aGUgbmF2IG1lbnUgc3BhbnMgdGhlIGZ1bGwgd2lkdGggb2YgdGhlIHNjcmVlbi4gTGVhdmUgYSBzcGFjZSBmb3IgaXQuICovXFxuICAgIC5ib2R5LWNvbnRlbnQge1xcbiAgICAgICAgcGFkZGluZy10b3A6IDUwcHg7XFxuICAgIH1cXG4gICAgYm9keXtcXHJcXG4gICAgICAgIGhlaWdodDoxMDAlO1xcclxcbiAgICB9XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50LmNzc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgTmF2TWVudUNvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOYXZNZW51Q29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5hdk1lbnVDb21wb25lbnQ7XHJcbn0oKSk7XHJcbk5hdk1lbnVDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnbmF2LW1lbnUnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL25hdm1lbnUuY29tcG9uZW50Lmh0bWwnKSxcclxuICAgICAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL25hdm1lbnUuY29tcG9uZW50LmNzcycpXVxyXG4gICAgfSlcclxuXSwgTmF2TWVudUNvbXBvbmVudCk7XHJcbmV4cG9ydHMuTmF2TWVudUNvbXBvbmVudCA9IE5hdk1lbnVDb21wb25lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdm1lbnUuY29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL25hdm1lbnUvbmF2bWVudS5jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWludmVyc2VcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXItZmx1aWRcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibmF2YmFyLWhlYWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJuYXZiYXItdG9nZ2xlXFxcIiBkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiIGRhdGEtdGFyZ2V0PVxcXCIjbXlOYXZiYXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiaWNvbi1iYXJcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJpY29uLWJhclxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJuYXZiYXItYnJhbmRcXFwiIGhyZWY9XFxcIiNcXFwiPkZSRVM8L2E+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVxcXCIgaWQ9XFxcIm15TmF2YmFyXFxcIj5cXHJcXG4gICAgICAgICAgICA8dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItbmF2XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxpIFtyb3V0ZXJMaW5rQWN0aXZlXT1cXFwiWydsaW5rLWFjdGl2ZSddXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cXFwiWycvaG9tZSddXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZ2x5cGhpY29uIGdseXBoaWNvbi1ob21lJz48L3NwYW4+IEhvbWVcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICAgICAgPGxpIFtyb3V0ZXJMaW5rQWN0aXZlXT1cXFwiWydsaW5rLWFjdGl2ZSddXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cXFwiWycvc2VhcmNoJ11cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaCc+PC9zcGFuPiBTZWFyY2hcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcXFwiPjwvc3Bhbj4gU2lnbiBVcDwvYT48L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cXFwiI1xcXCI+PHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9nLWluXFxcIj48L3NwYW4+IExvZ2luPC9hPjwvbGk+XFxyXFxuICAgICAgICAgICAgPC91bD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L25hdj5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL25hdm1lbnUvbmF2bWVudS5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25hdm1lbnUuY29tcG9uZW50LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvbmF2bWVudS9uYXZtZW51LmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL25hdm1lbnUvbmF2bWVudS5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29yZV8xID0gcmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIik7XHJcbnZhciBIb21lQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEhvbWVDb21wb25lbnQoKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSG9tZUNvbXBvbmVudDtcclxufSgpKTtcclxuSG9tZUNvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdob21lJyxcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9ob21lLmNvbXBvbmVudC5odG1sJyksXHJcbiAgICAgICAgc3R5bGVzOiBbcmVxdWlyZSgnLi9ob21lLmNvbXBvbmVudC5jc3MnKV1cclxuICAgIH0pXHJcbl0sIEhvbWVDb21wb25lbnQpO1xyXG5leHBvcnRzLkhvbWVDb21wb25lbnQgPSBIb21lQ29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob21lLmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiaG9tZVxcXCI+XFxyXFxuICAgIDxoMj5GUkVTPC9oMj5cXHJcXG4gICAgPGg0PldlbGNvbWUgdG8gRm9yZWNsb3N1cmUgUmVhbCBFc3RhdGUgU2VhcmNoIEVuZ2luZTwvaDQ+XFxyXFxuICAgIDxiciAvPlxcclxcbiAgICA8cD5UaGlzIHdlYnNpdGUgZ2F0aGVyIGZvcmVjbG9zdXJlIHByb3BlcnRpZXMgZnJvbSB2YXJpb3VzIGJhbmtzIGluIFRoYWlsYW5kLjwvcD5cXHJcXG4gICAgPHVsPlxcclxcbiAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHA6Ly93d3cuZ2hiaG9tZWNlbnRlci5jb20vZ2hiJz5Hb3Zlcm5tZW50IEhvdXNpbmcgQmFuayAoR0hCKTwvYT48L2xpPlxcclxcbiAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHA6Ly9wcm9wZXJ0aWVzLmdzYi5vci50aC8nPkdvdmVybm1lbnQgU2F2aW5ncyBCYW5rIChHU0IpPC9hPjwvbGk+XFxyXFxuICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL3d3dy5ucGFzaG93cm9vbS5rdGIuY28udGgvV2ViU2hvd1Jvb20vU2VhcmNoU2VydmxldCc+S3J1bmcgVGhhaSBCYW5rIChLVEIpPC9hPjwvbGk+XFxyXFxuICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL3d3dy5idXlhdHNpYW0uY29tLyc+U2lhbSBDb21tZXJjaWFsIEJhbmsgKFNDQik8L2E+PC9saT5cXHJcXG4gICAgICAgIDxsaT48YSBocmVmPSdodHRwOi8vd3d3LnRoYW5hY2hhcnRucGEuY29tLyc+VGhhbmFjaGFydCBCYW5rPC9hPjwvbGk+XFxyXFxuICAgIDwvdWw+XFxyXFxuICAgIDxiciAvPlxcclxcbiAgICA8aDQ+VGVjaG5vbG9neSBVc2VkIGluIHRoZSB3ZWJzaXRlPC9oND5cXHJcXG4gICAgPHVsPlxcclxcbiAgICAgICAgPGxpPi5OZXQgQ29yZTwvbGk+XFxyXFxuICAgICAgICA8bGk+QW5ndWxhckpTPC9saT5cXHJcXG4gICAgICAgIDxsaT5Cb290c3RyYXA8L2xpPlxcclxcbiAgICAgICAgPGxpPkF6dXJlIENvc21vcyBEQjwvbGk+XFxyXFxuICAgICAgICA8bGk+QXp1cmUgQ0ROPC9saT5cXHJcXG4gICAgPC91bD5cXHJcXG4gICAgPGJyIC8+XFxyXFxuICAgIDxoND5Ib3cgZG8gSSBnYXRoZXIgYWxsIHRoZSBwcm9wZXJ0aWVzPC9oND5cXHJcXG4gICAgPHA+XFxyXFxuICAgICAgICBJIGJhc2ljYWxseSBkb3dubG9hZCBjb250ZW50IGluIEhUTUwgZm9yIG1hdCBmcm9tIGVhY2ggd2Vic2l0ZXMuXFxyXFxuICAgICAgICBIVE1MIGlzIHRoZW4gdHJhbnNmb3JtZWQgaW50byBqc29uIGZvcm1hdC5cXHJcXG4gICAgICAgIFRoZSBjaGFsbGVuZ2VzIGFyZSB0aGF0IGVhY2ggd2Vic2l0ZSBoYXMgdGhlaXIgb3duIG5hdmlnYXRpb24gc3lzdGVtIGFuZCBIVE1MIHN0cnVjdHVyZS5cXHJcXG4gICAgICAgIEFmdGVyIHRoYXQsIHRoZSBsb2NhdGlvbnMgKGxhdCwgbG9uKSBpcyByZXRyaWV2ZWQgYnkgc2VsZW5pdW0gZnJvbVxcclxcbiAgICAgICAgPGEgaHJlZj0naHR0cDovL2RvbHdtcy5kb2wuZ28udGgvdHZ3ZWJwLyc+bGFuZG1hcDwvYT5cXHJcXG4gICAgPC9wPlxcclxcbiAgICA8dWw+XFxyXFxuICAgICAgICA8bGk+Lk5ldCBGcmFtZXdvcmsgNC42PC9saT5cXHJcXG4gICAgICAgIDxsaT5TUUwgQ0UgKyBFbnRpdHkgRnJhbWV3b3JrPC9saT5cXHJcXG4gICAgICAgIDxsaT5IVE1MIEFnaWxpdHkgUGFjazwvbGk+XFxyXFxuICAgICAgICA8bGk+U2VsZW5pdW08L2xpPlxcclxcbiAgICAgICAgPGxpPkxvdCBvZiByZWd1bGFyIGV4cHJlc3Npb25zPC9saT5cXHJcXG4gICAgPC91bD5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2hvbWUuY29tcG9uZW50LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5ob21lIHtcXHJcXG4gICAgY29sb3I6ICM5ODk4OTg7XFxyXFxufVxcclxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgaHR0cF8xID0gcmVxdWlyZShcIkBhbmd1bGFyL2h0dHBcIik7XHJcbnZhciBGZXRjaERhdGFDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmV0Y2hEYXRhQ29tcG9uZW50KGh0dHApIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGh0dHAuZ2V0KCcvYXBpL1JlYWxFc3RhdGUvR2V0QWxsJykuc3Vic2NyaWJlKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgX3RoaXMucmVzID0gcmVzdWx0Lmpzb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBGZXRjaERhdGFDb21wb25lbnQ7XHJcbn0oKSk7XHJcbkZldGNoRGF0YUNvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdmZXRjaGRhdGEnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2ZldGNoZGF0YS5jb21wb25lbnQuaHRtbCcpXHJcbiAgICB9KSxcclxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbaHR0cF8xLkh0dHBdKVxyXG5dLCBGZXRjaERhdGFDb21wb25lbnQpO1xyXG5leHBvcnRzLkZldGNoRGF0YUNvbXBvbmVudCA9IEZldGNoRGF0YUNvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2hkYXRhLmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9mZXRjaGRhdGEvZmV0Y2hkYXRhLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFuZ3VsYXIvaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL2h0dHBcIlxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIlxcclxcbjxoMT5MaXN0PC9oMT5cXHJcXG48cCAqbmdJZj1cXFwiIXJlc1xcXCI+XFxyXFxuICAgIDxlbT5Mb2FkaW5nLi4uPC9lbT5cXHJcXG48L3A+XFxyXFxuPGRpdiBjbGFzc05hbWU9XFxcImNvbC1sZy02IGNvbC14cy02XFxcIiAqbmdGb3I9XFxcImxldCByZSBvZiByZXNcXFwiPlxcclxcbiAgICA8IS0tPGRpdiBjbGFzc05hbWU9XFxcImNhcmQtaW1hZ2VcXFwiPjxpbWcgc3JjPVxcXCJ7e3JlLmltYWdlc1swXX19XFxcIiAvPjwvZGl2Pi0tPlxcclxcbiAgICA8ZGl2IGNsYXNzTmFtZT1cXFwiaW5mb1xcXCI+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUuY29kZX19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxhIGhyZWY9e3tyZS51cmx9fT57e3JlLnNvdXJjZX19PC9hPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUubmFtZX19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUucHJpY2V9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLnNpemVUb3RhbH19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUuc2l6ZVRvdGFsVW5pdH19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUuc2l6ZVRvdGFsVGV4dH19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2Pnt7cmUuYlxcclxcbiAgICAgICAgPGRpdj57e3JlLmJlZFJvb219fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLmJhdGhSb29tfX08L2Rpdj5cXHJcXG4gICAgICAgIDxkaXY+e3tyZS5zdG9yZXlzfX08L2Rpdj5cXHJcXG4gICAgICAgIDxkaXY+e3tyZS5wYXJraW5nU3BhY2V9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdj57e3JlLmRlc2N9fTwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2ZldGNoZGF0YS9mZXRjaGRhdGEuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIENvdW50ZXJDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ291bnRlckNvbXBvbmVudCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRDb3VudCA9IDA7XHJcbiAgICB9XHJcbiAgICBDb3VudGVyQ29tcG9uZW50LnByb3RvdHlwZS5pbmNyZW1lbnRDb3VudGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudENvdW50Kys7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvdW50ZXJDb21wb25lbnQ7XHJcbn0oKSk7XHJcbkNvdW50ZXJDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnY291bnRlcicsXHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vY291bnRlci5jb21wb25lbnQuaHRtbCcpXHJcbiAgICB9KVxyXG5dLCBDb3VudGVyQ29tcG9uZW50KTtcclxuZXhwb3J0cy5Db3VudGVyQ29tcG9uZW50ID0gQ291bnRlckNvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y291bnRlci5jb21wb25lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvY291bnRlci9jb3VudGVyLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxoMj5Db3VudGVyPC9oMj5cXG5cXG48cD5UaGlzIGlzIGEgc2ltcGxlIGV4YW1wbGUgb2YgYW4gQW5ndWxhciAyIGNvbXBvbmVudC48L3A+XFxuXFxuPHA+Q3VycmVudCBjb3VudDogPHN0cm9uZz57eyBjdXJyZW50Q291bnQgfX08L3N0cm9uZz48L3A+XFxuXFxuPGJ1dHRvbiAoY2xpY2spPVxcXCJpbmNyZW1lbnRDb3VudGVyKClcXFwiPkluY3JlbWVudDwvYnV0dG9uPlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvY291bnRlci9jb3VudGVyLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgaHR0cF8xID0gcmVxdWlyZShcIkBhbmd1bGFyL2h0dHBcIik7XHJcbnZhciBwbGF0Zm9ybV9icm93c2VyXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiKTtcclxudmFyIHBhZ2luZ18xID0gcmVxdWlyZShcIi4uL3N0cnVjdHVyZS9wYWdpbmdcIik7XHJcbnZhciBTZWFyY2hDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU2VhcmNoQ29tcG9uZW50KGh0dHAsIHNhbml0aXplcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wYWdpbmcgPSBuZXcgcGFnaW5nXzEuUGFnaW5nKCk7XHJcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcclxuICAgICAgICB0aGlzLnNhbml0aXplciA9IHNhbml0aXplcjtcclxuICAgICAgICB0aGlzLnBhZ2luZy5wYWdlTnVtYmVyID0gMTA7XHJcbiAgICAgICAgdGhpcy5wYWdpbmcuaXRlbVBlclBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoJy9hcGkvcmVhbGVzdGF0ZS9hbGwnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQgfHwgcmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRvY3VtZW50ZGIgcmV0dXJuIG51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWdpbmcuYWxsID0gcmVzdWx0Lmpzb24oKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBhZ2luZy5zaG93ID0gX3RoaXMucGFnaW5nLmFsbC5zbGljZSgwLCBfdGhpcy5wYWdpbmcuaXRlbVBlclBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVzID0gX3RoaXMucGFnaW5nLnNob3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFNlYXJjaENvbXBvbmVudC5wcm90b3R5cGUub25TY3JvbGwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XHJcbiAgICAgICAgICAgIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcclxuICAgICAgICAgICAgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubG9nID0gTWF0aC5mbG9vcihoZWlnaHQpICsgJyAnICsgTWF0aC5mbG9vcih3aW5kb3cuc2Nyb2xsWSkgKyAnICcgKyBNYXRoLmZsb29yKHNjcm9sbEhlaWdodCk7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3Ioc2Nyb2xsSGVpZ2h0KSAtIChNYXRoLmZsb29yKGhlaWdodCkgKyBNYXRoLmZsb29yKHdpbmRvdy5zY3JvbGxZKSkgPCAyKSB7XHJcbiAgICAgICAgICAgIHZhciBiZWdpbiA9IHRoaXMucGFnaW5nLml0ZW1QZXJQYWdlICogdGhpcy5wYWdpbmcucGFnZU51bWJlcjtcclxuICAgICAgICAgICAgdGhpcy5wYWdpbmcucGFnZU51bWJlcisrO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5wYWdpbmcuaXRlbVBlclBhZ2UgKiB0aGlzLnBhZ2luZy5wYWdlTnVtYmVyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gYmVnaW47IGkgPCBlbmQgJiYgaSA8IHRoaXMucGFnaW5nLmFsbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmcuc2hvdy5wdXNoKHRoaXMucGFnaW5nLmFsbFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2cgPSBcImVuZFwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBTZWFyY2hDb21wb25lbnQucHJvdG90eXBlLmdldEFycmF5TGVuZ3RoID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsLmxlbmd0aCA8IDIpXHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgfTtcclxuICAgIFNlYXJjaENvbXBvbmVudC5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMucGFyYW1zLlByaWNlTWF4ID0gKHRoaXMucGFyYW1zLlByaWNlTWF4ID09PSB1bmRlZmluZWQgfHwgdGhpcy5wYXJhbXMuUHJpY2VNYXggPT0gbnVsbCkgPyAwIDogdGhpcy5wYXJhbXMuUHJpY2VNYXg7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuUHJpY2VNaW4gPSAodGhpcy5wYXJhbXMuUHJpY2VNaW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzLnBhcmFtcy5QcmljZU1pbiA9PSBudWxsKSA/IDAgOiB0aGlzLnBhcmFtcy5QcmljZU1pbjtcclxuICAgICAgICB2YXIgYm9keSA9IEpTT04uc3RyaW5naWZ5KHRoaXMucGFyYW1zKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBodHRwXzEuSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgaHR0cF8xLlJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICB0aGlzLmh0dHAucG9zdCgnL2FwaS9yZWFsZXN0YXRlL3NlYXJjaCcsIGJvZHksIG9wdGlvbnMpLnN1YnNjcmliZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIF90aGlzLnBhZ2luZy5hbGwgPSByZXN1bHQuanNvbigpO1xyXG4gICAgICAgICAgICBfdGhpcy5wYWdpbmcuc2hvdyA9IF90aGlzLnBhZ2luZy5hbGwuc2xpY2UoMCwgX3RoaXMucGFnaW5nLml0ZW1QZXJQYWdlKTtcclxuICAgICAgICAgICAgX3RoaXMucmVzID0gX3RoaXMucGFnaW5nLnNob3c7XHJcbiAgICAgICAgICAgIF90aGlzLnBhZ2luZy5wYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2VhcmNoQ29tcG9uZW50O1xyXG59KCkpO1xyXG5TZWFyY2hDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnc2VhcmNoJyxcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9zZWFyY2guY29tcG9uZW50Lmh0bWwnKSxcclxuICAgICAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL3NlYXJjaC5jb21wb25lbnQuY3NzJyldXHJcbiAgICB9KSxcclxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbaHR0cF8xLkh0dHAsIHBsYXRmb3JtX2Jyb3dzZXJfMS5Eb21TYW5pdGl6ZXJdKVxyXG5dLCBTZWFyY2hDb21wb25lbnQpO1xyXG5leHBvcnRzLlNlYXJjaENvbXBvbmVudCA9IFNlYXJjaENvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VhcmNoLmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFBhZ2luZyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYWdpbmcoKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUGFnaW5nO1xyXG59KCkpO1xyXG5leHBvcnRzLlBhZ2luZyA9IFBhZ2luZztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnaW5nLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3N0cnVjdHVyZS9wYWdpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJcXHJcXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICA8Zm9ybSAjZm9ybT1cXFwibmdGb3JtXFxcIiAobmdTdWJtaXQpPVxcXCJzdWJtaXQoZm9ybS52YWx1ZSlcXFwiIGNsYXNzPVxcXCJmb3JtLWdyb3VwIHJvdyByZS1zZWFyY2gtZm9ybSBcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEgY29sLWxnMTIgbm9wYWRkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwiUHJpY2VNaW5cXFwiIG5nTW9kZWwgaWQ9XFxcIlByaWNlTWluXFxcIiBwbGFjZWhvbGRlcj1cXFwiTWluXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEgY29sLWxnMTIgbm9wYWRkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwiUHJpY2VNYXhcXFwiIG5nLWluaXQ9XFxcIjBcXFwiIG5nTW9kZWwgaWQ9XFxcIlByaWNlTWF4XFxcIiBwbGFjZWhvbGRlcj1cXFwiTWF4XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTIgY29sLWxnMTIgbm9wYWRkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGRsLWJhbmsgbmFtZT1cXFwiU291cmNlXFxcIiBuZ01vZGVsIGlkPVxcXCJTb3VyY2VcXFwiIG5nRGVmYXVsdENvbnRyb2w+PC9kZGwtYmFuaz5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTIgY29sLWxnMTIgbm9wYWRkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGRsLXByb3ZpbmNlIG5hbWU9XFxcIlByb3ZpbmNlXFxcIiBuZ01vZGVsIGlkPVxcXCJQcm92aW5jZVxcXCIgbmdEZWZhdWx0Q29udHJvbD48L2RkbC1wcm92aW5jZT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWluZm9cXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaFxcXCI+PC9zcGFuPjwvYnV0dG9uPlxcclxcbiAgICA8L2Zvcm0+XFxyXFxuPC9kaXY+XFxyXFxuPGRpdiAod2luZG93OnNjcm9sbCk9XFxcIm9uU2Nyb2xsKCRldmVudClcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgY29sLWxnLTcgcmUtY2FyZFxcXCIgKm5nRm9yPVxcXCJsZXQgcmUgb2YgcmVzOyBsZXQgaSA9IGluZGV4XFxcIiBbYXR0ci5kYXRhLWluZGV4XT1cXFwiaVxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyZS1pbWFnZS1jb250YWluZXIgY29sLWxnLTkgY29sLW1kLTlcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbWcgKm5nSWY9XFxcImdldEFycmF5TGVuZ3RoKHJlLmltYWdlcykgPT0gMFxcXCIgc3JjPVxcXCIvSW1hZ2VzL2RlZmF1bHQtdGh1bWJuYWlsLmpwZ1xcXCIgY2xhc3M9XFxcInJlLWltYWdlIGltZy1yZXNwb25zaXZlXFxcIiAvPlxcclxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcImNhcm91c2VsLXt7aX19XFxcIiBjbGFzcz1cXFwiY2Fyb3VzZWwgc2xpZGVcXFwiIGRhdGEtcmlkZT1cXFwiY2Fyb3VzZWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJvdXNlbC1pbm5lclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpdGVte3tqID09IDAgPyAnIGFjdGl2ZScgOiAnJ319XFxcIiAqbmdGb3I9XFxcImxldCBpbWFnZSBvZiByZS5pbWFnZXM7IGxldCBqID0gaW5kZXhcXFwiIFthdHRyLmRhdGEtaW5kZXhdPVxcXCJqXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwie3tpbWFnZX19XFxcIiBjbGFzcz1cXFwicmUtaW1hZ2UgaW1nLXJlc3BvbnNpdmVcXFwiIGZhbGxiYWNrLXNyYz1cXFwiL0ltYWdlcy9kZWZhdWx0LXRodW1ibmFpbC5qcGdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8YSAqbmdJZj1cXFwiZ2V0QXJyYXlMZW5ndGgocmUuaW1hZ2VzKSA+IDFcXFwiIGNsYXNzPVxcXCJsZWZ0IGNhcm91c2VsLWNvbnRyb2xcXFwiIGhyZWY9XFxcIiNjYXJvdXNlbC17e2l9fVxcXCIgZGF0YS1zbGlkZT1cXFwicHJldlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWxlZnRcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5QcmV2aW91czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgICAgICA8YSAqbmdJZj1cXFwiZ2V0QXJyYXlMZW5ndGgocmUuaW1hZ2VzKSA+IDFcXFwiIGNsYXNzPVxcXCJyaWdodCBjYXJvdXNlbC1jb250cm9sXFxcIiBocmVmPVxcXCIjY2Fyb3VzZWwte3tpfX1cXFwiIGRhdGEtc2xpZGU9XFxcIm5leHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPk5leHQ8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicmUtY2FyZC1kZXRhaWxzIGZpbGwgY29sLWxnLTMgY29sLW1kLTNcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgc3R5bGU9XFxcIiBjb2xvcjojNTg1ODU4O1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+e3tyZS5wcmljZSB8IG51bWJlcn19PC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj57e3JlLm1hcC5wcm92aW5jZX19PC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIiBzdHlsZT1cXFwiZm9udC1zaXplOjAuOGVtOyBjb2xvcjojOGM4YzhjO1xcXCI+e3tyZS5zaXplVG90YWwgKyBcXFwiIFxcXCIgKyByZS5zaXplVG90YWxVbml0fX08L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiIHN0eWxlPVxcXCJmb250LXNpemU6MC44ZW07IGNvbG9yOiM4YzhjOGM7XFxcIj57e3JlLm1hcC5kZXNjfX08L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiIHN0eWxlPVxcXCJmb250LXNpemU6MC44ZW07IGNvbG9yOiM4YzhjOGM7XFxcIj57e3JlLmJlZH19PC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHJlLWNhcmQtZ2x5cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XFxcInJlLmJlZFJvb21cXFwiIGNsYXNzPVxcXCJjb2wtbGctMTIgY29sLXhzLTEyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIHt7cmUuYmVkUm9vbX19XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYmVkXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9pPiZuYnNwO1xcclxcbiAgICAgICAgICAgICAgICAgICAge3tyZS5iYXRoUm9vbX19XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYmF0aFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvaT4mbmJzcDtcXHJcXG4gICAgICAgICAgICAgICAgICAgIHt7cmUucGFya2luZ1NwYWNlfX1cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jYXJcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8IS0tPGRpdj57e2xvZ319PC9kaXY+LS0+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRlYnVnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBkYXRhLXRvZ2dsZT1cXFwibW9kYWxcXFwiIFthdHRyLmRhdGEtdGFyZ2V0XT1cXFwiJyNtb2RhbC0nKyBpXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXRvZ2dsZT1cXFwibW9kYWxcXFwiIGRhdGEtdGFyZ2V0PVxcXCIjXFxcIiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiIGlkPVxcXCJtb2RhbC17e2l9fVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiPiZ0aW1lczs8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLWxnLTMgY29sLW1kLTEyIGNvbC14cy0xMlxcXCI+PHByZSBzdHlsZT1cXFwidGV4dC1hbGlnbjpsZWZ0OyBmb250LXNpemU6MC44ZW07XFxcIj57e3JlIHwganNvbiB9fTwvcHJlPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHByZSBbYXR0ci5wcmV0dHktanNvbl09XFxcInt7cmV9fVxcXCI+PC9wcmU+LS0+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiPkNsb3NlPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPCEtLTxwcmU+XFxyXFxue3tmb3JtLnZhbHVlIHwganNvbn19XFxyXFxuICAgIDwvcHJlPlxcclxcblxcclxcbjxwcmU+XFxyXFxue3tyZXMgfCBqc29ufX1cXHJcXG4gICAgPC9wcmU+XFxyXFxuPGg0PlN1Ym1pdHRlZDwvaDQ+XFxyXFxuPHByZT5cXHJcXG57e3ZhbHVlIHwganNvbiB9fVxcclxcbiAgICA8L3ByZT4tLT5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9zZWFyY2guY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zZWFyY2guY29tcG9uZW50LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY2Fyb3VzZWwtY29udHJvbC5sZWZ0LCAuY2Fyb3VzZWwtY29udHJvbC5yaWdodCB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmUgIWltcG9ydGFudDtcXHJcXG4gICAgZmlsdGVyOiBub25lICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcbltjbGFzcyo9XFxcImNvbC1cXFwiXSB7XFxyXFxuICAgIGZsb2F0OiBsZWZ0O1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcclxcbn1cXHJcXG5odG1sLCBib2R5IHtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG4uZmlsbCB7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuLm5vcGFkZGluZyB7XFxyXFxuICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcXHJcXG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcbi5yZS1zZWFyY2gtZm9ybVxcclxcbntcXHJcXG4gICAgbWFyZ2luOjE4cHg7XFxyXFxufVxcclxcblxcclxcbi5yZS1jYXJkIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcXHJcXG4gICAgbWFyZ2luOiAzcHggM3B4IDNweCAzcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuLnJlLWltYWdlLWNvbmdhaW5lciB7XFxyXFxuICAgIC8qaGVpZ2h0OjIwMHB4OyovXFxyXFxufVxcclxcbi5yZS1pbWFnZSB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmUtY2FyZC1kZXRhaWxzIHtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG4gICAgLnJlLWNhcmQtZGV0YWlscyAucm93IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6NXB4O1xcclxcbiAgICB9XFxyXFxuLnJlLWNhcmQtZ2x5cCB7XFxyXFxuICAgIGNvbG9yOiAjOGM4YzhjO1xcclxcbn1cXHJcXG4gICAgLnJlLWNhcmQtZ2x5cCAuZGVidWcge1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgcmlnaHQ6IDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiNteU1vZGFsIHtcXHJcXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1ib2R5IHtcXHJcXG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXHJcXG4gICAgaGVpZ2h0OiA5MCUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRlbnQge1xcclxcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcclxcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWRpYWxvZyB7XFxyXFxuICAgIG1hcmdpbjogMHB4IDBweCAwcHggMHB4O1xcclxcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcclxcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmd1aS9tYXBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAbmd1aS9tYXBcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgTWFwQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1hcENvbXBvbmVudCgpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xyXG4gICAgfVxyXG4gICAgTWFwQ29tcG9uZW50LnByb3RvdHlwZS5zaG93UmFuZG9tTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmFuZG9tTGF0LCByYW5kb21Mbmc7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICByYW5kb21MYXQgPSBNYXRoLnJhbmRvbSgpICogMC4wMDk5ICsgNDMuNzI1MDtcclxuICAgICAgICAgICAgcmFuZG9tTG5nID0gTWF0aC5yYW5kb20oKSAqIDAuMDA5OSArIC03OS43Njk5O1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKFtyYW5kb21MYXQsIHJhbmRvbUxuZ10pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNYXBDb21wb25lbnQucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmFuZG9tTGF0ID0gTWF0aC5yYW5kb20oKSAqIDAuMDA5OSArIDQzLjcyNTA7XHJcbiAgICAgICAgdmFyIHJhbmRvbUxuZyA9IE1hdGgucmFuZG9tKCkgKiAwLjAwOTkgKyAtNzkuNzY5OTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKFtyYW5kb21MYXQsIHJhbmRvbUxuZ10pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNYXBDb21wb25lbnQ7XHJcbn0oKSk7XHJcbk1hcENvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdteS1hcHAnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21hcC5jb21wb25lbnQuaHRtbCcpXHJcbiAgICB9KVxyXG5dLCBNYXBDb21wb25lbnQpO1xyXG5leHBvcnRzLk1hcENvbXBvbmVudCA9IE1hcENvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmNvbXBvbmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9zZWFyY2gvbWFwLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuZ3VpLW1hcCB6b29tPVxcXCIxNFxcXCIgY2VudGVyPVxcXCJCcmFtcHRvbiwgQ2FuYWRhXFxcIj5cXHJcXG4gICAgPG1hcmtlciAqbmdGb3I9XFxcImxldCBwb3Mgb2YgcG9zaXRpb25zXFxcIlxcclxcbiAgICAgICAgICAgIChjbGljayk9XFxcInNob3dJbmZvV2luZG93KCRldmVudClcXFwiXFxyXFxuICAgICAgICAgICAgW3Bvc2l0aW9uXT1cXFwicG9zXFxcIj48L21hcmtlcj5cXHJcXG48L25ndWktbWFwPlxcclxcbjxidXR0b24gKGNsaWNrKT1cXFwic2hvd1JhbmRvbU1hcmtlcnMoKVxcXCI+U2hvdyBSYW5kb20gTWFya2VyczwvYnV0dG9uPlxcclxcbjxiciAvPlxcclxcbjxidXR0b24gKGNsaWNrKT1cXFwiYWRkTWFya2VyKClcXFwiPkFkZCBNYXJrZXI8L2J1dHRvbj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9tYXAuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcclxudmFyIERETFByb3ZpbmNlQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERETFByb3ZpbmNlQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERETFByb3ZpbmNlQ29tcG9uZW50O1xyXG59KCkpO1xyXG5ERExQcm92aW5jZUNvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgY29yZV8xLkNvbXBvbmVudCh7XHJcbiAgICAgICAgc2VsZWN0b3I6ICdkZGwtcHJvdmluY2UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3Byb3ZpbmNlLmNvbXBvbmVudC5odG1sJylcclxuICAgIH0pXHJcbl0sIERETFByb3ZpbmNlQ29tcG9uZW50KTtcclxuZXhwb3J0cy5ERExQcm92aW5jZUNvbXBvbmVudCA9IERETFByb3ZpbmNlQ29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm92aW5jZS5jb21wb25lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3Byb3ZpbmNlLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzZWxlY3QgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgIDxvcHRpb24gc2VsZWN0ZWQ9XFxcInNlbGVjdGVkXFxcIiB2YWx1ZT1cXFwiXFxcIj4tIOC4l+C4seC5ieC4h+C4q+C4oeC4lCAtXFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4o+C4sOC4muC4teC5iFxcXCI+4LiB4Lij4Liw4Lia4Li14LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4o+C4uOC4h+C5gOC4l+C4nuC4oeC4q+C4suC4meC4hOC4o1xcXCI+4LiB4Lij4Li44LiH4LmA4LiX4Lie4Lih4Lir4Liy4LiZ4LiE4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4suC4jeC4iOC4meC4muC4uOC4o+C4tVxcXCI+4LiB4Liy4LiN4LiI4LiZ4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4suC4rOC4quC4tOC4meC4mOC4uOC5jFxcXCI+4LiB4Liy4Lis4Liq4Li04LiZ4LiY4Li44LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4geC4s+C5geC4nuC4h+C5gOC4nuC4iuC4o1xcXCI+4LiB4Liz4LmB4Lie4LiH4LmA4Lie4LiK4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4guC4reC4meC5geC4geC5iOC4mVxcXCI+4LiC4Lit4LiZ4LmB4LiB4LmI4LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iOC4seC4meC4l+C4muC4uOC4o+C4tVxcXCI+4LiI4Lix4LiZ4LiX4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4ieC4sOC5gOC4iuC4tOC4h+C5gOC4l+C4o+C4slxcXCI+4LiJ4Liw4LmA4LiK4Li04LiH4LmA4LiX4Lij4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4peC4muC4uOC4o+C4tVxcXCI+4LiK4Lil4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4seC4ouC4meC4suC4l1xcXCI+4LiK4Lix4Lii4LiZ4Liy4LiXPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4seC4ouC4oOC4ueC4oeC4tFxcXCI+4LiK4Lix4Lii4Lig4Li54Lih4Li0PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4iuC4uOC4oeC4nuC4o1xcXCI+4LiK4Li44Lih4Lie4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4iuC4teC4ouC4h+C4o+C4suC4olxcXCI+4LmA4LiK4Li14Lii4LiH4Lij4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4iuC4teC4ouC4h+C5g+C4q+C4oeC5iFxcXCI+4LmA4LiK4Li14Lii4LiH4LmD4Lir4Lih4LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4leC4o+C4seC4h1xcXCI+4LiV4Lij4Lix4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4leC4o+C4suC4lFxcXCI+4LiV4Lij4Liy4LiUPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4leC4suC4gVxcXCI+4LiV4Liy4LiBPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4meC4suC4ouC4gVxcXCI+4LiZ4LiE4Lij4LiZ4Liy4Lii4LiBPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4m+C4kOC4oVxcXCI+4LiZ4LiE4Lij4Lib4LiQ4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4nuC4meC4oVxcXCI+4LiZ4LiE4Lij4Lie4LiZ4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4o+C4suC4iuC4quC4teC4oeC4slxcXCI+4LiZ4LiE4Lij4Lij4Liy4LiK4Liq4Li14Lih4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4qOC4o+C4teC4mOC4o+C4o+C4oeC4o+C4suC4ilxcXCI+4LiZ4LiE4Lij4Lio4Lij4Li14LiY4Lij4Lij4Lih4Lij4Liy4LiKPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4hOC4o+C4quC4p+C4o+C4o+C4hOC5jFxcXCI+4LiZ4LiE4Lij4Liq4Lin4Lij4Lij4LiE4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4meC4l+C4muC4uOC4o+C4tVxcXCI+4LiZ4LiZ4LiX4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC4o+C4suC4mOC4tOC4p+C4suC4qlxcXCI+4LiZ4Lij4Liy4LiY4Li04Lin4Liy4LiqPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4meC5iOC4suC4mVxcXCI+4LiZ4LmI4Liy4LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4muC4tuC4h+C4geC4suC4rFxcXCI+4Lia4Li24LiH4LiB4Liy4LisPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4muC4uOC4o+C4teC4o+C4seC4oeC4ouC5jFxcXCI+4Lia4Li44Lij4Li14Lij4Lix4Lih4Lii4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4l+C4uOC4oeC4mOC4suC4meC4tVxcXCI+4Lib4LiX4Li44Lih4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4o+C4sOC4iOC4p+C4muC4hOC4teC4o+C4teC4guC4seC4meC4mOC5jFxcXCI+4Lib4Lij4Liw4LiI4Lin4Lia4LiE4Li14Lij4Li14LiC4Lix4LiZ4LiY4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4o+C4suC4iOC4teC4meC4muC4uOC4o+C4tVxcXCI+4Lib4Lij4Liy4LiI4Li14LiZ4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4m+C4seC4leC4leC4suC4meC4tVxcXCI+4Lib4Lix4LiV4LiV4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4o+C4sOC4meC4hOC4o+C4qOC4o+C4teC4reC4ouC4uOC4mOC4ouC4slxcXCI+4Lie4Lij4Liw4LiZ4LiE4Lij4Lio4Lij4Li14Lit4Lii4Li44LiY4Lii4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4sOC5gOC4ouC4slxcXCI+4Lie4Liw4LmA4Lii4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4seC4h+C4h+C4slxcXCI+4Lie4Lix4LiH4LiH4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4seC4l+C4peC4uOC4h1xcXCI+4Lie4Lix4LiX4Lil4Li44LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4tOC4iOC4tOC4leC4o1xcXCI+4Lie4Li04LiI4Li04LiV4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4nuC4tOC4qeC4k+C4uOC5guC4peC4gVxcXCI+4Lie4Li04Lip4LiT4Li44LmC4Lil4LiBPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4nuC4iuC4o+C4muC4uOC4o+C4tVxcXCI+4LmA4Lie4LiK4Lij4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4nuC4iuC4o+C4muC4ueC4o+C4k+C5jFxcXCI+4LmA4Lie4LiK4Lij4Lia4Li54Lij4LiT4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5geC4nuC4o+C5iFxcXCI+4LmB4Lie4Lij4LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4oOC4ueC5gOC4geC5h+C4lVxcXCI+4Lig4Li54LmA4LiB4LmH4LiVPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4oeC4q+C4suC4quC4suC4o+C4hOC4suC4oVxcXCI+4Lih4Lir4Liy4Liq4Liy4Lij4LiE4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4oeC4uOC4geC4lOC4suC4q+C4suC4o1xcXCI+4Lih4Li44LiB4LiU4Liy4Lir4Liy4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5geC4oeC5iOC4ruC5iOC4reC4h+C4quC4reC4mVxcXCI+4LmB4Lih4LmI4Liu4LmI4Lit4LiH4Liq4Lit4LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4ouC5guC4quC4mOC4o1xcXCI+4Lii4LmC4Liq4LiY4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4ouC4sOC4peC4slxcXCI+4Lii4Liw4Lil4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C5ieC4reC4ouC5gOC4reC5h+C4lFxcXCI+4Lij4LmJ4Lit4Lii4LmA4Lit4LmH4LiUPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C4sOC4meC4reC4h1xcXCI+4Lij4Liw4LiZ4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C4sOC4ouC4reC4h1xcXCI+4Lij4Liw4Lii4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4o+C4suC4iuC4muC4uOC4o+C4tVxcXCI+4Lij4Liy4LiK4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4peC4nuC4muC4uOC4o+C4tVxcXCI+4Lil4Lie4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4peC4s+C4m+C4suC4h1xcXCI+4Lil4Liz4Lib4Liy4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4peC4s+C4nuC4ueC4mVxcXCI+4Lil4Liz4Lie4Li54LiZPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC5gOC4peC4olxcXCI+4LmA4Lil4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4qOC4o+C4teC4quC4sOC5gOC4geC4qVxcXCI+4Lio4Lij4Li14Liq4Liw4LmA4LiB4LipPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4geC4peC4meC4hOC4o1xcXCI+4Liq4LiB4Lil4LiZ4LiE4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4h+C4guC4peC4slxcXCI+4Liq4LiH4LiC4Lil4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4leC4ueC4pVxcXCI+4Liq4LiV4Li54LilPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4oeC4uOC4l+C4o+C4m+C4o+C4suC4geC4suC4o1xcXCI+4Liq4Lih4Li44LiX4Lij4Lib4Lij4Liy4LiB4Liy4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4oeC4uOC4l+C4o+C4quC4h+C4hOC4o+C4suC4oVxcXCI+4Liq4Lih4Li44LiX4Lij4Liq4LiH4LiE4Lij4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4oeC4uOC4l+C4o+C4quC4suC4hOC4o1xcXCI+4Liq4Lih4Li44LiX4Lij4Liq4Liy4LiE4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4o+C4sOC5geC4geC5ieC4p1xcXCI+4Liq4Lij4Liw4LmB4LiB4LmJ4LinPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4o+C4sOC4muC4uOC4o+C4tVxcXCI+4Liq4Lij4Liw4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4tOC4h+C4q+C5jOC4muC4uOC4o+C4tVxcXCI+4Liq4Li04LiH4Lir4LmM4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC5guC4guC4l+C4seC4olxcXCI+4Liq4Li44LmC4LiC4LiX4Lix4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC4nuC4o+C4o+C4k+C4muC4uOC4o+C4tVxcXCI+4Liq4Li44Lie4Lij4Lij4LiT4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC4o+C4suC4qeC4juC4o+C5jOC4mOC4suC4meC4tVxcXCI+4Liq4Li44Lij4Liy4Lip4LiO4Lij4LmM4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4quC4uOC4o+C4tOC4meC4l+C4o+C5jFxcXCI+4Liq4Li44Lij4Li04LiZ4LiX4Lij4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4q+C4meC4reC4h+C4hOC4suC4olxcXCI+4Lir4LiZ4Lit4LiH4LiE4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4q+C4meC4reC4h+C4muC4seC4p+C4peC4s+C4oOC4uVxcXCI+4Lir4LiZ4Lit4LiH4Lia4Lix4Lin4Lil4Liz4Lig4Li5PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC5iOC4suC4h+C4l+C4reC4h1xcXCI+4Lit4LmI4Liy4LiH4LiX4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4s+C4meC4suC4iOC5gOC4iOC4o+C4tOC4jVxcXCI+4Lit4Liz4LiZ4Liy4LiI4LmA4LiI4Lij4Li04LiNPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4lOC4o+C4mOC4suC4meC4tVxcXCI+4Lit4Li44LiU4Lij4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4leC4o+C4lOC4tOC4leC4luC5jFxcXCI+4Lit4Li44LiV4Lij4LiU4Li04LiV4LiW4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4l+C4seC4ouC4mOC4suC4meC4tVxcXCI+4Lit4Li44LiX4Lix4Lii4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIuC4reC4uOC4muC4peC4o+C4suC4iuC4mOC4suC4meC4tVxcXCI+4Lit4Li44Lia4Lil4Lij4Liy4LiK4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuPC9zZWxlY3Q+XFxyXFxuXFxyXFxuPCEtLTxzZWxlY3QgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxyXFxuICAgIDxvcHRpb24gc2VsZWN0ZWQ9XFxcInNlbGVjdGVkXFxcIiB2YWx1ZT1cXFwiMFxcXCI+LSDguJfguLHguYnguIfguKvguKHguJQgLTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI4MVxcXCI+4LiB4Lij4Liw4Lia4Li14LmIPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjEwXFxcIj7guIHguKPguLjguIfguYDguJfguJ7guKHguKvguLLguJnguITguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzFcXFwiPuC4geC4suC4jeC4iOC4meC4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0NlxcXCI+4LiB4Liy4Lis4Liq4Li04LiZ4LiY4Li44LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjYyXFxcIj7guIHguLPguYHguJ7guIfguYDguJ7guIrguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNDBcXFwiPuC4guC4reC4meC5geC4geC5iOC4mTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIyMlxcXCI+4LiI4Lix4LiZ4LiX4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjI0XFxcIj7guInguLDguYDguIrguLTguIfguYDguJfguKPguLI8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMjBcXFwiPuC4iuC4peC4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIxOFxcXCI+4LiK4Lix4Lii4LiZ4Liy4LiXPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjM2XFxcIj7guIrguLHguKLguKDguLnguKHguLQ8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiODZcXFwiPuC4iuC4uOC4oeC4nuC4ozwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI1N1xcXCI+4LmA4LiK4Li14Lii4LiH4Lij4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjUwXFxcIj7guYDguIrguLXguKLguIfguYPguKvguKHguYg8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiOTJcXFwiPuC4leC4o+C4seC4hzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIyM1xcXCI+4LiV4Lij4Liy4LiUPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjYzXFxcIj7guJXguLLguIE8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMjZcXFwiPuC4meC4hOC4o+C4meC4suC4ouC4gTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI3M1xcXCI+4LiZ4LiE4Lij4Lib4LiQ4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjQ4XFxcIj7guJnguITguKPguJ7guJnguKE8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMzBcXFwiPuC4meC4hOC4o+C4o+C4suC4iuC4quC4teC4oeC4sjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI4MFxcXCI+4LiZ4LiE4Lij4Lio4Lij4Li14LiY4Lij4Lij4Lih4Lij4Liy4LiKPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjYwXFxcIj7guJnguITguKPguKrguKfguKPguKPguITguYw8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTJcXFwiPuC4meC4meC4l+C4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI5NlxcXCI+4LiZ4Lij4Liy4LiY4Li04Lin4Liy4LiqPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjU1XFxcIj7guJnguYjguLLguJk8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMzhcXFwiPuC4muC4tuC4h+C4geC4suC4rDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIzMVxcXCI+4Lia4Li44Lij4Li14Lij4Lix4Lih4Lii4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjEzXFxcIj7guJvguJfguLjguKHguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzdcXFwiPuC4m+C4o+C4sOC4iOC4p+C4muC4hOC4teC4o+C4teC4guC4seC4meC4mOC5jDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIyNVxcXCI+4Lib4Lij4Liy4LiI4Li14LiZ4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjk0XFxcIj7guJvguLHguJXguJXguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTRcXFwiPuC4nuC4o+C4sOC4meC4hOC4o+C4qOC4o+C4teC4reC4ouC4uOC4mOC4ouC4sjwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI1NlxcXCI+4Lie4Liw4LmA4Lii4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjgyXFxcIj7guJ7guLHguIfguIfguLI8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiOTNcXFwiPuC4nuC4seC4l+C4peC4uOC4hzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI2NlxcXCI+4Lie4Li04LiI4Li04LiV4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjY1XFxcIj7guJ7guLTguKnguJPguLjguYLguKXguIE8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzZcXFwiPuC5gOC4nuC4iuC4o+C4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI2N1xcXCI+4LmA4Lie4LiK4Lij4Lia4Li54Lij4LiT4LmMPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjU0XFxcIj7guYHguJ7guKPguYg8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiODNcXFwiPuC4oOC4ueC5gOC4geC5h+C4lTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0NFxcXCI+4Lih4Lir4Liy4Liq4Liy4Lij4LiE4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjQ5XFxcIj7guKHguLjguIHguJTguLLguKvguLLguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNThcXFwiPuC5geC4oeC5iOC4ruC5iOC4reC4h+C4quC4reC4mTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIzNVxcXCI+4Lii4LmC4Liq4LiY4LijPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjk1XFxcIj7guKLguLDguKXguLI8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNDVcXFwiPuC4o+C5ieC4reC4ouC5gOC4reC5h+C4lDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI4NVxcXCI+4Lij4Liw4LiZ4Lit4LiHPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjIxXFxcIj7guKPguLDguKLguK3guIc8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNzBcXFwiPuC4o+C4suC4iuC4muC4uOC4o+C4tTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIxNlxcXCI+4Lil4Lie4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjUyXFxcIj7guKXguLPguJvguLLguIc8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNTFcXFwiPuC4peC4s+C4nuC4ueC4mTwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0MlxcXCI+4LmA4Lil4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjMzXFxcIj7guKjguKPguLXguKrguLDguYDguIHguKk8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNDdcXFwiPuC4quC4geC4peC4meC4hOC4ozwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI5MFxcXCI+4Liq4LiH4LiC4Lil4LiyPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjkxXFxcIj7guKrguJXguLnguKU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTFcXFwiPuC4quC4oeC4uOC4l+C4o+C4m+C4o+C4suC4geC4suC4ozwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI3NVxcXCI+4Liq4Lih4Li44LiX4Lij4Liq4LiH4LiE4Lij4Liy4LihPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjc0XFxcIj7guKrguKHguLjguJfguKPguKrguLLguITguKM8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMjdcXFwiPuC4quC4o+C4sOC5geC4geC5ieC4pzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIxOVxcXCI+4Liq4Lij4Liw4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjE3XFxcIj7guKrguLTguIfguKvguYzguJrguLjguKPguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNjRcXFwiPuC4quC4uOC5guC4guC4l+C4seC4ojwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI3MlxcXCI+4Liq4Li44Lie4Lij4Lij4LiT4Lia4Li44Lij4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjg0XFxcIj7guKrguLjguKPguLLguKnguI7guKPguYzguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMzJcXFwiPuC4quC4uOC4o+C4tOC4meC4l+C4o+C5jDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI0M1xcXCI+4Lir4LiZ4Lit4LiH4LiE4Liy4LiiPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjM5XFxcIj7guKvguJnguK3guIfguJrguLHguKfguKXguLPguKDguLk8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiMTVcXFwiPuC4reC5iOC4suC4h+C4l+C4reC4hzwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCIzN1xcXCI+4Lit4Liz4LiZ4Liy4LiI4LmA4LiI4Lij4Li04LiNPC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjQxXFxcIj7guK3guLjguJTguKPguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG4gICAgPG9wdGlvbiB2YWx1ZT1cXFwiNTNcXFwiPuC4reC4uOC4leC4o+C4lOC4tOC4leC4luC5jDwvb3B0aW9uPlxcclxcbiAgICA8b3B0aW9uIHZhbHVlPVxcXCI2MVxcXCI+4Lit4Li44LiX4Lix4Lii4LiY4Liy4LiZ4Li1PC9vcHRpb24+XFxyXFxuICAgIDxvcHRpb24gdmFsdWU9XFxcIjM0XFxcIj7guK3guLjguJrguKXguKPguLLguIrguJjguLLguJnguLU8L29wdGlvbj5cXHJcXG48L3NlbGVjdD4tLT5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9wcm92aW5jZS5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpO1xyXG52YXIgRERMQmFua0NvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBERExCYW5rQ29tcG9uZW50KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERETEJhbmtDb21wb25lbnQ7XHJcbn0oKSk7XHJcbkRETEJhbmtDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgIHNlbGVjdG9yOiAnZGRsLWJhbmsnLFxyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2JhbmsuY29tcG9uZW50Lmh0bWwnKVxyXG4gICAgfSlcclxuXSwgRERMQmFua0NvbXBvbmVudCk7XHJcbmV4cG9ydHMuRERMQmFua0NvbXBvbmVudCA9IERETEJhbmtDb21wb25lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhbmsuY29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9iYW5rLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIlxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiBjb2wtbGctNyByZS1jYXJkXFxcIiAqbmdGb3I9XFxcImxldCByZSBvZiByZXM7IGxldCBpID0gaW5kZXhcXFwiIFthdHRyLmRhdGEtaW5kZXhdPVxcXCJpXFxcIj5cXHJcXG5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3NlYXJjaC9iYW5rLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9