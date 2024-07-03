import { Component, OnInit, Renderer2 } from '@angular/core';
import { FoyerService } from 'src/app/Services/foyer.service';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-foyer-statistics',
  templateUrl: './foyer-statistics.component.html',
  styleUrls: ['./foyer-statistics.component.scss']
})
export class FoyerStatisticsComponent implements OnInit {
  foyers: any[] = [];
  roomsByFoyer: { [key: string]: any[] } = {}; // Stocke les chambres pour chaque foyer
  totalFoyers: number = 0;
  totalRooms: number = 0;
  totalAvailablePlaces: number = 0;

 
  constructor(private foyerService: FoyerService, private roomService: RoomService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadFoyers();
  }

  loadFoyers(): void {
    this.foyerService.getFoyers().subscribe(
      (data) => {
        this.foyers = data;
        this.totalFoyers = this.foyers.length;
        this.loadRoomsForAllFoyers();
      },
      (error) => {
        console.error('Error loading foyers', error);
      }
    );
  }

  loadRoomsForAllFoyers(): void {
    this.foyers.forEach(foyer => {
      this.roomService.getRoomsByFoyerId(foyer._id).subscribe(
        (data) => {
          this.roomsByFoyer[foyer._id] = data;
          this.totalRooms += data.length;
          this.calculateAvailablePlaces(data);
        },
        (error) => {
          console.error('Error loading rooms', error);
        }
      );
    });
  }

  calculateAvailablePlaces(rooms: any[]): void {
    rooms.forEach(room => {
      this.totalAvailablePlaces += room.availablePlaces;
    });
  }

  getNumberOfRooms(foyerId: string): number {
    return this.roomsByFoyer[foyerId] ? this.roomsByFoyer[foyerId].length : 0;
  }

  getAvailablePlaces(foyerId: string): number {
    return this.roomsByFoyer[foyerId] ? this.roomsByFoyer[foyerId].reduce((acc, room) => acc + room.availablePlaces, 0) : 0;
  }
}
