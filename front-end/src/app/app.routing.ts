import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { EventListComponent } from "./pages/event-list/event-list.component";
import { FormEventComponent } from "./pages/form-event/form-event.component";
import { EventDetailsComponent } from "./pages/event-details/event-details.component";
import { BOEventsComponent } from "./pages/boevents/boevents.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { CreateExamenComponent } from './pages/create-examen/create-examen.component';
import { FormSalleComponent } from './pages/form-salle/form-salle.component';
import { ListSallesComponent } from './pages/list-salles/list-salles.component';
import { ListExamenComponent } from './pages/list-examen/list-examen.component';
import { UpdateExamenComponent } from './pages/update-examen/update-examen.component';

const routes: Routes =[
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: 'create', component: CreateExamenComponent },
  { path: 'form-salle', component: FormSalleComponent},
  //{ path: 'affecter-examen', component: AffecterExamenComponent },

  { path: 'list-salles', component: ListSallesComponent },
  { path: 'list-examens', component: ListExamenComponent },
  { path: 'update/:id', component: UpdateExamenComponent }, // Assurez-vous que le composant est correctement défini
  { path: '', redirectTo: '/form-salle', pathMatch: 'full' }, // Redirection vers 'form-salle' par défaut
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
      { path: "event-list", component: EventListComponent },
      { path: "form-event", component: FormEventComponent },
      { path: "event-details/:id", component: EventDetailsComponent },
      { path: "BOEvents", component: BOEventsComponent },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "not-found",
    component: NotFoundComponent,
  },
  
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
