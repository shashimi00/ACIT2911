import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  _http: HttpClient;
  _errorMessage: String = "";
  faStar = faStar;
  rated = false
  rating = 0
  performance = ""
  array = ["Bad :(", "Neutral :|", "Good:)", "Very Good!", "Excellent!!"]

  admin = false;
  username = '';
  token = '';
  message = 'Not logged in.';
  secureData: string = '';
  reqInfo: any = null;
  _apiService: ApiService;
  public site = 'http://localhost:1337/';
  guest: boolean

  constructor(private http: HttpClient) {
    this._apiService = new ApiService(http, this);
    this.showContentIfLoggedIn();
    this._http = http;
  }

  ngOnInit() {

    // this.name.getProduct().subscribe((product) => {
    //   console.log(4)
    //   this.review(product)
    //   console.log(product)
    // })

  }

  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.message = "The user has been logged in.";
      this.getSecureData()
    }
    else {
      this.message = "Not logged in.";
      this.token = ''
    }
  }

  getSecureData() {
    this._apiService.getData('User/SecureAreaJwt',
      this.secureDataCallback);
  }

  // Callback needs a pointer '_this' to current instance.
  secureDataCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.secureData = result.secureData;
      _this.reqInfo = result.reqInfo;
      _this.username = result.reqInfo.username;
      if (result.reqInfo.roles.indexOf('Admin') >= 0) {
        _this.admin = true;
      }
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }


  changeRating(rating) {
    this.rated = !this.rated
    this.rating = rating;
    this.performance = this.array[rating - 1]
  }

  submit(inputReview, productName) {
    if (this.username="" ){
this.username = "anonymous"
    }
    // This free online service receives post submissions.
    this.http.post("http://localhost:1337/Review/Submit",
      { userName: this.username, name: productName, review: inputReview, rating: this.rating })
      // {cart: this.cartItems, total:this.cartTotal})
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          // window.location.href = "http://localhost:4200/viewReviews";
        },
        // An error occurred. Data is not received. 
        error => {
          this._errorMessage = error;
        });
  }
}
