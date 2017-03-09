import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BoardService {
    constructor(public http:Http){
      this.http = http;
    }

    getBoard() {
      this.http.get("http://localhost:8080/board").subscribe(result => {
        this.responseHolder(status, result.json());
        return result.json();
      });
    }

    responseHolder(status, response){
      if(response.error) {
        console.log("error " + response.error.message);
      } else {
        console.log("success", response);
      }
    }
}
