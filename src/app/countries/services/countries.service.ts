import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';
  public cacheStore:CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  };

  constructor(private http:HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage():void {
    localStorage.setItem('cacheStoreCountry', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage():void {
    if (!localStorage.getItem('cacheStoreCountry')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStoreCountry')!);
  }

  private getCountriesRequest(url:string):Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        // delay(2000)
      );
  }


  searchCountryByAlphaCode(code:string):Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(term:string):Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        // tap(countries => this.cacheStore.byCapital.countries = countries)
        // tap(countries => this.cacheStore.byCapital = { term: term, countries: countries})
        tap(countries => this.cacheStore.byCapital = { term, countries}),
        tap(() => this.saveToLocalStorage())
      );
    // return this.http.get<Country[]>(url)
    //   .pipe(
    //     catchError(() => of([]))
    //     // tap(countries => console.log('Paso por el tap 1', countries)),
    //     // map(countries => []),
    //     // tap(countries => console.log('Paso por el tap 2', countries))
    //   );
  }

  searchCountry(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term, countries}),
        tap(() => this.saveToLocalStorage())
      );
    // return this.http.get<Country[]>(url)
    //   .pipe(
    //     catchError(() => of([]))
    //   );
  }

  searchRegion(term:Region):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region: term, countries}),
        tap(() => this.saveToLocalStorage())
      );
    // return this.http.get<Country[]>(url)
    //   .pipe(
    //     catchError(() => of([]))
    //   );
  }

}
