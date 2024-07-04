import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-coursdetails',
  templateUrl: './coursdetails.component.html',
  styleUrls: ['./coursdetails.component.scss']
})
export class CoursdetailsComponent implements OnInit {
  courses: any[] = [];
  classeId: string;
  coursForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursService: CoursService,
    private fb: FormBuilder
  ) {
    this.coursForm = this.fb.group({
      NomCours: [''],
      Description: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.classeId = params.get('id'); // Assumes the URL contains a parameter named 'id'
      if (this.classeId) {
        this.loadCoursesByClasse();
      }
    });
  }

  loadCoursesByClasse(): void {
    this.coursService.getCoursesByClasse(this.classeId).subscribe(
      (data: any[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('NomCours', this.coursForm.get('NomCours')?.value);
    formData.append('Description', this.coursForm.get('Description')?.value);
    formData.append('classeId', this.classeId); // Corrected field name
    if (this.selectedFile) {
      formData.append('files', this.selectedFile);
    }

    this.coursService.createCours(formData).subscribe(
      (response) => {
        console.log('Course created successfully:', response);
        this.loadCoursesByClasse(); // Reload the courses after successful creation
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );
  }

  deleteCours(id: string): void {
    this.coursService.deleteCours(id).subscribe(
      () => {
        console.log('Course deleted successfully');
        this.loadCoursesByClasse();
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }
}
