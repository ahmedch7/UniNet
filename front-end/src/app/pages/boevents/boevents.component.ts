import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/Event.Service';
import { Chart, ChartOptions } from 'chart.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
declare var google: any;

@Component({
  selector: 'app-boevents',
  templateUrl: './boevents.component.html',
  styleUrls: ['./boevents.component.scss']
})
export class BOEventsComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  filterStatus: string = '';
  filterCategory: string = '';
  filterLocation: string = '';
  filterDate: string = '';
  p: number = 1;
  itemsPerPage: number = 5;

  statusOptions: string[] = ['Available', 'Full', 'Ended', 'Canceled'];
  categoryOptions: string[] = ['Technology', 'Business', 'Art', 'Science', 'Education', 'Health', 'Sports', 'Music', 'Food', 'Other'];
  locationOptions: string[] = ['Location 1', 'Location 2', 'Location 3'];
  categoryCounts: { [key: string]: number } = {};
  tagCounts: { [key: string]: number } = {};
  tagOptions: string[] = [];
  likesCount: number = 0;
  dislikesCount: number = 0;
  selectedYear: number = new Date().getFullYear(); // Default to current year
  eventsPerMonthChart: Chart | null = null;
  eventsChart: Chart | undefined;
  eventsCreatedPerMonthChart: Chart | null = null; // Declare eventsCreatedPerMonthChart
  mostPopularRegion: string = '';
  totalParticipants: number = 0;
  private map: any;

  constructor(private eventService: EventService, private router: Router,private ngZone: NgZone) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.loadMap();

  }

  fetchEvents() {
    this.eventService.getEvents().subscribe(
      (events: any[]) => {
        this.events = events;
        this.applyFilters(); // Apply initial filters
        this.calculateCategoryCounts();
        this.calculateTagCounts();
        this.calculateLikesAndDislikes();
        this.updateEventsPerMonthChart();
        this.createEventStatusChart(); // Update status chart after fetching data
        this.updateEventsCreatedPerMonthChart(); // Update new chart
        this.initializeMap(); // Initialize the map after fetching events
        this.calculateLocationBasedMetrics();
        this.addEventMarkers(); // Add markers to the map after fetching events

      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  loadMap() {
    const mapOptions = {
      zoom: 4,
      center: { lat: 37.7749, lng: -122.4194 }, // Center map at a default location (e.g., San Francisco)
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('eventMap'), mapOptions);
  }

  initializeMap() {
    const mapOptions = {
      zoom: 4,
      center: { lat: 37.7749, lng: -122.4194 }, // Center map at a default location (e.g., San Francisco)
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('eventMap'), mapOptions);
  }

  addEventMarkers() {
    const geocoder = new google.maps.Geocoder();
  
    this.events.forEach(event => {
      if (event.location) {
        geocoder.geocode({ address: event.location }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: this.map,
              title: event.name
            });
  
            const infowindow = new google.maps.InfoWindow({
              content: `
                <div style="width: 200px;">
                  <h6>${event.name}</h6>
                  <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> ${event.location}</p>
                  <p><strong>Description:</strong> ${event.description}</p>
                  <!-- Add more event details here if needed -->
                </div>
              `
            });
  
            marker.addListener('click', () => {
              infowindow.open(this.map, marker);
            });
          }
        });
      }
    });
  }
  
  createEventStatusChart() {
    const statusCounts = this.calculateStatusCounts();
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (ctx) {
      this.eventsChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.statusOptions,
          datasets: [{
            label: 'Event Status',
            data: this.statusOptions.map(status => statusCounts[status] || 0),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                }
              }
            }
          }
        }
      });
    }
  }
 
  calculateLocationBasedMetrics() {
    const locationCounts = this.events.reduce((acc, event) => {
      acc[event.location] = (acc[event.location] || 0) + 1;
      return acc;
    }, {});

    const mostPopularRegion = Object.keys(locationCounts).reduce((a, b) => locationCounts[a] > locationCounts[b] ? a : b);
    this.mostPopularRegion = mostPopularRegion;

    this.totalParticipants = this.events.reduce((acc, event) => acc + event.participants.length, 0);
  }

    calculateCategoryCounts() {
        this.categoryCounts = {}; // Reset counts
        this.events.forEach(event => {
            event.categories.forEach(category => {
                if (this.categoryCounts[category]) {
                    this.categoryCounts[category]++;
                } else {
                    this.categoryCounts[category] = 1;
                }
            });
        });
    }

    calculateTagCounts() {
        this.tagCounts = {}; // Reset counts
        this.events.forEach(event => {
            event.tags.forEach(tag => {
                if (this.tagCounts[tag]) {
                    this.tagCounts[tag]++;
                } else {
                    this.tagCounts[tag] = 1;
                }
            });
        });
        this.tagOptions = Object.keys(this.tagCounts); // Update tagOptions based on current tags
    }

    applyFilters() {
        this.filteredEvents = this.events.filter(event =>
            (this.filterStatus ? event.status === this.filterStatus : true) &&
            (this.filterCategory ? event.categories.includes(this.filterCategory) : true) &&
            (this.filterLocation ? event.location === this.filterLocation : true) &&
            (this.filterDate ? new Date(event.date).toDateString() === new Date(this.filterDate).toDateString() : true)
        );
    }

    
    calculateStatusCounts() {
        const statusCounts: { [key: string]: number } = {};
        this.filteredEvents.forEach(event => {
            const status = event.status;
            if (statusCounts[status]) {
                statusCounts[status]++;
            } else {
                statusCounts[status] = 1;
            }
        });
        return statusCounts;
    }

    calculateLikesAndDislikes() {
        const totalEvents = this.events.length;
        this.likesCount = Math.round((this.events.reduce((total, event) => total + event.likes.length, 0) / totalEvents) * 100);
        this.dislikesCount = Math.round((this.events.reduce((total, event) => total + event.dislikes.length, 0) / totalEvents) * 100);
    }

    calculateEventsPerMonth(events: any[], year: number): any[] {
        const eventsPerMonth = {};
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const eventYear = eventDate.getFullYear();
            const eventMonth = eventDate.getMonth();

            if (eventYear === year) {
                const monthYear = `${eventMonth + 1}`.padStart(2, '0'); // Adjust for zero-indexed month
                const key = `${eventYear}-${monthYear}`;

                if (eventsPerMonth[key]) {
                    eventsPerMonth[key]++;
                } else {
                    eventsPerMonth[key] = 1;
                }
            }
        });

        // Create entries for all months of the selected year (even if no events)
        const monthsArray = Array.from({ length: 12 }, (_, i) => i + 1);
        monthsArray.forEach(month => {
            const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
            if (!eventsPerMonth[monthYear]) {
                eventsPerMonth[monthYear] = 0;
            }
        });

        const sortedEventsPerMonth = Object.keys(eventsPerMonth).sort().map(key => ({
            monthYear: key,
            count: eventsPerMonth[key]
        }));

        return sortedEventsPerMonth;
    }

    updateEventsPerMonthChart() {
        const eventsPerMonth = this.calculateEventsPerMonth(this.events, this.selectedYear);
        const labels = eventsPerMonth.map(event => event.monthYear);
        const data = eventsPerMonth.map(event => event.count);

        const ctx = document.getElementById('chart-events-per-month') as HTMLCanvasElement;
        if (this.eventsPerMonthChart) {
            this.eventsPerMonthChart.destroy();
        }

        this.eventsPerMonthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Events',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month',
                            displayFormats: {
                                month: 'MMM'
                            }
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    onYearChange(year: number) {
        this.selectedYear = year;
        this.updateEventsPerMonthChart();
    }

    availableYears(): number[] {
        const years = this.events.map(event => new Date(event.createdAt).getFullYear());
        return Array.from(new Set(years)); // Use Set to get unique years
    }

    deleteEvent(eventId: string) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.eventService.deleteEvent(eventId).subscribe(
                () => {
                    this.fetchEvents(); // Refresh events after deletion
                },
                (error) => {
                    console.error('Error deleting event:', error);
                }
            );
        }
    }
    calculateEventsCreatedPerMonth(events: any[], year: number): any[] {
      const eventsPerMonth = {};
  
      events.forEach(event => {
          const eventDate = new Date(event.createdAt);
          const eventYear = eventDate.getFullYear();
          const eventMonth = eventDate.getMonth();
  
          if (eventYear === year) {
              const monthYear = `${eventMonth + 1}`.padStart(2, '0'); // Adjust for zero-indexed month
              const key = `${eventYear}-${monthYear}`;
  
              if (eventsPerMonth[key]) {
                  eventsPerMonth[key]++;
              } else {
                  eventsPerMonth[key] = 1;
              }
          }
      });
  
      // Create entries for all months of the selected year (even if no events)
      const monthsArray = Array.from({ length: 12 }, (_, i) => i + 1);
      monthsArray.forEach(month => {
          const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
          if (!eventsPerMonth[monthYear]) {
              eventsPerMonth[monthYear] = 0;
          }
      });
  
      const sortedEventsPerMonth = Object.keys(eventsPerMonth).sort().map(key => ({
          monthYear: key,
          count: eventsPerMonth[key]
      }));
  
      return sortedEventsPerMonth;
  }
  updateEventsCreatedPerMonthChart() {
    const eventsCreatedPerMonth = this.calculateEventsCreatedPerMonth(this.events, this.selectedYear);
    const labels = eventsCreatedPerMonth.map(event => event.monthYear);
    const data = eventsCreatedPerMonth.map(event => event.count);

    const ctx = document.getElementById('chart-events-created-per-month') as HTMLCanvasElement;
    if (ctx) {
        if (this.eventsCreatedPerMonthChart) {
            this.eventsCreatedPerMonthChart.destroy();
        }

        this.eventsCreatedPerMonthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Events Created',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month',
                            displayFormats: {
                                month: 'MMM'
                            }
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
pagedEvents() {
  const start = (this.p - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredEvents.slice(start, end);
}

setPage(page: number) {
  this.p = page;
}

previousPage() {
  if (this.p > 1) {
    this.p--;
  }
}

nextPage() {
  if (this.p < this.totalPages()) {
    this.p++;
  }
}

totalPages() {
  return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
}

totalPagesArray() {
  return Array(this.totalPages()).fill(0).map((x, i) => i + 1);
}  downloadExcel() {
  const eventsData = this.events.map(event => ({
    '_id': event._id,
    'name': event.name,
    'description': event.description,
    'status': event.status,
    'date': event.date,
    'image': event.image,
    'Nbplaces': event.Nbplaces,
    'location': event.location,
    'tags': event.tags.join(', '), // Convert tags array to comma-separated string
    'categories': event.categories.join(', '), // Convert categories array to comma-separated string
    'likes': event.likes.length,
    'dislikes': event.dislikes.length,
    'comments': event.comments.length,
    'participants': event.participants.length,
    'createdAt': event.createdAt,
    'updatedAt': event.updatedAt,
    '__v': event.__v
  }));

  const totalLikes = this.events.reduce((total, event) => total + event.likes.length, 0);

  const totalsRow = {
    '_id': 'Totals',
    'name': '',
    'description': '',
    'status': '',
    'date': '',
    'image': '',
    'Nbplaces': '',
    'location': '',
    'tags': '',
    'categories': '',
    'likes': '',
    'dislikes': '',
    'comments': '',
    'participants': '',
    'createdAt': '',
    'updatedAt': '',
    '__v': ''
  };

  eventsData.push(totalsRow);
  const dateTimeString = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `EventData_${dateTimeString}.xlsx`;

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(eventsData);
  const workbook: XLSX.WorkBook = { Sheets: { 'Events': worksheet }, SheetNames: ['Events'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
  saveAs(data,fileName);
}
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';