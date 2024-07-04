import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private readMeUrl: string = "https://raw.githubusercontent.com/box-lin/box-lin.github.io/main/README.md";
  constructor(private http: HttpClient) { }

  getReadMeContent() : Observable<string>{
    return this.http.get(this.readMeUrl, { responseType: 'text' });
  }
}
