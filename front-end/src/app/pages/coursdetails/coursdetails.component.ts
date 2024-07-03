import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-coursdetails',
  templateUrl: './coursdetails.component.html',
  styleUrls: ['./coursdetails.component.scss']
})
export class CoursdetailsComponent implements OnInit {
  courses: any[] = [];
  classeId: string;

  constructor(
    private route: ActivatedRoute,
    private coursService: CoursService
  ) {}

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
}
