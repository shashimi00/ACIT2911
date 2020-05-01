import { Component, OnInit } from '@angular/core';
// import { Meta} from '@angular/platform-browser'; 


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor() { 
  }
  // constructor(private meta:Meta) { 
  //   this.meta.addTags([
  //   {name:"viewport", content:"width=device-width, initial-scale=1, shrink-to-fit=no"},
  //   {name:"description", content:""},
  //   {name:"author", content:"Mark Otto, Jacob Thornton, and Bootstrap contributors"},
  //   {name:"generator", content:"Jekyll v3.8.6"}])
  //  }

  ngOnInit() {
  }
validate() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  }
}
