import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/Event.Service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  filters: any = {
    name: '',
    date: '',
    location: '',
    status: ''
  };
  sortOption: string = '';

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;
        this.filteredEvents = [...this.events];
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onEventClick(eventId: string): void {
    this.router.navigate(['/event-details', eventId]);
  }
  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesName = event.name.toLowerCase().includes(this.filters.name.toLowerCase());
      const matchesDate = !this.filters.date || new Date(event.date).toDateString() === new Date(this.filters.date).toDateString();
      const matchesLocation = event.location.toLowerCase().includes(this.filters.location.toLowerCase());
      const matchesStatus = !this.filters.status || event.status === this.filters.status;
      console.log("hello i m clicked")
      console.log(matchesName)
      console.log(matchesDate)
      console.log(matchesLocation)
      console.log(matchesStatus)

      return matchesName && matchesDate && matchesLocation && matchesStatus;
    });
  }

  resetFilters(): void {
    this.filters = {
      name: '',
      date: '',
      location: '',
      status: ''
    };
    this.filteredEvents = [...this.events];
  }
  sortEvents(): void {
    if (this.sortOption === 'dateAsc') {
      this.filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortOption === 'dateDesc') {
      this.filteredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortOption === 'placesAsc') {
      this.filteredEvents.sort((a, b) => a.Nbplaces - b.Nbplaces);
    } else if (this.sortOption === 'placesDesc') {
      this.filteredEvents.sort((a, b) => b.Nbplaces - a.Nbplaces);
    } else if (this.sortOption === 'statusAsc') {
      this.filteredEvents.sort((a, b) => a.status.localeCompare(b.status));
    } else if (this.sortOption === 'statusDesc') {
      this.filteredEvents.sort((a, b) => b.status.localeCompare(a.status));
    }
  }
}
  
