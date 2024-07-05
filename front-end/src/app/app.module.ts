import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormEventComponent } from './pages/form-event/form-event.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; 
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
import { BOEventsComponent } from './pages/boevents/boevents.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FoyerComponent } from './pages/foyer/foyer.component';
import { RestaurantReservationComponent } from './pages/restaurant-reservation/restaurant-reservation.component';
import { FilterPipe } from './filter.pipe';
import { MenuRestauComponent } from './pages/menu-restau/menu-restau.component';
import { FoyerStatisticsComponent } from './pages/foyer-statistics/foyer-statistics.component';

const config: SocketIoConfig = { url: 'http://localhost:9090', options: {} };

@NgModule({
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhJ1QaIMu0XptyDLOUSs1YzQ4SmH7jVG8'
    }),
    SocketIoModule.forRoot(config),
    CarouselModule,
    NgxPaginationModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    FoyerComponent,
    RestaurantReservationComponent,
    FilterPipe,
    MenuRestauComponent,
    FoyerStatisticsComponent,
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    FormEventComponent,
    EventListComponent,
    EventDetailsComponent,
    BOEventsComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
