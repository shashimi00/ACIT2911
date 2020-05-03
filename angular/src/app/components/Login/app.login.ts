import { Component }       from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-child',
  templateUrl: './login.html'
})

export class Login {
  username: string = '';
  password: string = '';
  token: string;
  message: string;
  errorMessage: string ='';

  constructor(private http: HttpClient) {
  }

  login() {
    let url = "http://localhost:1337/auth";

    // This free online service receives post submissions.
    this.http.post(url, {
      username:  this.username,
      password:  this.password,
    })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log(JSON.stringify(data));

          if(data["token"]  != null)  {
            this.token = data["token"];
            sessionStorage.setItem('auth_token', data["token"]);
            this.message = "The user has been logged in.";
            window.location.href = 'http://localhost:4200/main';
          }
        },
        // An error occurred. Data is not received. 
        error => {
          this.errorMessage = 'Error: wrong username or password.';
        });
  }

}
