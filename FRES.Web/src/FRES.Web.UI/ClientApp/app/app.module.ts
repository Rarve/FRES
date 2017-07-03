import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { SearchComponent } from './components/search/search.component';
import { MapComponent } from './components/search/map.component';
import { DDLProvinceComponent } from './components/search/province.component';
import { DDLBankComponent } from './components/search/bank.component';
import { NguiModule, NguiMapModule }  from '@ngui/ngui';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        SearchComponent,
        HomeComponent,
        MapComponent,
        DDLProvinceComponent,
        DDLBankComponent
    ],
    imports: [
        BrowserModule, FormsModule,
        NguiModule, 
        NguiMapModule.forRoot({
            apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing'
        }),
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'search', component: SearchComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}