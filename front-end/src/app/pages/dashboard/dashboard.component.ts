import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UniversityService } from 'src/app/services/university.service';
import { User } from 'src/app/models/user';
import { University } from 'src/app/models/university';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserModalComponent } from 'src/app/update-user-modal/update-user-modal.component';
import { UserDetailsModalComponent } from 'src/app/user-details-modal/user-details-modal.component';
import { BanUserModalComponent } from 'src/app/ban-user-modal/ban-user-modal.component';
import { DeleteUserModalComponent } from 'src/app/delete-user-modal/delete-user-modal.component';
import { CreateUniversityModalComponent } from 'src/app/create-university-modal/create-university-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;


  users: User[] = [];
  universities: University[] = [];
  errorMessage: string = '';
  constructor(private authService: AuthService,private userService: UserService,private universityService: UniversityService, private router:Router,public dialog: MatDialog) {}
  
  ngOnInit() {
    this.loadUsers();
    this.loadUniversities();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => {
        this.errorMessage = 'Failed to load users';
        console.error('Get Users error', err);
      }
    });
  }

  deleteUser(userId: string): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      width: '300px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  updateUser(userId: string): void {
    const dialogRef = this.dialog.open(UpdateUserModalComponent, {
      width: '400px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  viewUserDetails(userId: string): void {
    this.dialog.open(UserDetailsModalComponent, {
      width: '400px',
      data: { userId }
    });
  }

  banUser(userId: string): void {
    const dialogRef = this.dialog.open(BanUserModalComponent, {
      width: '300px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  loadUniversities(): void {
    this.universityService.getUniversities().subscribe({
      next: (universities) => this.universities = universities,
      error: (err) => {
        this.errorMessage = 'Failed to load universities';
        console.error('Get Universities error', err);
      }
    });
  }
  createUniversity(): void {
    const dialogRef = this.dialog.open(CreateUniversityModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reload or handle the list of universities if necessary
      }
    });
  }
  
  toProfille(){
    this.router.navigate(['profile']);
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  signout() {
    this.authService.logout();
  }

}
