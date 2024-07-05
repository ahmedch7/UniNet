import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AuthGuard } from "src/app/auth.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['etudiant','admin', 'responsable', 'collaborateur']}
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
];
