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

const routes: Routes =[
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
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
