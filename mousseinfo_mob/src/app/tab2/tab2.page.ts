import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @Input() rating: number ;



  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;

  constructor() {}

  rate(index : number){
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  isAboveRating(index : number): boolean{
    return index > this.rating;
  }

  getColors(index : number){
    if(this.isAboveRating(index)){
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }


}

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "FFCA28",
  RED = "DD2C00"
}
