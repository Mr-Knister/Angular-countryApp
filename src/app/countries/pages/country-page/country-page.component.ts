import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(
    private activatedRoute:ActivatedRoute,
    private countriesService:CountriesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params
    //   .subscribe((params) =>
    //     console.log({ params: params['id'] })
    //   );
    this.activatedRoute.params
      .pipe(
        // tap(console.log)
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        this.country = country;
        return;
      });
      // .subscribe(({id}) => {
      //   this.countriesService.searchCountryByAlphaCode(id)
      //     .subscribe( country => {
      //       console.log({country})
      //     });
      // });
  }

  searchCountry(code:string) {
    this.countriesService.searchCountryByAlphaCode(code)
      .subscribe( country => {
        console.log({country})
      });
  }

}
