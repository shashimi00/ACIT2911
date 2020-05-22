import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  passConf: string = '';
  admin: boolean = false;
  errorMessage: string = '';
  score: any
  small = true
  large = true
  number = true
  symbol = true
  length = true

  constructor(private http: HttpClient) {
    this.score = 0
  }

  ngOnInit() {
  }

  validateUser() {
    let userList = [this.username, this.email, this.firstName, this.lastName, this.password];
    for (let i = 0; i < userList.length; i++) {
      if (userList[i] == '') {
        return false;
      }
    }
    return this.password == this.passConf;
  }

  validate() {
    if (this.score < 5) {
      this.errorMessage = "Please enter a strong password"
    }
    else {
      this.addUser()
    }
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
          window.location.href = 'http://localhost:4200/register';

        },
        // An error occurred. Data is not received.
        error => {
          window.location.href = 'http://localhost:4200/login';
        });
  }

  onKey(event: any) {

    var values = event.target.value
    // console.log(value)
    var barLevel = document.getElementById('strengthBar') as HTMLInputElement;
    console.log(barLevel)
  
    var score = 0;
    if (this.small) {
      if (values.match(/[a-z][a-z]+/)) {
        this.score += 1;
        console.log('Check 1 done')
        this.small = false
      }
    }
    if (this.large) {
      if (values.match(/[A-Z]+/)) {
        this.score += 1;
        console.log('Check 2 done')
        this.large = false

      }
    }
    if (this.symbol) {
      if (values.match(/[!"#$%&'()*+,-./:;<=>?@^_`~]+/)) {
        this.score += 1;
        console.log('Check 3 done')
        this.symbol = false
      }
    }
    if (this.number) {
      if (values.match(/[0-9]+/)) {
        this.score += 1;
        console.log('Check 4 done')
        this.number = false
      }
    }
    if (this.length) {
      if (values.length > 7) {
        this.score += 1;
        console.log('Check 5 done')
        this.length = false
      }
    }
    console.log(`The password score is:${this.score}`)
    barLevel.value = this.score.toString()
  }

}
