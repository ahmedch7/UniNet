// Importez RestaurantComponent s'il n'est pas déjà importé
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from './components/foyer/foyer.component';
import { RestaurantReservationComponent } from './components/restaurant-reservation/restaurant-reservation.component'; // Assurez-vous d'importer RestaurantComponent
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  { path: 'foyers', component: FoyerComponent },
  { path: 'restau', component: RestaurantReservationComponent }, // Nouvelle route pour RestaurantComponent
  { path: 'menus', component: MenuListComponent },
  { path: 'menus/:id/comments', component: MenuListComponent },
  { path: '**', redirectTo: '/' } // Redirection pour les chemins inconnus vers /foyers
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
