import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/ApiService';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // title = 'shopping-cart';
  admin                 = false;
  username              = '';

  token                 = '';
  message               = 'Not logged in.';
  secureData:string     = '';
  reqInfo:any           = null;
  _apiService:ApiService;
  public site='http://localhost:1337/';
  faCoffee = faCoffee;



  // Since we are using a provider above we can receive 
  // an instance through an constructor.
  constructor(private http: HttpClient) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.showContentIfLoggedIn();
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


  //------------------------------------------------------------
  // Log user out. Destroy token.
  //------------------------------------------------------------
  logout() {
    sessionStorage.clear();
    this.showContentIfLoggedIn();

    // Clear data.
    this.secureData    = "";
    this.reqInfo       = {};
    this.username      = '';
    this.admin         = false;
    // Redirect home and reload that page (sorry for using this easy abd dirty way)
    window.location.href = 'http://localhost:4200';
  }
}
