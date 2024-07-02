import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/Services/restaurant.service';
import { ReservationRestaurantService } from 'src/app/Services/reservation-restau.service';

@Component({
  selector: 'app-restaurant-reservation',
  templateUrl: './restaurant-reservation.component.html',
  styleUrls: ['./restaurant-reservation.component.scss']
})
export class RestaurantReservationComponent implements OnInit {
  restaurants: any[] = []; // Initialisez à un tableau vide
  selectedRestaurant: any = null;
  editMode = false;
  createMode = false;
  newRestaurant: any = {
    name: '',
    address: '',
    available: false,
    capacity: 0,
    availablePlaces: 0,
    facultyId: '',
    CurrResto: null
  };
  reservationsByRestaurant: { [key: string]: any[] } = {};

  constructor(
    private restaurantService: RestaurantService, 
    private reservationService: ReservationRestaurantService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        console.log('Restaurants loaded:', data);
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
        this.loadRestaurants();
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
    const userId = '664f89f28fb320b8082864b5'; // Static user ID for testing
    this.reservationService.createReservation({ userId, restaurantId }).subscribe(
      (data) => {
        console.log('Réservation créée avec succès', data);
        // Mettre à jour localement le nombre de places disponibles
        const restaurant = this.restaurants.find(r => r._id === restaurantId);
        if (restaurant) {
          restaurant.availablePlaces--; // Décrémente les places disponibles
        }
        // Mettre à jour les réservations après réservation réussie
        this.loadReservations(restaurantId);
      },
      (error) => {
        console.error('Erreur lors de la création de la réservation', error);
      }
    );
  }
  

  editRestaurant(restaurant: any): void {
    this.selectedRestaurant = { ...restaurant };
    this.editMode = true;
  }

  updateRestaurant(): void {
    const { _id, name, address, available, capacity, availablePlaces, facultyId } = this.selectedRestaurant;
    this.restaurantService.updateRestaurant(_id, { name, address, available, capacity, availablePlaces, facultyId }).subscribe(
      (data) => {
        console.log('Restaurant mis à jour avec succès', data);
        this.editMode = false;
        this.loadRestaurants();
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
        this.loadRestaurants();
      },
      (error) => {
        console.error('Erreur lors de la suppression du restaurant', error);
      }
    );
  }

  loadReservations(restaurantId: string): void {
    this.reservationService.getRestaurantReservations(restaurantId).subscribe(
      (data) => {
        this.reservationsByRestaurant[restaurantId] = data;
        console.log('Réservations chargées :', this.reservationsByRestaurant[restaurantId]);
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
        if (this.selectedRestaurant) {
          // Charger à nouveau les réservations après suppression
          this.loadReservations(this.selectedRestaurant._id);
          // Incrémenter localement les places disponibles
          const restaurant = this.restaurants.find(r => r._id === this.selectedRestaurant._id);
          if (restaurant) {
            restaurant.availablePlaces++; // Incrémente les places disponibles
          }
  
          // Vérifier si la liste des réservations est vide après suppression
          const reservations = this.reservationsByRestaurant[this.selectedRestaurant._id];
          if (reservations && reservations.length === 1 && reservations[0]._id === reservationId) {
            // Si la seule réservation restante est celle que l'on vient de supprimer, vider la liste localement
            this.reservationsByRestaurant[this.selectedRestaurant._id] = [];
          } else {
            // Sinon, supprimer la réservation de la liste localement
            this.reservationsByRestaurant[this.selectedRestaurant._id] = this.reservationsByRestaurant[this.selectedRestaurant._id]
              .filter(reservation => reservation._id !== reservationId);
          }
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réservation', error);
      }
    );
  }
  
  
  

  // Nouvelle méthode pour charger les réservations et sélectionner un restaurant
  loadReservationsAndSelect(restaurant: any): void {
    this.selectedRestaurant = restaurant;
    this.loadReservations(restaurant._id);
  }
}
