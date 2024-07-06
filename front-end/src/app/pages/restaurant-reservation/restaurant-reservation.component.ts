import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReservationRestaurantService } from 'src/app/services/reservation-restau.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-restaurant-reservation',
  templateUrl: './restaurant-reservation.component.html',
  styleUrls: ['./restaurant-reservation.component.scss']
})
export class RestaurantReservationComponent implements OnInit {
  private currentUser: User | null = null;

  restaurants: any[] = [];
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
  searchText: string = '';
  showOnlyAvailablePlaces: boolean = false; // Variable pour contrôler l'affichage des places disponibles
  loadingReservations: boolean = false;
  noReservationsMessage: string = 'Pas de réservation pour ce restaurant';

  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationRestaurantService
  ) {}

  currentUser_Test=JSON.parse(localStorage.getItem('currentUser')) ?? '';



  // currentUser={
  //   role:"admin"
  // }


  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(user);
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        console.log('Restaurants loaded:', data);
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
    this.newRestaurant.facultyId = this.currentUser.universiteAssociee; // Définir l'ID statique ici
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
    const userId = this.currentUser._id; // Static user ID for testing
    this.reservationService.createReservation({ userId, restaurantId }).subscribe(
      (data) => {
        console.log('Réservation créée avec succès', data);
        const restaurant = this.restaurants.find(r => r._id === restaurantId);
        if (restaurant) {
          restaurant.availablePlaces--;
        }
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
    this.loadingReservations = true;
    this.reservationService.getRestaurantReservations(restaurantId).subscribe(
      (data) => {
        this.reservationsByRestaurant[restaurantId] = data || [];
        this.loadingReservations = false;
        console.log('Réservations chargées :', this.reservationsByRestaurant[restaurantId]);
      },
      (error) => {
        this.loadingReservations = false;
        console.error('Erreur lors du chargement des réservations', error);
      }
    );
  }

  deleteReservation(reservationId: string): void {
    this.reservationService.deleteRestaurantReservation(reservationId).subscribe(
      (data) => {
        console.log('Réservation supprimée avec succès', data);
        if (this.selectedRestaurant) {
          this.loadReservations(this.selectedRestaurant._id);
          const restaurant = this.restaurants.find(r => r._id === this.selectedRestaurant._id);
          if (restaurant) {
            restaurant.availablePlaces++;
          }

          const reservations = this.reservationsByRestaurant[this.selectedRestaurant._id];
          if (reservations && reservations.length === 1 && reservations[0]._id === reservationId) {
            this.reservationsByRestaurant[this.selectedRestaurant._id] = [];
          } else {
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

  loadReservationsAndSelect(restaurant: any): void {
    this.selectedRestaurant = restaurant;
    this.loadingReservations = true; // Commence le chargement des réservations
    this.loadReservations(restaurant._id);
  }

  // Méthode pour filtrer les restaurants par nom et places disponibles > 0
  filteredRestaurants(): any[] {
    if (!this.searchText) {
      return this.restaurants.filter(restaurant =>
        !this.showOnlyAvailablePlaces || restaurant.availablePlaces > 0
      );
    } else {
      return this.restaurants.filter(restaurant =>
        (!this.showOnlyAvailablePlaces || restaurant.availablePlaces > 0) &&
        restaurant.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  // Méthode pour basculer entre l'affichage des restaurants avec places disponibles uniquement ou tous les restaurants
  toggleAvailabilityFilter(): void {
    this.showOnlyAvailablePlaces = !this.showOnlyAvailablePlaces;
  }
}
