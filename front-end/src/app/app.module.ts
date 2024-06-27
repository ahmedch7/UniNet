import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AdminPostsComponent } from './pages/admin-posts/admin-posts.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { UserCommentaireComponent } from './pages/user-commentaire/user-commentaire.component';
import { AdminCommentaireComponent } from './pages/admin-commentaire/admin-commentaire.component';
import { AdminForumComponent } from './pages/admin-forum/admin-forum.component';
import { UserForumComponent } from './pages/user-forum/user-forum.component';
import { ForumDetailsDialogComponent } from './forum-details-dialog/forum-details-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    MatDialogModule,
    AppRoutingModule,
    ToastrModule.forRoot()

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AdminPostsComponent,
    UserPostsComponent,
    UserCommentaireComponent,
    AdminCommentaireComponent,
    AdminForumComponent,
    UserForumComponent,
    ForumDetailsDialogComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
