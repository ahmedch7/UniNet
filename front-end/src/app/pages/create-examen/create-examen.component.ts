import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import { Salle } from 'src/app/models/salles'; 
@Component({
  selector: 'app-create-examen',
  templateUrl: './create-examen.component.html',
})
export class CreateExamenComponent implements OnInit {
  examenForm!: FormGroup;
  sallesDisponibles: Salle[] = [];
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private examenService: ExamenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupFormChangeListeners();
  }

  initForm(): void {
    this.examenForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      date: [null, Validators.required],
      heureDebut: [null, Validators.required],
      heureFin: [null, Validators.required],
      salle: [null, Validators.required],
      classe: ['', Validators.required],
      module: ['', Validators.required],
      typeSession: ['principale', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]]
    });
  
  }

  setupFormChangeListeners(): void {
    this.examenForm.get('date')?.valueChanges.subscribe(() => this.fetchAvailableSalles());
    this.examenForm.get('heureDebut')?.valueChanges.subscribe(() => this.fetchAvailableSalles());
    this.examenForm.get('heureFin')?.valueChanges.subscribe(() => this.fetchAvailableSalles());
  }

  fetchAvailableSalles(): void {
    const { date, heureDebut, heureFin } = this.examenForm.value;
    if (date && heureDebut && heureFin) {
      this.examenService.getSallesDisponibles(date, heureDebut, heureFin).subscribe(
        (salles: Salle[]) => {
          this.sallesDisponibles = salles;
          this.errorMessage = '';
        },
        (error: any) => {
          console.error('Error fetching available salles:', error);
          this.errorMessage = 'Erreur lors du chargement des salles disponibles.';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.examenForm.valid) {
      const formData = this.examenForm.value;
      if (this.sallesDisponibles.some(s => s._id === formData.salle)) {
        this.examenService.createExamen(formData).subscribe(
          (response: any) => {
            console.log('Examen ajouté avec succès.', response);
            this.router.navigate(['/list-examens']);
          },
          (error: any) => {
            console.error('Error adding examen:', error);
            this.errorMessage = 'Erreur lors de l\'ajout de l\'examen.';
          }
        );
      } else {
        this.errorMessage = 'La salle sélectionnée n\'est pas disponible pour cette date et heure.';
      }
    } else {
      console.error('Formulaire invalide.');
    }
  }
}
