import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class NlpService {
  
  constructor(private http: HttpClient) { }
 
  nlpSentimentAnalysis(comment:string){
    var text = '{"document":{"type":"PLAIN_TEXT", "language": "EN","content":"' + comment + '"},"encodingType":"UTF8"}';
    var data = JSON.parse(text);
    var apiEndpoint = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=';
    return this.http.post(apiEndpoint + environment.gCloudProjectApiKey,data);
  }
}