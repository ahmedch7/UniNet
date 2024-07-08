// update-examen.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service'; 
import { Examen } from 'src/app/models/examens'; // Assurez-vous d'importer correctement votre modèle Examen
import { DatePipe } from '@angular/common';
import { SalleService } from 'src/app/services/salle.service';
@Component({
  selector: 'app-update-examen',
  templateUrl: './update-examen.component.html',
  styleUrls: ['./update-examen.component.scss']
})
export class UpdateExamenComponent implements OnInit {

  examenForm: FormGroup;
  examenId: string = '';
  salles: any[] = []; // Déclarer et initialiser la propriété salles

  constructor(
    private formBuilder: FormBuilder,
    private examenService: ExamenService,
    private salleService: SalleService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.examenForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      salle: ['', Validators.required],
      classe: ['', Validators.required],
      module: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      typeSession: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.paramMap.get('id')!;
    this.loadExamen();
    this.loadSalles(); // Charger les salles disponibles lors de l'initialisation du composant
  }

  loadExamen(): void {
    this.examenService.getExamen(this.examenId).subscribe(
      (examen: Examen) => {
        const formattedDate = this.datePipe.transform(examen.date, 'yyyy-MM-dd');
        const heureDebutDate = new Date(examen.heureDebut);
        const heureFinDate = new Date(examen.heureFin);

        const formattedHeureDebut = this.datePipe.transform(heureDebutDate, 'HH:mm');
        const formattedHeureFin = this.datePipe.transform(heureFinDate, 'HH:mm');

        this.examenForm.patchValue({
          ...examen,
          date: formattedDate,
          heureDebut: formattedHeureDebut,
          heureFin: formattedHeureFin,
        });
      },
      (error: any) => {
        console.error('Error fetching examen details:', error);
      }
    );
  }

  loadSalles(): void {
    // Exemple: Charger les salles depuis un service (ExamenService)
    this.salleService.getAllSalles().subscribe(
      (salles: any[]) => {
        this.salles = salles;
      },
      (error: any) => {
        console.error('Error fetching salles:', error);
      }
    );
  }

  updateExamen(): void {
    if (this.examenForm.valid) {
      const formValues = this.examenForm.value;
      const heureDebut = this.combineDateTime(formValues.date, formValues.heureDebut);
      const heureFin = this.combineDateTime(formValues.date, formValues.heureFin);

      const updatedExamen = {
        ...formValues,
        heureDebut,
        heureFin,
      };

      this.examenService.updateExamen(this.examenId, updatedExamen).subscribe(
        () => {
          console.log('Examen updated successfully.');
          this.router.navigate(['/list-examen']);
        },
        (error: any) => {
          console.error('Error updating examen:', error);
        }
      );
    } else {
      console.error('Form validation failed.');
    }
  }

  combineDateTime(date: string, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes);
    return combined;
  }
}
