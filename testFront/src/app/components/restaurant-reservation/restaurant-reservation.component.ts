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

  createReservation(restaurantId: string): void {
    const userId = 'your_user_id_here'; // Remplacez par la logique pour obtenir l'ID utilisateur
    this.reservationService.createReservation({ userId, restaurantId }).subscribe(
      (data) => {
        console.log('Reservation created successfully', data);
        this.loadRestaurants(); // Rechargez la liste des restaurants après la réservation
      },
      (error) => {
        console.error('Error creating reservation', error);
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
        console.log('Restaurant updated successfully', data);
        this.editMode = false;
        this.loadRestaurants(); // Rechargez la liste des restaurants après la mise à jour
      },
      (error) => {
        console.error('Error updating restaurant', error);
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
        console.log('Restaurant deleted successfully', data);
        this.loadRestaurants(); // Rechargez la liste des restaurants après la suppression
      },
      (error) => {
        console.error('Error deleting restaurant', error);
      }
    );
  }

  loadReservations(restaurantId: string): void {
    this.reservationService.getRestaurantReservations(restaurantId).subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error loading reservations', error);
      }
    );
  }

  deleteReservation(reservationId: string): void {
    this.reservationService.deleteRestaurantReservation(reservationId).subscribe(
      (data) => {
        console.log('Reservation deleted successfully', data);
        this.loadReservations(this.selectedRestaurant._id); // Rechargez les réservations après la suppression
      },
      (error) => {
        console.error('Error deleting reservation', error);
      }
    );
  }
}
