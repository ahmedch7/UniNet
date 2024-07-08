import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Examen } from 'src/app/models/examens';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-list-examen',
  templateUrl: './list-examen.component.html',
  styleUrls: ['./list-examen.component.scss']
})
export class ListExamenComponent implements OnInit {
  examens: (Examen & { formattedHeureDebut: string; formattedHeureFin: string; editing: boolean })[] = [];
  examenForm: FormGroup;

  constructor(private examenService: ExamenService, private formBuilder: FormBuilder) {
    this.examenForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      salle: ['', Validators.required],
      classe: ['', Validators.required],
      module: ['', Validators.required],
      typeSession: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadExamens();
  }

  loadExamens(): void {
    this.examenService.getExamens().subscribe(
      (examens: Examen[]) => {
        this.examens = examens.map(examen => ({
          ...examen,
          date: new Date(examen.date),
          heureDebut: new Date(examen.heureDebut),
          heureFin: new Date(examen.heureFin),
          formattedHeureDebut: this.formatTime(new Date(examen.heureDebut)),
          formattedHeureFin: this.formatTime(new Date(examen.heureFin)),
          editing: false
        }));
        console.log('Examens chargés:', this.examens);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des examens:', error);
      }
    );
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  deleteExamen(id: string): void {
    if (confirm('Are you sure you want to delete this examen?')) {
      this.examenService.deleteExamen(id).subscribe(
        () => {
          console.log('Examen deleted successfully.');
          this.loadExamens();
        },
        (error: any) => {
          console.error('Error deleting examen:', error);
        }
      );
    }
  }

  editExamen(index: number): void {
    this.examens[index].editing = true;
    const examen = this.examens[index];
    this.examenForm.patchValue({
      title: examen.title,
      description: examen.description,
      date: this.formatDate(examen.date),
      heureDebut: this.formatTime(examen.heureDebut),
      heureFin: this.formatTime(examen.heureFin),
      salle: examen.salle,
      classe: examen.classe,
      module: examen.module,
      typeSession: examen.typeSession
    });
  }

  cancelEdit(examen: Examen & { editing: boolean }): void {
    examen.editing = false;
    this.examenForm.reset();
  }

  updateExamen(examen: Examen & { editing: boolean }): void {
    if (this.examenForm.valid) {
      const formValues = this.examenForm.value;
      const updatedExamen: Examen = {
        ...examen,
        ...formValues,
        date: new Date(formValues.date),
        heureDebut: this.combineDateTime(formValues.date, formValues.heureDebut),
        heureFin: this.combineDateTime(formValues.date, formValues.heureFin)
      };

      this.examenService.updateExamen(updatedExamen._id, updatedExamen).subscribe(
        () => {
          console.log('Examen updated successfully.');
          this.loadExamens();
        },
        (error: any) => {
          console.error('Error updating examen:', error);
        }
      );

      examen.editing = false;
      this.examenForm.reset();
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

  formatDate(date: Date): string {
    return date.toISOString().substring(0, 10); // Format the date as 'YYYY-MM-DD'
  }
}
