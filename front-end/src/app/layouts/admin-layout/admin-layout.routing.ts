import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AuthGuard } from "src/app/auth.guard";
import { FoyerComponent } from "src/app/pages/foyer/foyer.component";
import { FoyerStatisticsComponent } from "src/app/pages/foyer-statistics/foyer-statistics.component";
import { RestaurantReservationComponent } from "src/app/pages/restaurant-reservation/restaurant-reservation.component";
import { MenuRestauComponent } from "src/app/pages/menu-restau/menu-restau.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin"] },
  },
  { path: "stat-foyer", component: FoyerStatisticsComponent },

  { path: "foyer", component: FoyerComponent },
  { path: "restaurant", component: RestaurantReservationComponent },
  { path: "menu-Restau", component: MenuRestauComponent },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ["etudiant", "admin", "responsable", "collaborateur"] },
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
];
