import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase().trim();

    return this.http
      .get<RESTCountry[]>(`${environment.API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError((err) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con esa query: ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase().trim();

    return this.http
      .get<RESTCountry[]>(`${environment.API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError((err) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con esa query: ${query}`)
          );
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http
      .get<RESTCountry[]>(`${environment.API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError((err) => {
          return throwError(
            () =>
              new Error(
                `No se pudo obtener el pais con ese alpha code: ${code}`
              )
          );
        })
      );
  }
}
