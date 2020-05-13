import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { MessengerService } from 'src/app/services/messenger.service'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  faStar = faStar;
rated= false
rating= 0
performance = ""
name = ""
array = ["Bad :(", "Neutral :|", "Good:)", "Very Good!", "Excellent!!"]
  constructor(private msg: MessengerService, ) { }

  ngOnInit() {
    this.msg.getMsg().subscribe((name) => {
      this.review(name)
    })
  }

  changeRating(rating){
    this.rated = !this.rated
    this.rating = rating;
    this.performance = this.array[rating-1]
  }

 submit(response){
   console.log(response)
   console.log(this.rating)
   console.log(name)
 }

review(name) {
  this.name = name
}

}
