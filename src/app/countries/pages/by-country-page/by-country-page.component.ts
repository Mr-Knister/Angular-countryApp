import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public term:string = '';
  public countries:Country[] = [];
  public isLoading:boolean = false;

  constructor(private countriesService:CountriesService){}

  ngOnInit(): void {
    this.term = this.countriesService.cacheStore.byCountry.term;
    this.countries = this.countriesService.cacheStore.byCountry.countries;
  }

  searchByCountry(term:string):void {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
