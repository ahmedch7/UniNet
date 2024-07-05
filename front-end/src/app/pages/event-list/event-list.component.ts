import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/Event.Service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  recommendedEvents: any[] = [];
  nearbyEvents: any[] = []
  filters: any = {
    name: '',
    date: '',
    location: '',
    status: ''
  };
  sortOption: string = '';
  userId: string;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.userId = localStorage.getItem('userId') || '66530a6b9bba527817c159e2';
    this.fetchRecommendedEvents(this.userId);
    this.getUserLocationAndFetchNearbyEvents();
  }

  fetchEvents(): void {
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

  fetchRecommendedEvents(userId: string): void {
    this.eventService.fetchRecommendedEvents(userId).subscribe({
      next: (data) => {
        this.recommendedEvents = data; // Assign to recommendedEvents, not events
      },
      error: (error) => {
        console.error('Error fetching recommended events:', error);
      }
    });
  }

  private extractTags(events: any[]): string[] {
    const tags = events.flatMap(event => event.tags);
    return [...new Set(tags)]; // Remove duplicates
  }

  private extractCategories(events: any[]): string[] {
    const categories = events.flatMap(event => event.categories);
    return [...new Set(categories)]; // Remove duplicates
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
  
  getUserLocationAndFetchNearbyEvents(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.fetchNearbyEvents(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  fetchNearbyEvents(latitude: number, longitude: number): void {
    this.eventService.getNearbyEvents(latitude, longitude).subscribe(
      (events) => {
        this.nearbyEvents = events;
      },
      (error) => {
        console.error('Error fetching nearby events:', error);
      }
    );
  }
}
