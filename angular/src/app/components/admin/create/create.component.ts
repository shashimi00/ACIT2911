import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesService } from 'src/app/services/files.service';
import { FileUploader } from 'ng2-file-upload';

const BASE_URL = "http://localhost:1337/Product/";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'})
export class CreateComponent implements OnInit {
  _http: HttpClient;
  _productsArray: Array<any>;
  _id: Number;
  _productName: String;
  _errorMessage: String = "";
  _price: Number;
  _description: String = ""
  files: any
  url: any
  uploader: FileUploader

  constructor(private http: HttpClient, private FileService: FilesService) {
    this._http = http;
    this.files = [];
    this.url = 'http://localhost:1337/upload';
  }

  ngOnInit() {
    this.uploader = new FileUploader({ url: this.url });
  }

  downloadPdf(filename, contentType) {
    this.FileService.downloadPDF(filename, contentType).subscribe(
      (res) => {
        const file = new Blob([res.blob()], { type: contentType });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    );
  }

  getAllProducts() {
    let url = BASE_URL + 'Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this._productsArray = result.products;
      },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
        })
  }

  createProduct() {
    // This free online service receives post submissions.
    this.http.post(BASE_URL + "CreateProduct",
      {
        _id: this._id,
        productName: this._productName,
        price: this._price,
        description: this._description
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.getAllProducts();
          window.location.href = 'http://localhost:4200/admin'
        },
        // An error occurred. Data is not received. 
        error => {
          this._errorMessage = error;
        });
  }
}
