import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { ReservationRestaurantService } from '../../services/reservation-restau.service';

@Component({
  selector: 'app-restaurant-reservation',
  templateUrl: './restaurant-reservation.component.html',
  styleUrls: ['./restaurant-reservation.component.css']
})
export class RestaurantReservationComponent implements OnInit {
  restaurants: any[] = [];
  selectedRestaurant: any = null;
  reservations: any[] = [];
  editMode = false;
  createMode = false;
  newRestaurant: any = {
    name: '',
    address: '',
    available: false,
    capacity: 0,
    availablePlaces: 0,
    facultyId: ''
  };

  constructor(private restaurantService: RestaurantService, private reservationService: ReservationRestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error loading restaurants', error);
      }
    );
  }

  toggleCreateMode(): void {
    this.createMode = !this.createMode;
  }

  createRestaurant(): void {
    this.restaurantService.createRestaurant(this.newRestaurant).subscribe(
      (data) => {
        console.log('Restaurant created successfully', data);
        this.createMode = false;
        this.newRestaurant = {
          name: '',
          address: '',
          available: false,
          capacity: 0,
          availablePlaces: 0,
          facultyId: ''
        };
        this.loadRestaurants(); // Rechargez la liste des restaurants après la création
      },
      (error) => {
        console.error('Error creating restaurant', error);
      }
    );
  }

  cancelCreate(): void {
    this.createMode = false;
  }

  createReservation(restaurantId: string): void {
    const userId = '6679be5c0a809410213874ad'; // Votre ID utilisateur statique pour les tests
    this.reservationService.createReservation({ userId, restaurantId }).subscribe(
      (data) => {
        console.log('Réservation créée avec succès', data);
        this.loadRestaurants(); // Rechargez la liste des restaurants après la réservation
      },
      (error) => {
        console.error('Erreur lors de la création de la réservation', error);
      }
    );
  }

  selectRestaurant(restaurant: any): void {
    this.selectedRestaurant = restaurant;
    // Ajoutez ici la logique supplémentaire si nécessaire
  }

  editRestaurant(restaurant: any): void {
    this.selectedRestaurant = { ...restaurant }; // Cloner l'objet pour éviter la modification directe
    this.editMode = true;
  }

  updateRestaurant(): void {
    const { _id, name, address, available, capacity, availablePlaces, facultyId } = this.selectedRestaurant;
    this.restaurantService.updateRestaurant(_id, { name, address, available, capacity, availablePlaces, facultyId }).subscribe(
      (data) => {
        console.log('Restaurant mis à jour avec succès', data);
        this.editMode = false;
        this.loadRestaurants(); // Rechargez la liste des restaurants après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du restaurant', error);
      }
    );
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedRestaurant = null;
  }

  deleteRestaurant(restaurantId: string): void {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(
      (data) => {
        console.log('Restaurant supprimé avec succès', data);
        this.loadRestaurants(); // Rechargez la liste des restaurants après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du restaurant', error);
      }
    );
  }

  loadReservations(restaurantId: string): void {
    this.reservationService.getRestaurantReservations(restaurantId).subscribe(
      (data) => {
        this.reservations = data;
        console.log('Réservations chargées :', this.reservations); // Vérifiez dans la console du navigateur si les données sont correctement chargées
      },
      (error) => {
        console.error('Erreur lors du chargement des réservations', error);
      }
    );
  }
  
  
  

  deleteReservation(reservationId: string): void {
    this.reservationService.deleteRestaurantReservation(reservationId).subscribe(
      (data) => {
        console.log('Réservation supprimée avec succès', data);
        this.loadReservations(this.selectedRestaurant._id); // Rechargez les réservations après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réservation', error);
      }
    );
  }
}
