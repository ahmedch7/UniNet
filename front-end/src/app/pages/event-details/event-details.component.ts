import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../Services/Event.Service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  event: any;
  newCommentText: string = '';
  updatedText: string = '';
  statuses: string[] = ['Available', 'Planned', 'Ongoing', 'Ended', 'Full','Canceled'];
  isEditingEvent: boolean = false;
  originalEventData: any;
  selectedFile: File | null = null;
  selectedComment: any; 
  alerts: { type: string, message: string }[] = [];
  userId: string;
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private socket: Socket,
    private router: Router
  ) { }
  addAlert(type: string, message: string): void {
    const alert = { type, message };
    this.alerts.push(alert);
    setTimeout(() => {
      this.removeAlert(alert);
    }, 5000); // Adjust the timeout as needed
  }

  removeAlert(alert: any): void {
    const index = this.alerts.indexOf(alert);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '66530a6b9bba527817c159e2';
    this.userRole = localStorage.getItem('userRole')|| 'admin';
    console.log('UserRole:', this.userRole);
    console.log('Userid:', this.userId);
    const eventId = this.route.snapshot.paramMap.get('id')!;
    if (eventId) {
      this.eventService.getEvent(eventId).subscribe(
        (data) => {
          this.event = data;
          this.originalEventData = { ...data };

          this.checkAndUpdateStatus();
        },
        (error) => {
          console.error('Error fetching event details:', error);
        }
      );
    }

    this.socket.on('new-comment', (newComment: any) => {
      this.event.comments.push(newComment);
    });
  }

  deleteEvent(): void {
    if (this.userRole !== 'responsable' && this.userRole !== 'admin') {
      this.addAlert('danger', 'You do not have permission to delete this event.');
      console.log('UserRole:', this.userRole);
      console.log('Userid:', this.userId);
      return;
    }

    const id = this.event._id;
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.router.navigate(['/event-list']);
      });
    }
  }
  participate(): void {
    if (this.event.Nbplaces > 0) {
      const username = 'John Doe'; // Replace with the actual username

      this.eventService.participateEvent(this.event._id, this.userId, username).subscribe(
        (updatedEvent) => {
          console.log(this.userId)
          this.event = updatedEvent;
          this.addAlert('success', 'Successfully participated in the event! A Email has been sent to you with more informations');
        },
        (error) => {
          console.error('Error participating in event:', error);
          this.addAlert('danger', 'Failed to participate in the event. Please try again.');
        }
      );
    } else {
      console.log('No more places available');
      this.addAlert('warning', 'No more places available.');
    }
  }

  removeParticipation(): void {
    // Replace with actual user ID
    const participation = this.event.participants.find(participant => participant.user === this.userId);

    if (!participation) {
      console.error('Participant not found');
      this.addAlert('danger', 'Participant not found.');

      return;
    }

    const participationId = participation._id;
    const eventId = this.event._id;

    this.eventService.deleteParticipation(eventId, participationId).subscribe(
      () => {
        // Update local event state
        this.event.Nbplaces++;
        this.event.status = 'Available'; // Update status as needed
        // Remove the participant from local event participants array
        this.event.participants = this.event.participants.filter(participant => participant._id !== participationId);
        console.log('Participation removed successfully');
        this.addAlert('success', 'Participation removed successfully.');

      },
      (error) => {
        console.error('Error removing participation:', error);
        this.addAlert('danger', 'Error removing participation.');

      }
    );
  }

  isParticipating(): boolean {
    return this.event.participants.some(participant => participant.user === this.userId);
  }

  checkAndUpdateStatus(): void {
    if (this.event) {
      const currentDate = new Date();
      const eventDate = new Date(this.event.date);

      console.log('Current Date:', currentDate.toISOString());
      console.log('Event Date:', eventDate.toISOString());

      if (eventDate <= currentDate) {
        this.event.status = 'Ended';
      } else if (this.event.Nbplaces === 0) {
        this.event.status = 'Full';
      }

      this.eventService.updateEvent(this.event).subscribe(
        () => {
          console.log('Event status updated successfully');
        },
        (error) => {
          console.error('Error updating event status:', error);
        }
      );
    }
  }

  enableEditing(): void {
    if (this.userRole !== 'responsable' && this.userRole !== 'admin') {
      this.addAlert('danger', 'You do not have permission to edit this event.');
      return;
    }
    this.isEditingEvent = true;
  }

  cancelEditing(): void {
    this.isEditingEvent = false;
    this.event = { ...this.originalEventData };
    this.selectedFile = null;
  }

  updateEvent(): void {
    if (this.userRole !== 'responsable' && this.userRole !== 'admin') {
      this.addAlert('danger', 'You do not have permission to update this event.');
      return;
    }
    this.eventService.updateEvent(this.event).subscribe(
      (updatedEvent) => {
        this.event = updatedEvent;
        this.isEditingEvent = false; // Exit editing mode after successful update
        this.addAlert('success', 'Event updated successfully.');
      },
      (error) => {
        console.error('Error updating event:', error);
        this.addAlert('danger', 'Error updating event.');
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.event.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enableCommentEditing(comment: any): void {
    comment.editing = true; // Set editing flag for the selected comment
    comment.updatedText = comment.text; // Store original comment text for editing
    this.selectedComment = comment; // Set selected comment for reference during update
  }

  cancelCommentEditing(comment: any): void {
    comment.editing = false; // Clear editing flag
    comment.updatedText = ''; // Clear updated text
    this.selectedComment = null; // Clear selected comment
  }

  updateComment(comment: any): void {
    if (!comment.updatedText.trim()) {
      console.error('Cannot update comment: Updated text is empty.');
      this.addAlert('warning', 'Cannot update comment: Updated text is empty.');
      return;
    }

    const eventId = this.event._id; // Adjust based on your event object structure
    const commentId = comment._id; // Ensure _id is defined on the selected comment
    if (comment.user !== this.userId && this.userRole !== 'admin' && this.userRole !== 'responsable') {
      this.addAlert('danger', 'You do not have permission to update this comment.');
      return;
    }
    this.eventService.updateComment(eventId, commentId, comment.updatedText).subscribe(
      () => {
        // Update the updated comment in local event object
        comment.text = comment.updatedText;
        console.log('Comment updated successfully');
        this.cancelCommentEditing(comment); // Clear editing mode after successful update
        this.addAlert('success', 'Comment updated successfully.');

      },
      (error) => {
        console.error('Error updating comment:', error);
        this.addAlert('danger', 'Error updating comment.');

      }
    );
  }

  addComment(): void {
    if (this.newCommentText.trim()) {

      this.eventService.addComment(this.event._id, this.newCommentText, this.userId).subscribe(
        (comment) => {
          this.newCommentText = '';
          this.addAlert('success', 'Comment added successfully.');
        },
        (error) => {
          console.error('Error adding comment:', error);
          this.addAlert('danger', 'Error adding comment.');
        }
      );
    } else {
      this.addAlert('warning', 'Comment text cannot be empty.');
    }
  }

  deleteComment(commentId: string): void {
    const eventId = this.event._id; // Adjust based on your event object structure
    const comment = this.event.comments.find(comment => comment._id === commentId);
    if (!comment || (comment.user !== this.userId && this.userRole !== 'admin' && this.userRole !== 'responsable')) {
      this.addAlert('danger', 'You do not have permission to delete this comment.');
      return;
    }
    this.eventService.deleteComment(eventId, commentId).subscribe(
      () => {
        // Update UI or reload event details after successful deletion if needed
        console.log('Comment deleted successfully');
        this.event.comments = this.event.comments.filter(comment => comment._id !== commentId);
        this.addAlert('success', 'Comment deleted successfully.');

      },
      (error) => {
        console.error('Error deleting comment:', error);
        this.addAlert('danger', 'Error deleting comment.');

      }
    );
  }

  likeEvent(): void {
    this.eventService.likeEvent(this.event._id).subscribe(
      (updatedEvent) => {
        this.event.likes = updatedEvent.likes; // Update likes with the response from the backend
        this.event.dislikes = updatedEvent.dislikes; // Update dislikes with the response from the backend
      },
      (error) => {
        console.error('Error liking event:', error);
      }
    );
  }

  dislikeEvent(): void {
    this.eventService.dislikeEvent(this.event._id).subscribe(
      (updatedEvent) => {
        this.event.likes = updatedEvent.likes; // Update likes with the response from the backend
        this.event.dislikes = updatedEvent.dislikes; // Update dislikes with the response from the backend
      },
      (error) => {
        console.error('Error disliking event:', error);
      }
    );
  }
}
