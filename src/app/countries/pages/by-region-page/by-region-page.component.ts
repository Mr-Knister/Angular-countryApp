import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'country-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  // public region?:Region;
  public countries:Country[] = [];
  public isLoading:boolean = false;
  public regions:Region[] = ['Africa','America','Asia','Europe','Oceania'];
  public selectedRegion?:Region;

  constructor(private countriesService:CountriesService) {}

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  searchByRegion(term:Region):void {
    this.isLoading = true;
    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
    this.selectedRegion = term;
  }
}
