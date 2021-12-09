import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pattern } from 'src/models/pattern';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  constructor(private http: HttpClient) {
  }

  getPatterns(): Observable<Pattern[]> {
   return this.http.get<Pattern[]>('http://localhost:8080/patterns');
  }

  savePatterns(pattern: Pattern): Observable<void> {
   return this.http.post<void>('http://localhost:8080/patterns', pattern);
  }
}
