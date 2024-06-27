import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Forum } from '../models/Forms';

@Component({
  selector: 'app-forum-details-dialog',
  templateUrl: './forum-details-dialog.component.html',
  styleUrls: ['./forum-details-dialog.component.scss']
})
export class ForumDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Forum) {}
}
