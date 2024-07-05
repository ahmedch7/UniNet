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
import { NiveauComponent } from "src/app/pages/niveau/niveau.component";
import { NiveauedudetailComponent } from "src/app/pages/niveauedudetail/niveauedudetail.component";
import { CoursdetailsComponent } from "src/app/pages/coursdetails/coursdetails.component";
import { AdminPostsComponent } from "src/app/pages/admin-posts/admin-posts.component";
import { AdminCommentaireComponent } from "src/app/pages/admin-commentaire/admin-commentaire.component";
import { AdminForumComponent } from "src/app/pages/admin-forum/admin-forum.component";
import { UserForumComponent } from "src/app/pages/user-forum/user-forum.component";
import { AdminPostCandidatureComponent } from "src/app/pages/admin-post-candidature/admin-post-candidature.component";
import { UserPostCandidatureComponent } from "src/app/pages/user-post-candidature/user-post-candidature.component";
import { UserCommentaireComponent } from "src/app/pages/user-commentaire/user-commentaire.component";
import { UserPostsComponent } from "src/app/pages/user-posts/user-posts.component";
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
  { path: "niveau", component: NiveauComponent },
  { path: "niveau-detail/:id", component: NiveauedudetailComponent },
  { path: "cours-detail/:id", component: CoursdetailsComponent },
  {
    path: "admin-posts",
    component: AdminPostsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin"] },
  },
  {
    path: "admin-comments",
    component: AdminCommentaireComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin"] },
  },
  {
    path: "admin-form",
    component: AdminForumComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin"] },
  },
  { path: "user-form", component: UserForumComponent },
  {
    path: "user-posts",
    component: UserPostsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["etudiant", "collaborateur"] },
  },
  {
    path: "user-comments",
    component: UserCommentaireComponent,
    canActivate: [AuthGuard],
    data: { roles: ["etudiant", "admin", "responsable", "collaborateur"] },
  },
  {
    path: "user-candidature-post",
    component: UserPostCandidatureComponent,
    canActivate: [AuthGuard],
    data: { roles: ["etudiant"] },
  },
  {
    path: "admin-candidature-post",
    component: AdminPostCandidatureComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin", "responsable"] },
  },
];
