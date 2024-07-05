import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from '../../models/candidature'; // Import Candidature model
import { Post } from '../../models/posts'; // Import Post model

@Component({
  selector: 'app-admin-post-candidature',
  templateUrl: './admin-post-candidature.component.html',
  styleUrls: ['./admin-post-candidature.component.scss']
})
export class AdminPostCandidatureComponent implements OnInit {
  private apiUrl = 'http://localhost:9090/candidature'; // API URL for candidatures
  candidatures: Candidature[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCandidatures().subscribe(data => {
      this.candidatures = data;
    });
  }

  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.apiUrl);
  }
  downloadCV(cvPath: string): void {
    if (cvPath) {
      // Construct full URL for downloading CV
      const downloadUrl = `http://localhost:9090/${cvPath}`; // Update with your backend route for downloading CV
      window.open(downloadUrl, '_blank'); // Open CV in a new tab/window
    } else {
      // Handle case where cvPath is not available or invalid
      console.error('CV Path not provided or invalid');
    }
  }
}
