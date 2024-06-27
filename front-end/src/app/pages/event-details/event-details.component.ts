import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  statuses: string[] = ['Available','Planned', 'Ongoing', 'Ended', 'Full'];
  isEditing: boolean = false;
  originalEventData: any;
  selectedFile: File | null = null;
  constructor(private route: ActivatedRoute, private eventService: EventService,    private socket: Socket, private router: Router,
  ) { }

  ngOnInit(): void {
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
    const id = this.event._id;
    this.eventService.deleteEvent(id).subscribe(() => {
      this.router.navigate(['/Events']);
    });
  }
  participate(): void {
    if (this.event.Nbplaces > 0) {
      this.event.Nbplaces--;
      if (this.event.Nbplaces === 0) {
        this.event.status = 'Full';
      }
      this.eventService.updateEvent(this.event).subscribe(
        () => {
          console.log('Event updated successfully');
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
    } else {
      console.log('No more places available');
    }
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
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.event = { ...this.originalEventData };
    this.selectedFile = null; 
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

  updateEvent(): void {
    this.eventService.updateEvent(this.event).subscribe(
      (updatedEvent) => {
        this.event = updatedEvent;
        this.originalEventData = { ...updatedEvent };
        this.isEditing = false;
        console.log('Event updated successfully');
      },
      (error) => {
        console.error('Error updating event:', error);
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
  addComment(): void {
    if (this.newCommentText.trim()) {
      //const userId = '66530ac49bba527817c159e8'; 
      const userId = '66530a6b9bba527817c159e2'; 

      this.eventService.addComment(this.event._id, this.newCommentText, userId).subscribe(
        (comment) => {
          this.newCommentText = ''; 
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
  deleteComment(eventId: string, commentId: string): void {
    // Call your event service to delete the comment
    this.eventService.deleteComment(eventId, commentId).subscribe(
      () => {
        // Refresh the event comments after deletion
        // You might want to reload the event data or refresh the comments list
        // Example: this.getEventDetails(this.eventId);
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }
  
  updateComment(eventId: string, commentId: string): void {
    // Call your event service to update the comment
    this.eventService.updateComment(eventId, commentId, this.updatedText).subscribe(
      () => {
        // Refresh the event comments after update
        // You might want to reload the event data or refresh the comments list
        // Example: this.getEventDetails(this.eventId);
      },
      (error) => {
        console.error('Error updating comment:', error);
      }
    );
  }
}
