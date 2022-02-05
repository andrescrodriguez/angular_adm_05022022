import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileServerImagenService {

  public progress: number;
  public message: string;
  apiURL = environment.apiURL + '/imagen';
  
  constructor(private http: HttpClient) { }

  upload(file) {
    
    if (file.length === 0) {
      return;
    }
    
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    // console.log("llego");
    return this.http.post(this.apiURL + "/Upload", formData);
  }
}
