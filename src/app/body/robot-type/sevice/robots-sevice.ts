import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class RobotsService{

    API_URL_Canal="http://localhost:8080/API-DashBoard/canal.php";

    constructor(private httpClient: HttpClient){}

    getCanals(){
        return this.httpClient.get(this.API_URL_Canal);
    }
}
