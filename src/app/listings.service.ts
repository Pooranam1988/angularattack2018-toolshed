import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../environments/environment";

@Injectable()
export class ListingsService {

  constructor(private http: HttpClient) {
  }

  createListing(body): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/listings`, body)
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/listings`)
  }
}
