import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GridHttpService {
    private url = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json';  // URL to data
    constructor(private http: HttpClient) { }
    getOlympicData(): Observable<any> {
        return this.http.get<any>(this.url);
    }
}
