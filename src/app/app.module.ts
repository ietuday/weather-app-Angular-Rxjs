import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WeatherListComponent } from './weather/weather-list.component';
import { WeatherItemComponent } from './weather/weather-item.component';
import { WeatherSearchComponent } from './weather/weather-search.component';
import { WeatherService } from './weather/weather.service';
import { SidebarComponent } from './sidebar.component';
import { ProfileService } from './profile.service';
@NgModule({
  declarations: [
    AppComponent,
    WeatherItemComponent,
    WeatherListComponent,
    WeatherSearchComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService,ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
