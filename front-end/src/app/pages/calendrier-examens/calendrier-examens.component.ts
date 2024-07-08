import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import { MatDialog } from '@angular/material/dialog';
import { Examen } from 'src/app/models/examens';
import { ExamenService } from 'src/app/services/examen.service';
import { ExamenDetailsComponent } from '../examen-details/examen-details.component';

@Component({
  selector: 'app-calendrier-examens',
  templateUrl: './calendrier-examens.component.html',
  styleUrls: ['./calendrier-examens.component.scss']
})
export class CalendrierExamensComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: []
  };

  constructor(private examenService: ExamenService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadExamens();
  }

  loadExamens(): void {
    this.examenService.getExamens().subscribe(
      (examens: Examen[]) => {
        const events = examens.map(examen => ({
          title: `${examen.title} (salle: ${examen.salle})`, 
          date: new Date(examen.date).toISOString().split('T')[0] // Assurez-vous que la date est correctement formatée
        }));
        console.log('Events generated:', events); // Pour déboguer et voir les événements générés
        this.calendarOptions.events = events;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des examens:', error);
      }
    );
  }
  

  openExamenDetailsDialog(examen: Examen): void {
    this.dialog.open(ExamenDetailsComponent, {
      width: '600px',
      data: examen
    });
  }
}
