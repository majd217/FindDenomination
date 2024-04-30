import { Denomination } from './../interfaces/denominationInterface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DenominationService {
  
    backendURL = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    calculateDenomination(amount: number): Observable<Object> {
        const options = {params: new HttpParams().set('amount', amount)}
        return this.http.get(this.backendURL + '/denomination/calculation', options)
    }

    calculateDenominationDifference(newamount: number, oldamount: number): Observable<Object> {
        const options = {params: new HttpParams().set('newAmount', newamount).set('oldAmount', oldamount)}
        return this.http.get(this.backendURL + '/denomination/difference', options)
    }

}