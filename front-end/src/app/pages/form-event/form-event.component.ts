import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../Services/Event.Service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {
  eventForm!: FormGroup;
  latitude = 36.852076077799204;
  longitude = 10.207183522406792;
  locationChosen = false;
  showMap = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private mapsAPILoader: MapsAPILoader
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      status: ['Available', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      image: ['', Validators.required],
      Nbplaces: ['', [Validators.required, Validators.min(20)]],
      location: ['', Validators.required],
      tags: [[], Validators.required],
      categories: [[], Validators.required]
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { location: string };

    if (state && state.location) {
      this.eventForm.patchValue({ location: state.location });
    }
  }

  toggleMap(): void {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.loadMap();
    }
  }

  loadMap(): void {
    this.mapsAPILoader.load().then(() => {
      // Google Maps API loaded, you can now use the Google Maps API
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }

  onChoseLocation(event): void {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
    this.convertToAddress(this.latitude, this.longitude).then(address => {
      this.eventForm.patchValue({ location: address });
      this.showMap = false; // Hide the map after selecting the location
    });
  }

  private async convertToAddress(latitude: number, longitude: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.mapsAPILoader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          if (status === 'OK') {
            if (results && results.length > 0) {
              const formatted_address = results[0].formatted_address;
              resolve(formatted_address);
            } else {
              reject(new Error('No results found'));
            }
          } else {
            reject(new Error('Geocoder failed'));
          }
        });
      });
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.eventForm.patchValue({
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  dateValidator(control): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { invalidDate: true };
  }

 
  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValues = this.eventForm.value;
  
      // Combine date and time into a single Date object
      const eventDateTime = new Date(`${formValues.eventDate}T${formValues.eventTime}`);
      const eventPayload = {
        ...formValues,
        date: eventDateTime,
        eventDate: undefined, // Remove individual date and time fields
        eventTime: undefined
      };
  
      this.eventService.createEvent(eventPayload).subscribe(
        response => {
          console.log('Event created successfully:', response);
        },
        error => {
          console.error('Error creating event:', error);
        }
      );
    }
  }
  
}
