import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {AdminPostsComponent} from "../../pages/admin-posts/admin-posts.component";
import {AdminCommentaireComponent} from "../../pages/admin-commentaire/admin-commentaire.component";
import {AdminForumComponent} from "../../pages/admin-forum/admin-forum.component";
import {UserForumComponent} from "../../pages/user-forum/user-forum.component";
import {UserPostsComponent} from "../../pages/user-posts/user-posts.component";
import {UserCommentaireComponent} from "../../pages/user-commentaire/user-commentaire.component";
import {UserPostCandidatureComponent} from "../../pages/user-post-candidature/user-post-candidature.component";
import {AdminPostCandidatureComponent} from "../../pages/admin-post-candidature/admin-post-candidature.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'admin-posts', component: AdminPostsComponent },
  { path: 'admin-comments', component: AdminCommentaireComponent },
  { path: 'admin-form', component: AdminForumComponent },
  {path:'user-form', component:UserForumComponent},
  {path:'user-posts', component:UserPostsComponent},
  {path:'user-comments', component:UserCommentaireComponent},
  {path:'user-candidature-post', component: UserPostCandidatureComponent},
  {path:'admin-candidature-post', component: AdminPostCandidatureComponent}



];
