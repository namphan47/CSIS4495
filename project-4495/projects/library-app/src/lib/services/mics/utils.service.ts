import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _HttpClient: HttpClient) {
  }

  public getJSON(url: string): Observable<any> {
    return this._HttpClient.get(url);
  }
}
