import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { FoyerComponent } from 'src/app/pages/foyer/foyer.component';
import { RestaurantReservationComponent } from 'src/app/pages/restaurant-reservation/restaurant-reservation.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'foyer',   component: FoyerComponent },
    { path: 'restaurant',   component: RestaurantReservationComponent },
    { path: 'menu-Restau',   component: RestaurantReservationComponent },



    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
