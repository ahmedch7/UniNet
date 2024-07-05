import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ValidateEmailComponent } from './pages/validate-email/validate-email.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { UpdateUserModalComponent } from './update-user-modal/update-user-modal.component';
import { UserDetailsModalComponent } from './user-details-modal/user-details-modal.component';
import { BanUserModalComponent } from './ban-user-modal/ban-user-modal.component';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';
import { CreateUniversityModalComponent } from './create-university-modal/create-university-modal.component';
import { NiveauComponent } from './pages/niveau/niveau.component';
import { NiveauedudetailComponent } from './pages/niveauedudetail/niveauedudetail.component';
import { CoursdetailsComponent } from './pages/coursdetails/coursdetails.component';


const config: SocketIoConfig = { url: 'http://localhost:9090', options: {} };

@NgModule({
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    
    ReactiveFormsModule
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
    BOEventsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ValidateEmailComponent,
    NotFoundComponent,
    UpdateUserModalComponent,
    UserDetailsModalComponent,
    BanUserModalComponent,
    DeleteUserModalComponent,
    CreateUniversityModalComponent,
    NiveauComponent,
    NiveauedudetailComponent,
    CoursdetailsComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService,
    AuthGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
