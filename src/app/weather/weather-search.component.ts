import {Component} from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { WeatherService } from './weather.service';
import { WeatherItem } from './weather-item';
import { Subject } from 'rxjs/Subject';
@Component({
    selector:'weather-search',
    template: `
            <section class="weather-search">
                <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
                    <label for="city">City</label>
                    <input formControlName="location" type="text" id="city" required (keyup)="onSearchLocation($event.target.value)">
                    <button type="submit">Add City</button>
                </form>
                <div>
                    <span class="info">City found:</span>{{data.name}}
                </div>
            </section>
    `,
    styleUrls: ['../../assets/app.scss']
    
})
export class WeatherSearchComponent implements OnInit{
    form:FormGroup;
    data:any = {};
    private searchStream = new Subject<string>();
    constructor(private _fb:FormBuilder, private _weatherService:WeatherService){

    }

    ngOnInit(){
        this.form = this._fb.group({
            location: this._fb.control('')
        });

        this.searchStream
        .debounceTime(2000)
        .distinctUntilChanged()
        .switchMap((input:string) => this._weatherService.searchWeatherData(input))
        .subscribe(data =>{
            this.data = data;
        },(error) =>{
            console.log(error)
        })
    }
    onSubmit(form: FormGroup){
        this._weatherService.searchWeatherData(form.value.location)
                .subscribe(data =>{
                    console.log(data);
                    const weatherItem = new WeatherItem(this.data.name,this.data.weather[0].description,this.data.main.temp);
                    this._weatherService.addWeatherItem(weatherItem);
                })
    }

    onSearchLocation(cityName: string){
        console.log(cityName);
        if(cityName !== ''){
            this.searchStream.next(cityName);
        }
        

    }

 
}
