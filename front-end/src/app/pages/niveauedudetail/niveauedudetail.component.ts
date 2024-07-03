import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NiveauService } from 'src/app/services/niveau.service';
import { ClasseService } from 'src/app/services/classe.service';
import { NiveauEducatif } from '../../models/niveauEdu';
import { Classe } from '../../models/classe';
import { User } from '../../models/user';

@Component({
  selector: 'app-niveauedudetail',
  templateUrl: './niveauedudetail.component.html',
  styleUrls: ['./niveauedudetail.component.scss']
})
export class NiveauedudetailComponent implements OnInit {

  niveau: NiveauEducatif | undefined;
  classes: Classe[] = [];
  unassignedStudents: User[] = [];
  selectedClassId: string | undefined;
  selectedStudentId: string | undefined;
  editing: { [key: string]: boolean } = {};

  form = new FormGroup({
    nomClasse: new FormControl('', [Validators.required]),
    anneeUniversitaire: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private nS: NiveauService,
    private classeService: ClasseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nS.getNiveauById(id).subscribe({
        next: (data) => {
          this.niveau = data;
          if (this.niveau?._id) {
            this.fetchClassesForNiveau(this.niveau._id);
            this.fetchUnassignedStudents();
          }
        },
        error: (error) => {
          console.error('Failed to retrieve niveau details', error);
        }
      });
    }
  }

  fetchClassesForNiveau(niveauId: string): void {
    this.classeService.getClasseByNiveau(niveauId).subscribe({
      next: (classes) => {
        this.classes = classes;
        this.classes.forEach(classe => this.loadStudentsForClass(classe));
      },
      error: (error) => {
        console.error('Failed to retrieve classes for niveau', error);
      }
    });
  }

  fetchUnassignedStudents(): void {
    this.classeService.getUnassignedStudents().subscribe({
      next: (students) => {
        this.unassignedStudents = students;
      },
      error: (error) => {
        console.error('Failed to retrieve unassigned students', error);
      }
    });
  }

  loadStudentsForClass(classe: Classe): void {
    this.classeService.getStudentsByClasse(classe._id).subscribe({
      next: (students: User[]) => {
        classe.User = students;
      },
      error: (error) => {
        console.error(`Failed to retrieve students for class ${classe._id}`, error);
      }
    });
  }

  navigateToClassDetail(classId: string): void {
    this.router.navigate(['/class', classId]);
  }

  toUpdate(id: string): void {
    this.editing[id] = true;
  }

  saveUpdate(classe: Classe): void {
    this.editing[classe._id] = false;
    this.classeService.updateClasseById(classe).subscribe({
      next: () => {
        console.log('Class updated successfully');
      },
      error: (error) => {
        console.error('Failed to update class', error);
      }
    });
  }

  cancelUpdate(id: string): void {
    this.editing[id] = false;
    this.fetchClassesForNiveau(this.niveau?._id || '');
  }

  deleteClass(classId: string): void {
    this.classeService.deleteClasse(classId).subscribe({
      next: () => {
        console.log('Class deleted successfully');
        this.classes = this.classes.filter(classe => classe._id !== classId);
      },
      error: (error) => {
        console.error('Failed to delete class', error);
      }
    });
  }

  assignStudentToClass(studentId: string, classId: string): void {
    if (studentId && classId) {
      this.classeService.assignStudentToClass(classId, studentId).subscribe({
        next: () => {
          console.log('Student assigned to class successfully');
          // Optionally, refresh the unassigned students list or show a success message
          this.fetchUnassignedStudents();
        },
        error: (error) => {
          console.error('Failed to assign student to class', error);
        }
      });
    } else {
      console.error('Please select both a student and a class to assign.');
    }
  }

  createClass(): void {
    if (this.form.valid) {
      const newClass: Partial<Classe> = {
        NomClasse: this.form.value.nomClasse,
        AnneUniversitaire: this.form.value.anneeUniversitaire,
        NiveauEducatifId: this.niveau?._id || ''
      };

      this.classeService.createClasse(newClass).subscribe({
        next: (createdClass) => {
          console.log('Class created successfully:', createdClass);
          this.classes.push(createdClass);
          this.form.reset();
        },
        error: (error) => {
          console.error('Failed to create class', error);
        }
      });
    }
  }
}