import { Component, OnInit } from '@angular/core';
import { FoyerService } from '../../services/foyer.service';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent implements OnInit {
  foyers: any[] = [];
  newFoyer: any = {};
  selectedFoyer: any = null;
  roomsByFoyer: { [key: string]: any[] } = {}; // Store rooms for each foyer
  newRoom: any = {};
  selectedRoom: any = null;
  showRooms: { [key: string]: boolean } = {}; // Track room visibility for each foyer

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

  createFoyer(): void {
    this.foyerService.createFoyer(this.newFoyer).subscribe(
      (data) => {
        this.loadFoyers(); // Refresh the list
        this.newFoyer = {}; // Clear the form
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
    this.selectedFoyer = { ...foyer }; // Make a copy of foyer object to avoid mutating the original
    this.loadRooms(foyer._id);
  }

  viewRooms(foyer: any): void {
    console.log("test", foyer._id)
    console.log("this.selectedFoyer", this.selectedFoyer)

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
      },
      (error) => {
        console.error('Error creating room', error);
      }
    );
  }

  updateRoom(roomId: string): void {
    this.roomService.updateRoom(roomId, this.selectedRoom).subscribe(
      (data) => {
        this.loadRooms(this.selectedFoyer._id); // Refresh the list
        this.selectedRoom = null; // Clear selectedRoom after update
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
  }

  id_user = '664f89f28fb320b8082864b5';  // ID utilisateur statique

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
        console.log('Room reserved successfully', data);
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
  }
}
