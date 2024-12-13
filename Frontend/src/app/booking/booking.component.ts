import { Component } from '@angular/core';
import { AuthService } from '../auths/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  gridTemplateColumns: string = 'repeat(8, 1fr)'; // Initial value
  updateGridColumns(columns: number) {
    this.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  showId: string | undefined | null;
  totalPrice:any=0;
  bookingList: any | undefined;
  ngOnInit(): void {
    this.showId = this.route.snapshot.paramMap.get('showId');
    console.log("showId:", this.showId);
    this.authService.getOneShow(this.showId).subscribe({
      next: (value: any) => {
        console.log("Here We got the details of the hall", value);
        this.bookingList = value;
        console.log("This os BookingList Value and we pass it", this.bookingList)

      },
      error: (err: any) => {
        console.log("We are getting error while fetching data from frontend", err);
      }
    })
    // this.DisplayMovieName()
  }
  isSelected:boolean=false;
  bookingSeat:string[]=[];
  selectSeat(seat:any, seatButton: HTMLElement) {
    if (!seat.isBooked) {
      if(seat.isSelected){
        this.totalPrice =this.totalPrice - seat.price;
        seat.isSelected=false;
        // this.bookingSeat = this.bookingSeat.filter(seat => !seat.row);
        this.bookingSeat = this.bookingSeat.filter(set => set !== seat._id);
        console.log(this.bookingSeat)      
      }
      else if(!seat.isSelected){
        this.totalPrice=this.totalPrice + seat.price;
        seat.isSelected=true;
        this.bookingSeat.push(seat._id);
        console.log(this.bookingSeat)
      }
      // seat.isSelected = !seat.isSelected;
      // Directly change the background color using the reference to the button
      seatButton.style.backgroundColor = seat.isSelected ? 'lightgreen' : 'white';
    }

  }


  //Here we want the Movie Name Struggle For It
  // movieName:any;
  // DisplayMovieName(){

  //   this.authService.getOneMovie(_id).subscribe({next:(value:any)=>{
  //     console.log("Succesfully Got Movie Details",value);
  //     this.movieName=value;
  //   },
  //   error:(err)=>{
  //     console.log(err);
  //   }
  // })
  // }


  //Generating Tickets

  generateTicket(_id:string){
    console.log("Sending BookingId",_id);
    const arrayString = JSON.stringify(this.bookingSeat);  // or arrayData.join(',');

      this.router.navigateByUrl(`/finalbooking/${_id}?data=${encodeURIComponent(arrayString)}`)
  }

}
