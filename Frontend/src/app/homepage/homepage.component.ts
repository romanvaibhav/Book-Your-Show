import { Component, HostListener } from '@angular/core';
import { AuthService } from "./../auths/auth.service"
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private authService: AuthService,private router:Router, private httpClient: HttpClient) { }
  user: any[] | undefined;

  ngOnInit(): void {
    this.getProducts();

    this.handleGetCity();
  }

  getProducts(){
    const profileObservable$ = this.authService.getProductList();
    profileObservable$.subscribe({
      next: (value:any) => {
        console.log("Got Movie Data Succesfully");
        console.log(value);
        this.user = value;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  isDropdownVisible: boolean = true;

  filteredmovies: any[] = [];
  filteringmovie: string = '';
  filterMovies(){
    const searchLower = this.filteringmovie.toLowerCase();
    if (this.user) {
      this.filteredmovies = this.user.filter(cit =>
        cit.name.toLowerCase().includes(searchLower)
      );
      // this.isCityNew = this.filteredCities.length === 0 && this.searchTerm.trim() !== '';
      this.isDropdownVisible = this.filteredmovies.length > 0;
      if(this.filteringmovie.length<1){
        this.getProducts();
      }
      console.log('Filtered Movies:', this.filteredmovies);
    }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = event.target instanceof Element && event.target.closest('.suggestions'); // Adjust to your dropdown's CSS class
    if (!clickedInside) {
      this.isDropdownVisible = false; // Close dropdown if clicked outside
      this.isCityVisible = false;
    } 
  }



  handleGetCity(){
    this.authService.getCityList().subscribe({next:(value:any)=>{
      console.log("Got City Succesfully");
      this.city=value
      console.log("here we getting city",this.city);
    },
    error:(err)=>{
      console.log("Got error in the city");
    }
  })
  }



  isCityVisible: boolean = false;
  isCityNew: boolean = true;
  filteredCities: any[] = [];
  searchTerm: string = '';
  selectedCity: string | null = null;
  city:any[]|undefined;
  filterCities(): void {
    console.log("ciyt is here",this.city)
    console.log('Search Term:', this.searchTerm);
    console.log('City Data:', this.city);
    const searchLower = this.searchTerm.toLowerCase();
    if (this.city) {
      this.filteredCities = this.city.filter(cit =>
        cit.city.toLowerCase().includes(searchLower)
      );
      if(this.filteredCities.length > 0){
        this.isCityVisible = true;
      }
      else{
        this.isCityVisible = true;

      }
      this.isCityNew = this.filteredCities.length === 0 && this.searchTerm.trim() !== '';
      console.log('Filtered Cities:', this.filteredCities);
      console.log('Is New City:', this.isCityNew);
    }
    if(this.searchTerm.length<1){
      this.getProducts();
    }
  }
  goTotheMovie(movieId:string){
    this.router.navigateByUrl(`/movie/${movieId}`)

  }



  AddNewCity(city:string){
    console.log(city,"Is the newbie");
    this.httpClient.post(`http://localhost:3002/user/city`,{city}).subscribe({next:(value)=>{
      console.log("Added New City",value);
      this.handleGetCity();
    },
    error:(err)=>{
      console.log("error while getting city",err);
    }
  })
  }
  
  selectCity(city: any,Id:any): void {
    this.productList._Id=Id;
    this.handleProductList();
      this.selectedCity = city;
      this.searchTerm = city; // Update the input field with the selected city
      this.filteredCities = [];
    }


  onChange(event: any) {
    console.log("getting City Movie List List");
    this.handleProductList();
  }
  productList = {
    _Id: '',
  }
  FilterMovie:any[]|undefined;

  handleProductList() {
    console.log(this.productList)
    this.authService.getMovieFilertByCity(this.productList).subscribe({
      next: (value: any) => {
        console.log("We got the City list By Filter");
        this.FilterMovie=value;
        console.log(this.FilterMovie);
        console.log("Printing value",value)
        this.user = value;
      },
      error: (err) => {
        console.log("We are getting error while fetching the users", err)
      }
    })
  }


  onImageClick(movieId:string) {
    this.router.navigateByUrl(`/movie/${movieId}`)
  }


}
