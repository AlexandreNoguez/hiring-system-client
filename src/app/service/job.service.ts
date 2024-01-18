import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api';

  createNewJob(job: any): Observable<any> {

    return this.http.post(`${this.baseUrl}/job/register`, job, {responseType: 'text'})
      .pipe(tap((response: string) => {

      })
    );
  }

  getAllJobs(param: string): Observable<ArrayBuffer> {
    const options = {
      params: new HttpParams().set('page', '0').set('size', '20'),
      responseType: 'json',
    };

    // @ts-ignore
    return this.http.get<any>(`${this.baseUrl}/job/getAllByParams?title=${param}`, options);
  }

  candidateApplication(jobId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/job/application/${jobId}`, { title: null }, {responseType: 'text'});
  }

}
