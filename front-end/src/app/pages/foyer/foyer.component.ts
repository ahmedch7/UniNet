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

  showCard: string = 'list'; // Track which card is visible
  searchText: string = ''; // Search text for filtering

  constructor(private foyerService: FoyerService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadFoyers();
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
      (data) => {
        this.loadFoyers(); // Refresh the list
        this.newFoyer = {}; // Clear the form
        this.showCard = 'list'; // Show the list of foyers after creation
      },
      (error) => {
        console.error('Error creating foyer', error);
      }
    );
  }

  onUpdateFoyer(id: string): void {
    this.foyerService.updateFoyer(id, this.selectedFoyer).subscribe(
      (data) => {
        this.loadFoyers(); // Refresh the list
        this.selectedFoyer = null; // Clear selectedFoyer after update
        this.showCard = 'list'; // Show the list of foyers after update
      },
      (error) => {
        console.error('Error updating foyer', error);
      }
    );
  }

  deleteFoyer(id: string): void {
    this.foyerService.deleteFoyer(id).subscribe(
      () => {
        this.loadFoyers(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting foyer', error);
      }
    );
  }

  selectFoyerForUpdate(foyer: any): void {
    this.selectedFoyer = { ...foyer }; // Make a copy of foyer object
    this.showCard = 'editFoyer'; // Show the edit foyer card
  }

  viewRooms(foyer: any): void {
    this.UsersReserved = null;
    this.foyers.forEach(element => {
      if (element._id != foyer._id)
        this.showRooms[element._id] = false;
    });

    this.selectedFoyer = foyer; // Set the selected foyer
    if (this.showRooms[foyer._id]) {
      this.showRooms[foyer._id] = false; // Hide rooms if already visible
    } else {
      this.loadRooms(foyer._id);
      this.showRooms[foyer._id] = true; // Show rooms
      this.showCard = 'rooms'; // Show the rooms card
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
      (data) => {
        this.loadRooms(foyerId); // Refresh the list
        this.newRoom = {}; // Clear the form
        this.showCard = 'list'; // Show the list of foyers after creating a room
      },
      (error) => {
        console.error('Error creating room', error);
      }
    );
  }

  updateRoom(roomId: string): void {
    // Update capacity based on room type change
    if (this.selectedRoom.type === 'double') {
      this.selectedRoom.capacity = 2; // Update capacity for double rooms
    } else if (this.selectedRoom.type === 'triple') {
      this.selectedRoom.capacity = 3; // Update capacity for triple rooms
    }
  
    // Call roomService to update the room
    this.roomService.updateRoom(roomId, this.selectedRoom).subscribe(
      (data) => {
        this.loadRooms(this.selectedFoyer._id); // Refresh the list of rooms
        this.selectedRoom = null; // Clear selectedRoom after update
        this.showCard = 'rooms'; // Show the rooms card after updating a room
      },
      (error) => {
        console.error('Error updating room', error);
      }
    );
  }
  
  

  deleteRoom(roomId: string): void {
    this.roomService.deleteRoom(roomId).subscribe(
      () => {
        this.loadRooms(this.selectedFoyer._id); // Refresh the list
      },
      (error) => {
        console.error('Error deleting room', error);
      }
    );
  }

  selectRoomForUpdate(room: any): void {
    this.selectedRoom = { ...room }; // Make a copy of room object to avoid mutating the original
    this.showCard = 'editRoom'; // Show the edit room card
  }

  id_user = '6683e1c309d9b20f76f09c1d';  // ID utilisateur statique

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
    const reservation = { roomId, userId: this.id_user, places: 1 };  // Inclure l'ID utilisateur statique
    this.roomService.reserveRoom(reservation).subscribe(
      (data) => {
        this.loadFoyers();
        this.viewRooms(this.selectedFoyer);
        this.loadRooms(this.selectedFoyer._id); // Rafraîchir la liste
      },
      (error: any) => {
        console.error('Error reserving room', error);
      }
    );
  }

  public cancelReservation(reservationId: string): Observable<any> {
    return this.roomService.cancelReservation(reservationId);
  }

  // Method to create a new room associated with a specific foyer
  createNewRoom(foyerId: string): void {
    this.selectedFoyer = this.foyers.find(foyer => foyer._id === foyerId); // Set the selected foyer
    this.newRoom = {}; // Clear previous newRoom data
    this.newRoom.foyerId = foyerId; // Assign the foyerId to newRoom
    this.showCard = 'createRoom'; // Show the create room card
  }

  UsersReserved: any[] = [];

  getusersreservationRooms(roomId: string): void {
    this.roomService.getRoomReservationById(roomId).subscribe(
      (data) => {
        this.UsersReserved = data;
      },
      (error: any) => {
        console.error('Error reserving room', error);
      }
    );
  }

  // Method to show the create foyer card
  showCreateFoyerCard(): void {
    this.newFoyer = {}; // Clear previous newFoyer data
    this.showCard = 'createFoyer'; // Show the create foyer card
  }

  // Method to hide all cards except the list of foyers
  hideAllCards(): void {
    this.showCard = 'list'; // Show the list of foyers
  }
  showCreateFoyerForm(): void {
    this.showCard = 'createFoyer';
  }

  onRoomTypeChange(): void {
    // Update capacity based on room type
    if (this.newRoom.type === 'double') {
      this.newRoom.capacity = 2; // Update capacity for double rooms
    } else if (this.newRoom.type === 'triple') {
      this.newRoom.capacity = 3; // Update capacity for triple rooms
    }
  }
}