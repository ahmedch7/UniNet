import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-form-salle',
  templateUrl: './form-salle.component.html',
})
export class FormSalleComponent {
  salleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private salleService: SalleService,
    private router: Router
  ) {
    this.salleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.salleForm.valid) {
      this.salleService.createSalle(this.salleForm.value)
        .subscribe(
          () => {
            console.log('Salle créée avec succès.');
            this.router.navigate(['/list-salles']); // Redirect to salle list after successful creation
          },
          error => {
            console.error('Erreur lors de la création de la salle :', error);
            // Handle error appropriately
          }
        );
    } else {
      console.error('Formulaire invalide.');
      // Handle case where form is invalid
    }
  }

  goToListSalles(): void {
    this.router.navigate(['/list-salles']); // Direct navigation to salle list
  }
}
