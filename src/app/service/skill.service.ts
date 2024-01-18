import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Skill} from "../types/SkillTypes";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private http: HttpClient
  ) {
  }

  private baseUrl = 'http://localhost:8080/api';

  createNewSkill(skill: string): Observable<any> {

    return this.http.post(`${this.baseUrl}/skill/register`, skill, {responseType: 'text'}).pipe(
      tap((response: string) => {

      })
    );
  }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/skill`).pipe(
      tap(skills => {}),
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
