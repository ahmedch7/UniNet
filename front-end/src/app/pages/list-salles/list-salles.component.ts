import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salle } from 'src/app/models/salles';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-list-salles',
  templateUrl: './list-salles.component.html',
  styleUrls: ['./list-salles.component.scss']
})
export class ListSallesComponent implements OnInit {
  salles: Salle[] = [];
  salleForm: FormGroup;

  constructor(private salleService: SalleService, private fb: FormBuilder) {
    this.salleForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSalles();
  }

  loadSalles(): void {
    this.salleService.getAllSalles().subscribe(
      (salles: Salle[]) => {
        this.salles = salles;
      },
      (error: any) => {
        console.error('Error fetching salles:', error);
        // Handle error appropriately
      }
    );
  }

  updateSalle(salle: Salle & { editing: boolean }): void {
    if (this.salleForm.valid) {
      const formValues = this.salleForm.value;
      const updatedSalle: Salle = {
        ...salle,
        name: formValues.name,
        capacity: formValues.capacity,
        location: formValues.location,
        schedules: salle.schedules // Keep existing schedules unchanged
      };

      this.salleService.updateSalle(updatedSalle._id, updatedSalle).subscribe(
        () => {
          console.log('Salle updated successfully.');
          this.loadSalles();
        },
        (error: any) => {
          console.error('Error updating salle:', error);
        }
      );

      salle.editing = false;
      this.salleForm.reset();
    } else {
      console.error('Form validation failed.');
    }
  }

  deleteSalle(id: string, salle: Salle): void {
    this.salleService.deleteSalle(id).subscribe(
      () => {
        console.log('Salle deleted successfully.');
        this.loadSalles();
      },
      (error: any) => {
        console.error('Error deleting salle:', error);
      }
    );
  }
}
