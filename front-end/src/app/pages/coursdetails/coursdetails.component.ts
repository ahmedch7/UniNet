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
  selectedFiles: { [key: string]: File | null } = {};
  editing: { [key: string]: boolean } = {};

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

  onFileChange(event: any, course?: any): void {
    if (course) {
      this.selectedFiles[course._id] = event.target.files[0];
    } else {
      this.selectedFiles['new'] = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('NomCours', this.coursForm.get('NomCours')?.value);
    formData.append('Description', this.coursForm.get('Description')?.value);
    formData.append('classeId', this.classeId); // Corrected field name
    if (this.selectedFiles['new']) {
      formData.append('files', this.selectedFiles['new']);
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

  toUpdate(id: string): void {
    this.editing[id] = true;
  }

  saveUpdate(course: any): void {
    this.editing[course._id] = false;
    const formData = new FormData();
    formData.append('NomCours', course.NomCours);
    formData.append('Description', course.Description);
    if (this.selectedFiles[course._id]) {
      formData.append('files', this.selectedFiles[course._id]);
    }

    this.coursService.updateCoursById(course._id, formData).subscribe({
      next: () => {
        console.log('Course updated successfully');
      },
      error: (error) => {
        console.error('Failed to update course', error);
      }
    });
  }

  cancelUpdate(id: string): void {
    this.editing[id] = false;
    this.loadCoursesByClasse();
  }

  downloadFile(fileName: string): void {
    this.coursService.downloadFile(fileName).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.split('/').pop(); // Extract the file name from the path
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
}
