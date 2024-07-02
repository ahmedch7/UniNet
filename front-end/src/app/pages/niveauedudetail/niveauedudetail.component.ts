import { Component, OnInit } from '@angular/core';
import { NiveauEducatif } from '../../models/niveauEdu';
import { Classe } from '../../models/classe';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { NiveauService } from 'src/app/services/niveau.service';
import { ClasseService } from 'src/app/services/classe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-niveauedudetail',
  templateUrl: './niveauedudetail.component.html',
  styleUrls: ['./niveauedudetail.component.scss']
})
export class NiveauedudetailComponent implements OnInit {

  niveau: NiveauEducatif | undefined;
  classes: Classe[] = [];

  constructor(
    private route: ActivatedRoute,
    private nS: NiveauService,
    private classeService: ClasseService,
    private router: Router
  ) { }

  form = new FormGroup({
    classe: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nS.getNiveauById(id).subscribe({
        next: (data) => {
          this.niveau = data;
          if (this.niveau?._id) {
            this.classeService.getClasseByNiveau(this.niveau._id).subscribe({
              next: (classes) => {
                this.classes = classes;
                console.log('Classes:', this.classes); // Log fetched classes
                // Automatically load students for each class
                this.classes.forEach(classe => this.loadStudentsForClass(classe));
              },
              error: (error) => {
                console.error('Failed to retrieve classes for niveau', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Failed to retrieve niveau details', error);
        }
      });
    }
  }

  loadStudentsForClass(classe: Classe): void {
    this.classeService.getStudentsByClasse(classe._id).subscribe({
      next: (students: User[]) => {
        console.log('Students for class', classe._id, ':', students); // Log fetched students
        classe.User = students;
      },
      error: (error) => {
        console.error(`Failed to retrieve students for class ${classe._id}`, error);
        // Optionally handle the error or display a message to the user
      }
    });
  }
  navigateToClassDetail(classId: string): void {
    this.router.navigate(['/class', classId]);
  }
}
