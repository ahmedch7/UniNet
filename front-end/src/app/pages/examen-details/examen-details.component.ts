import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Examen } from 'src/app/models/examens';

@Component({
  selector: 'app-examen-details',
  templateUrl: './examen-details.component.html',
  styleUrls: ['./examen-details.component.scss']
})
export class ExamenDetailsComponent {
  examen: Examen;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Examen,
    private dialogRef: MatDialogRef<ExamenDetailsComponent>
  ) {
    this.examen = data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
