import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auths/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-final-booking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './final-booking.component.html',
  styleUrl: './final-booking.component.css'
})
export class FinalBookingComponent {

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  _id: string | undefined | null;
  bookingSeat:any []=[];
  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('_id');
    console.log("Here We Got The Id",this._id);
    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      this.bookingSeat = JSON.parse(decodeURIComponent(data));  // Deserialize the array
      console.log("Array of BookedSeats",this.bookingSeat);
    });
  }
  Email:string='';
  Phone:number | any;



  clickConfirm(){
    if(this.Email && this.Phone){
      console.log(this.Email,this.Phone);
      this.authService.patchSeats(this._id,this.bookingSeat).subscribe({next:(value:any)=>{
        console.log("Seats Updates Succesfully",value)
      },
      error:(err:any)=>{
        console.log("Here We Are getting error while updating seat status");
      }
    })
    }

    
  }

}
