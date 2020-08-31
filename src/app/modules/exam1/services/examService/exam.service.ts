import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ListData } from '../../models/ListData';
import { Result } from '../../models/Results';
@Injectable({
  providedIn: 'root'
})

export class ExamService {
  private url;

  constructor(private httpClient: HttpClient) {
    this.url = 'https://my-json-server.typicode.com/stefani0/GreeceTest/customers/';
  }


  getData(): Observable<Result<ListData>> {
    return this.httpClient.get<Result<ListData>>(
      `${this.url}`
    )
  }

  // getData(){
  //   console.log("ngOnIwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwnit ngOnInit");
  // }


  deleteData(params) {
   // const id = params.id;
    //console.log("params from service", params)
    return this.httpClient.delete(`${this.url}${params}`)
      .pipe(map((response: any) => {  
        console.log("response", response)
      }));
  }

  updatePost(postData) {   
    const id = postData.id;
    return this.httpClient.put(`${this.url}${id}`, postData)
  }

  addPost(postData): Observable<any> {
    return this.httpClient.post(`${this.url}`, postData);
  }


}
