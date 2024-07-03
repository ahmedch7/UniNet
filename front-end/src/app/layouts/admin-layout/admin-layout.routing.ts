import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NiveauComponent } from 'src/app/pages/niveau/niveau.component';
import { NiveauedudetailComponent } from 'src/app/pages/niveauedudetail/niveauedudetail.component';
import { CoursdetailsComponent } from 'src/app/pages/coursdetails/coursdetails.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'niveau',         component: NiveauComponent },
    { path: 'niveau-detail/:id',   component:NiveauedudetailComponent},
    { path: 'cours-detail/:id',   component:CoursdetailsComponent},

    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

];
