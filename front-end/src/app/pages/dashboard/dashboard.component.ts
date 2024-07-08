import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { UniversityService } from "src/app/services/university.service";
import { User } from "src/app/models/user";
import { University } from "src/app/models/university";
import { MatDialog } from "@angular/material/dialog";
import { UpdateUserModalComponent } from "src/app/update-user-modal/update-user-modal.component";
import { UserDetailsModalComponent } from "src/app/user-details-modal/user-details-modal.component";
import { BanUserModalComponent } from "src/app/ban-user-modal/ban-user-modal.component";
import { DeleteUserModalComponent } from "src/app/delete-user-modal/delete-user-modal.component";
import { CreateUniversityModalComponent } from "src/app/create-university-modal/create-university-modal.component";
import { CreateUniModalComponent } from "../create-uni-modal/create-uni-modal.component";
import { UpdateUniModalComponent } from "../update-uni-modal/update-uni-modal.component";
import { DeleteUniModalComponent } from "../delete-uni-modal/delete-uni-modal.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public currentUser: User | null = null;
  

  users: User[] = [];
  universities: University[] = [];
  filteredUsers: User[] = [];
  filteredUniversities: University[] = [];
  errorMessage: string = "";
  userSearchText: string = "";
  universitySearchText: string = "";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private universityService: UniversityService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
    this.loadUsers();
    this.loadUniversities();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById("chart-orders");
    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });

    var chartSales = document.getElementById("chart-sales");
    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users; // Initialize filtered list with all users
        this.applyUserFilter(); // Apply initial filter
      },
      error: (err) => {
        this.errorMessage = "Failed to load users";
        console.error("Get Users error", err);
      },
    });
  }

  deleteUser(userId: string): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      width: "300px",
      data: { userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  updateUser(userId: string): void {
    const dialogRef = this.dialog.open(UpdateUserModalComponent, {
      width: "400px",
      data: { userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  viewUserDetails(userId: string): void {
    this.dialog.open(UserDetailsModalComponent, {
      width: "400px",
      data: { userId },
    });
  }

  banUser(userId: string): void {
    const dialogRef = this.dialog.open(BanUserModalComponent, {
      width: "300px",
      data: { userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  loadUniversities(): void {
    this.universityService.getUniversities().subscribe({
      next: (universities) => {
        this.universities = universities;
        this.filteredUniversities = universities; // Initialize filtered list with all universities
        this.applyUniversityFilter(); // Apply initial filter
      },
      error: (err) => {
        this.errorMessage = "Failed to load universities";
        console.error("Get Universities error", err);
      },
    });
  }

  createUniversity(): void {
    const dialogRef = this.dialog.open(CreateUniModalComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUniversities();
      }
    });
  }

  updateUniversity(university: University): void {
    const dialogRef = this.dialog.open(UpdateUniModalComponent, {
      width: "400px",
      data: { university },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUniversities();
      }
    });
  }

  deleteUniversity(universityId: string): void {
    const dialogRef = this.dialog.open(DeleteUniModalComponent, {
      width: "300px",
      data: { universityId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUniversities();
      }
    });
  }

  applyUserFilter(): void {
    const searchText = this.userSearchText.toLowerCase().trim();
    if (searchText.length === 0) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.nom.toLowerCase().includes(searchText) ||
          user.prenom.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.role.toLowerCase().includes(searchText)
      );
    }
  }

  applyUniversityFilter(): void {
    const searchText = this.universitySearchText.toLowerCase().trim();
    if (searchText.length === 0) {
      this.filteredUniversities = this.universities;
    } else {
      this.filteredUniversities = this.universities.filter(
        (university) =>
          university.nom.toLowerCase().includes(searchText) ||
          university.adresse.toLowerCase().includes(searchText) ||
          university.emailContact.toLowerCase().includes(searchText) ||
          university.telephoneContact.toLowerCase().includes(searchText)
      );
    }
  }

  toProfile() {
    this.router.navigate(["profile"]);
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  signout() {
    this.authService.logout();
  }
}
