import { Component }       from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: './register.html'
})

export class Register {
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  passConf: string = '';
  admin: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {
  }

  validateUser() {
    let userList = [this.username, this.email, this.firstName, this.lastName, this.password];
    for (let i=0; i<userList.length; i++) {
      if (userList[i] == '') {
        return false;
      }
    }
    return this.password == this.passConf;
  }

  addUser() {
    // This free online service receives post submissions.
    this.http.post("http://localhost:1337/User/RegisterUser",
      {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        passConf: this.passConf,
        admin: this.admin
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          this.errorMessage = data['errorMessage']['message'];
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
        },
        // An error occurred. Data is not received.
        error => {

        });
  }

}
