import { Component, OnInit } from '@angular/core';
import { FoyerService } from 'src/app/Services/foyer.service';
import { RoomService } from 'src/app/Services/room.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.scss']
})
export class FoyerComponent implements OnInit {
  foyers: any[] = [];
  newFoyer: any = {};
  selectedFoyer: any = null;
  roomsByFoyer: { [key: string]: any[] } = {}; // Store rooms for each foyer
  newRoom: any = {};
  selectedRoom: any = null;
  showRooms: { [key: string]: boolean } = {}; // Track room visibility for each foyer
  successMessage: string = '';
  errorMessage: string = '';
  showCard: string = 'list'; // Track which card is visible
  searchText: string = ''; // Search text for filtering
  id_user = '6683e1c309d9b20f76f09c1d';  // Static user ID
  showModal: boolean = false; // Control modal visibility
  UsersReserved: any[] = [];

  constructor(private foyerService: FoyerService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadFoyers();
  }

  dismissAlert(alertType: 'successMessage' | 'errorMessage'): void {
    this[alertType] = ''; // Clear the message
  }

  loadFoyers(): void {
    this.foyerService.getFoyers().subscribe(
      (data) => {
        this.foyers = data;
      },
      (error) => {
        console.error('Error loading foyers', error);
      }
    );
  }

  filteredFoyers(): any[] {
    if (!this.searchText) {
      return this.foyers;
    }
    return this.foyers.filter(foyer =>
      foyer.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  createFoyer(): void {
    this.foyerService.createFoyer(this.newFoyer).subscribe(
      () => {
        this.successMessage = 'Foyer created successfully.';
        this.loadFoyers();
        this.newFoyer = {}; // Clear the form
        this.showModal = false; // Close the modal
      },
      (error) => {
        this.errorMessage = 'Error creating foyer: ' + error.message;
        console.error('Error creating foyer', error);
      }
    );
  }
  
  
  onUpdateFoyer(id: string): void {
    this.foyerService.updateFoyer(id, this.selectedFoyer).subscribe(
      () => {
        this.loadFoyers();
        this.selectedFoyer = null;
        this.showCard = 'list';
      },
      (error) => {
        console.error('Error updating foyer', error);
      }
    );
  }

  deleteFoyer(id: string): void {
    this.foyerService.deleteFoyer(id).subscribe(
      () => {
        this.loadFoyers();
      },
      (error) => {
        console.error('Error deleting foyer', error);
      }
    );
  }

  selectFoyerForUpdate(foyer: any): void {
    this.selectedFoyer = { ...foyer };
    this.showCard = 'editFoyer';
  }

  viewRooms(foyer: any): void {
    this.UsersReserved = null;
    this.foyers.forEach(element => {
      if (element._id !== foyer._id) {
        this.showRooms[element._id] = false;
      }
    });

    this.selectedFoyer = foyer;
    if (this.showRooms[foyer._id]) {
      this.showRooms[foyer._id] = false;
    } else {
      this.loadRooms(foyer._id);
      this.showRooms[foyer._id] = true;
      this.showCard = 'rooms';
    }
  }

  loadRooms(foyerId: string): void {
    this.roomService.getRoomsByFoyerId(foyerId).subscribe(
      (data) => {
        this.roomsByFoyer[foyerId] = data;
      },
      (error) => {
        console.error('Error loading rooms', error);
      }
    );
  }

  createRoom(foyerId: string): void {
    this.newRoom.foyerId = foyerId;
    this.roomService.createRoom(this.newRoom).subscribe(
      () => {
        this.loadRooms(foyerId);
        this.newRoom = {}; // Clear the form
        this.showCard = 'list'; // Switch back to list view
      },
      (error) => {
        console.error('Error creating room', error);
      }
    );
  }

updateRoom(roomId: string): void {
  // Update capacity based on room type
  if (this.selectedRoom.type === 'double') {
    this.selectedRoom.capacity = 2;
  } else if (this.selectedRoom.type === 'triple') {
    this.selectedRoom.capacity = 3;
  }

  // Update available places based on new capacity
  this.selectedRoom.availablePlaces = this.selectedRoom.capacity;

  this.roomService.updateRoom(roomId, this.selectedRoom).subscribe(
    () => {
      this.loadRooms(this.selectedFoyer._id);
      this.selectedRoom = null;
      this.showCard = 'rooms';
    },
    (error) => {
      console.error('Error updating room', error);
    }
  );
}


  deleteRoom(roomId: string): void {
    this.roomService.deleteRoom(roomId).subscribe(
      () => {
        this.loadRooms(this.selectedFoyer._id);
      },
      (error) => {
        console.error('Error deleting room', error);
      }
    );
  }

  selectRoomForUpdate(room: any): void {
    this.selectedRoom = { ...room };
    this.showCard = 'editRoom';
  }

  reserveRoom(roomId: string): void {
    const existingReservation = this.roomsByFoyer[this.selectedFoyer._id].find(room => room._id === roomId)?.reservation;

    if (existingReservation) {
      if (confirm('You already have a reservation. Do you want to cancel it and reserve this room instead?')) {
        this.cancelReservation(existingReservation._id).subscribe(
          () => {
            this.makeReservation(roomId);
          },
          (error) => {
            console.error('Error cancelling reservation', error);
          }
        );
      }
    } else {
      this.makeReservation(roomId);
    }
  }

  private makeReservation(roomId: string): void {
    const reservation = { roomId, userId: this.id_user, places: 1 };
    this.roomService.reserveRoom(reservation).subscribe(
      () => {
        this.loadFoyers();
        this.viewRooms(this.selectedFoyer);
        this.loadRooms(this.selectedFoyer._id);
      },
      (error: any) => {
        console.error('Error reserving room', error);
      }
    );
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.roomService.cancelReservation(reservationId);
  }

  createNewRoom(foyerId: string): void {
    this.selectedFoyer = this.foyers.find(foyer => foyer._id === foyerId);
    this.newRoom = {};
    this.newRoom.foyerId = foyerId;
    this.showCard = 'createRoom';
  }
  showCreateFoyerForm(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  onRoomTypeChange(): void {
  if (this.selectedRoom) {
    if (this.selectedRoom.type === 'double') {
      this.selectedRoom.capacity = 2;
    } else if (this.selectedRoom.type === 'triple') {
      this.selectedRoom.capacity = 3;
    }
  }

  if (this.newRoom) {
    if (this.newRoom.type === 'double') {
      this.newRoom.capacity = 2;
    } else if (this.newRoom.type === 'triple') {
      this.newRoom.capacity = 3;
    }
  }
}

  getusersreservationRooms(roomId: string): void {
    this.roomService.getRoomReservationById(roomId).subscribe(
      (data) => {
        this.UsersReserved = data;
      },
      (error: any) => {
        console.error('Error fetching room reservations', error);
      }
    );
  }
  cancelUserReservation(reservationId: string): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation?')) {
      this.roomService.cancelReservation(reservationId).subscribe(
        () => {
          // Mettez à jour les réservations après annulation
          this.getusersreservationRooms(this.selectedRoom._id); // ou ajustez selon votre logique pour recharger les réservations
        },
        (error) => {
          console.error('Erreur lors de l\'annulation de la réservation', error);
        }
      );
    }
  }
  

}
