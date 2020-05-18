import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/ApiService';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = "http://localhost:1337/";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  _http: HttpClient;
  _errorMessage: String = "";
  reviews: Array<any>
  faStar = faStar;

    // title = 'shopping-cart';
    admin                 = false;
    username              = '';
  
    token                 = '';
    message               = 'Not logged in.';
    secureData:string     = '';
    reqInfo:any           = null;
    _apiService:ApiService;
    public site='http://localhost:1337/';
    guest: boolean
  
  
  
    // Since we are using a provider above we can receive 
    // an instance through an constructor.
    constructor(private http: HttpClient) {
      // Pass in http module and pointer to AppComponent.
      this._apiService = new ApiService(http, this);
      this.showContentIfLoggedIn();
      this._http = http;
      this.reviews = [];
      this.getAllReviews()
    }
  
    //------------------------------------------------------------
    // Either shows content when logged in or clears contents.
    //------------------------------------------------------------
    showContentIfLoggedIn() {
      // Logged in if token exists in browser cache.
      if(sessionStorage.getItem('auth_token')!=null) {
        this.token   = sessionStorage.getItem('auth_token');
        this.message = "The user has been logged in.";
        this.getSecureData()
      }
      else {
        this.message = "Not logged in.";
        this.token   = ''
      }
    }
    getSecureData() {
      this._apiService.getData('User/SecureAreaJwt',
        this.secureDataCallback);
    }
    // Callback needs a pointer '_this' to current instance.
    secureDataCallback(result, _this) {
      if(result.errorMessage == "") {
        _this.secureData = result.secureData;
        _this.reqInfo = result.reqInfo;
        _this.username = result.reqInfo.username;
        if (result.reqInfo.roles.indexOf('Admin') >= 0) {
          _this.admin = true;
        }
      }
      else {
        alert(JSON.stringify(result.errorMessage));
      }
    }
  
  


  ngOnInit() {
  }

  getAllReviews() {
    let url = 'http://localhost:1337/Review/Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this.reviews = result.reviews;
        console.log(this.reviews)
      },
        error => {
          // Let user know about the error.
          this._errorMessage = error;
        })
  }

  writeReview(){
    if (this.message="Not logged in."){
      this.guest = true
  }
    else {
      window.location.href = "http://localhost:4200/review";
    this.guest = false
    }
  }
  

}
