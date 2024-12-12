import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auths/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pre-book',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pre-book.component.html',
  styleUrl: './pre-book.component.css'
})
export class PreBookComponent {
  constructor(private route: ActivatedRoute,private authService: AuthService, private router:Router){}
  movieId: string | undefined;
  img:string|undefined;
  backgroundImageUrl:string | undefined;
  user:any|undefined;
  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    console.log('Movie ID:', this.movieId);

    this.authService.getOneMovie(this.movieId).subscribe({next:(value)=>{
      console.log("SUccesfully Got One Movie:",value);
      this.user=value;
      // this.img=value[0].image'
      // console.log("Its USer:",this.user)

    },
    error:(err)=>{
      console.log("Got Error While getting Single mmovie",err);
    }
  })
  }

  onHallName(movieId: string, cityId: string){
    this.router.navigateByUrl(`/hall/${movieId}/${cityId}`)
  }

}
