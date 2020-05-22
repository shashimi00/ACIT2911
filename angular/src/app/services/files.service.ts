import { Injectable } from '@angular/core';
// import { Http, Headers, ResponseContentType } from 'http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
      constructor(){ }
  // constructor(private http: Http) { }
  downloadPDF(filename, filetype): any {
    // return this.http.get('http://127.0.0.1:1337/file/' + filename,
    // { responseType: ResponseContentType.Blob });
  }
  showFileNames() {
    // return this.http.get('http://127.0.0.1:3000/files');
  }
}
