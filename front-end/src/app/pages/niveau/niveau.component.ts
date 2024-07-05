import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NiveauEducatif } from '../../models/niveauEdu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NiveauService } from '../../services/niveau.service';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent {
  niveauList: NiveauEducatif[] = [];
  editing: { [key: string]: boolean } = {};

  form = new FormGroup({
    NomNiveau: new FormControl('', [Validators.required])
  });

  constructor(private nS: NiveauService, private router: Router) {}

  ngOnInit(): void {
    this.fetchNiveauList();
  }

  fetchNiveauList() {
    this.nS.getNiveau().subscribe({
      next: (data) => {
        this.niveauList = data as NiveauEducatif[];
      },
      error: (error) => {
        console.error('Error fetching levels', error);
      }
    });
  }

  toUpdate(id: string) {
    this.editing[id] = true;
  }

  saveUpdate(niveau: NiveauEducatif) {
    this.editing[niveau._id] = false;
    this.nS.updateNiveauById(niveau).subscribe({
      next: (data) => {
        console.log('Update successful', data);
      },
      error: (error) => {
        console.error('Update failed', error);
      }
    });
  }

  cancelUpdate(id: string) {
    this.editing[id] = false;
    this.fetchNiveauList(); // Re-fetch niveauList to revert any changes
  }

  deleteNiv(id: string): void {
    this.nS.deleteNiveau(id).subscribe(() => {
      this.niveauList = this.niveauList.filter(niveau => niveau._id !== id);
    }, error => {
      console.error('Delete failed', error);
    });
  }
  get nomNiveau(){
    return this.form.get('nomNiveau')
  }

  create() {
    if (this.form.valid) {
      this.nS.createEvent(this.form.value as NiveauEducatif).subscribe({
        next: () => {
          this.fetchNiveauList(); // Refresh niveauList after creation
          this.form.reset(); // Optionally reset the form after successful creation
        },
        error: (error) => {
          console.error('Create failed', error);
        }
      });
    }
  }
}
