import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PreBookComponent } from './pre-book/pre-book.component';
import { HallnameComponent } from './hallname/hallname.component';
import { BookingComponent } from './booking/booking.component';
import { FinalBookingComponent } from './final-booking/final-booking.component';

export const routes: Routes = [
    {
        path:"",
        component:HomepageComponent,
    },
    {
        path:"movie/:id",
        component:PreBookComponent,
    },
    {
        path:"hall/:movieId/:cityId",
        component:HallnameComponent,
    },
    {
        path:"booking/:showId",
        component:BookingComponent,
    },
    {
        path:"finalbooking/:_id",
        component:FinalBookingComponent,
    },
];


