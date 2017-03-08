import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GetCheckers{

    constructor(public http:Http){

    }

    getCheckers(): any{
        this.http.get("../checkerboard.json").subscribe(result =>{
            return result.json();
        })
    }

}