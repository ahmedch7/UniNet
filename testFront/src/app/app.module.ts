import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoyerComponent } from './components/foyer/foyer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FoyerService } from './services/foyer.service';
import { FormsModule } from '@angular/forms';
import { RestaurantReservationComponent } from './components/restaurant-reservation/restaurant-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    FoyerComponent,
    RestaurantReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Add FormsModule to the imports array

  ],
  providers: [FoyerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
