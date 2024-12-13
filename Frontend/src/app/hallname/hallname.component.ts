import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auths/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { seatsEntry } from './../constant/model'
declare var bootstrap: any;

@Component({
  selector: 'app-hallname',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hallname.component.html',
  styleUrl: './hallname.component.css'
})
export class HallnameComponent {
  //Code To Open Bootstrap Model
  @ViewChild('exampleModal') exampleModal!: ElementRef;

  openmodel() {
    const modal = new bootstrap.Modal(this.exampleModal.nativeElement, {
      backdrop: 'static', 
      keyboard: false 
    });
    modal.show();
  }

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}


  movieId!: string | undefined | null;
  cityId!: string |null ;
  hallList: any | undefined;

  //OnInIt Function Calling HallList
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('movieId');
      this.cityId = params.get('cityId');
    });
    this.authService.getHallInCity(this.cityId).subscribe({
      next: (value) => {
        console.log("Here We got the details of the hall", value);
        this.hallList = value;
      },
      error: (err) => {
        console.log("We are getting error while fetching data from frontend", err);
      }
    })
    this.showcreation.cityId=this.cityId;
    this.showcreation.movieId=this.movieId;
    this.getOne();
    this.AllSlot();
    // this.gotAllSlot();
  }


//Getting Single Movie
  user: any | undefined;
  getOne() {
    this.authService.getOneMovie(this.movieId).subscribe({
      next: (value) => {
        console.log("SUccesfully Got Movie Name:", value);
        this.user = value;
      },
      error: (err) => {
        console.log("Got Error While getting Single mmovie", err);
      }
    })
  }


//Getting AllTime Slots and the Unique Dates of Show
  allTime: any | undefined;
  uniqueDates: any[] = [];
  AllSlot() {
    this.authService.getAllSlot(this.cityId, this.movieId).subscribe({
      next: (value: any) => {
        console.log("Here We Got ALL The Slots of the movie in the city", value);
        this.allTime = value;
        console.log("Printing All Time Slot", this.allTime)
        this.uniqueDates = [...new Set(this.allTime.map((item: { date: any; }) => item.date))].sort((a:any, b:any) => new Date(a).getTime() - new Date(b).getTime());;
        console.log("Its Unique Date", this.uniqueDates[0]);
        this.selectDate(this.uniqueDates[0],0);
      },
      error: (err: any) => {
        console.log("Error While Getting All Slots in Frontend");
      }
    })
  }



  // gotAllSlot() {
  //   this.authService.gotgetAllSlot().subscribe({
  //     next: (value: any) => {
  //       console.log("Here We Got ALL The Slots of the movie in the city", value);
  //     },
  //     error: (err: any) => {
  //       console.log("Error While Getting All Slots in Frontend");
  //     }
  //   })
  // }



// Show Creation Schema

  selectedhall: string = '';
  tSeats: number = 0;
  selectedDate: string = '';
  selectedTime: string = '';
  selectedRow: number = 0;
  seatsPerRow: number = 0;
  seatPrice: number = 0;
  seatsAvailable: seatsEntry[] = [];
  showcreation = {
    hallId: this.selectedhall,
    time: this.selectedTime,
    seatsAvailable: this.seatsAvailable,
    date: this.selectedDate,
    movieId: this.movieId,
    cityId: this.cityId,
    totalSeats: this.tSeats,
    rowSeats:this.seatsPerRow,
  }
  createShow() {
    console.log("Seats Per Row Should Be",this.seatsPerRow);
    this.authService.postShowCreation(this.showcreation).subscribe({next:(value:any)=>{
      console.log("Show Created Succesfully",value);
      this.AllSlot();
      this.selectedhall = '';
      this.tSeats = 0;
      this.selectedDate = '';
      this.selectedTime = '';
      this.selectedRow = 0;
      this.seatsPerRow = 0;
      this.seatPrice = 0;
      this.seatsAvailable= [];
    },
    error:(err:any)=>{
      console.log(err);
    }
  })
  }
  
  // Genarating Seats and Pushing in array 
  onChange(event: any) {
    this.showcreation.seatsAvailable = [];  
    if (this.selectedRow && this.showcreation.rowSeats) {
      for (let i = 1; i <=this.selectedRow; i++) {
        const rowNo = String.fromCharCode(64 + i);
        for (let j = 1; j <=this.showcreation.rowSeats; j++) {
          this.showcreation.seatsAvailable.push({ row: rowNo+j, seatNumber: j, isBooked: false, price: this.seatPrice });
        }
      }
    }
  }


// Getting Shows according to the Date

  selectedButtonIndex: number | null = 0;
  selectDate(date:string,index:number){
    console.log("date",date);
    this.selectedButtonIndex = index;
    console.log(date);
    console.log(this.cityId);
    this.authService.getDateWiseShow(date,this.cityId).subscribe({next:(value:any)=>{
      console.log("We Got The Shows DateWise",value);
      this.allTime=value;
    },
    error:(err:any)=>{
      console.log(err);
    }
  })
  }





// Routing to the Booking Page

  GoToBooking(showId: string) {
    this.router.navigateByUrl(`/booking/${showId}`)
  }

}
