import { Component, OnInit } from '@angular/core';
import { FoyerService } from 'src/app/Services/foyer.service';
import { RoomService } from 'src/app/Services/room.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-foyer-statistics',
  templateUrl: './foyer-statistics.component.html',
  styleUrls: ['./foyer-statistics.component.scss']
})
export class FoyerStatisticsComponent implements OnInit {
  foyers: any[] = [];
  displayedFoyers: any[] = [];
  roomsByFoyer: { [key: string]: any[] } = {}; // Stocke les chambres pour chaque foyer
  totalFoyers: number = 0;
  totalRooms: number = 0;
  totalAvailablePlaces: number = 0;
  itemsPerPage: number = 3;
  currentPage: number = 1;

  constructor(private foyerService: FoyerService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadFoyers();
  }

  loadFoyers(): void {
    this.foyerService.getFoyers().subscribe(
      (data) => {
        this.foyers = data;
        this.totalFoyers = this.foyers.length;
        this.loadRoomsForAllFoyers();
        this.updateDisplayedFoyers();
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

  onPageChanged(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updateDisplayedFoyers();
    }
  }

  updateDisplayedFoyers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedFoyers = this.foyers.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalFoyers / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.foyers);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'foyers');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
