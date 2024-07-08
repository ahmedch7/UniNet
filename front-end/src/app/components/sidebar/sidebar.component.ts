import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: { path: string; title: string }[];
  showDropdown?: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/icons", title: "Icons", icon: "ni-planet text-blue", class: "" },
  { path: "/maps", title: "Maps", icon: "ni-pin-3 text-orange", class: "" },
  {
    path: "/user-profile",
    title: "User profile",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/stat-foyer",
    title: "TK Statistiques foyer",
    icon: "ni-building text-red",
    class: "",
  },
  {
    path: "/foyer",
    title: "TK Foyer",
    icon: "ni-building text-red",
    class: "",
  },
  {
    path: "/restaurant",
    title: "TK Restaurant",
    icon: "ni-building text-red",
    class: "",
  },
  {
    path: "/menu-Restau",
    title: "TK Menu-Restaurant",
    icon: "ni-building text-red",
    class: "",
  },
  {
    path: "/tables",
    title: "Accueil",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  // { path: "/login", title: "Login", icon: "ni-key-25 text-info", class: "" },
  // {
  //   path: "/register",
  //   title: "Register",
  //   icon: "ni-circle-08 text-pink",
  //   class: "",
  // },
  { path: "/niveau", title: "Niveau", icon: "ni-tv-2 text-primary", class: "" },
  {
    path: "/admin-posts",
    title: "Admin Posts",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/admin-comments",
    title: "Admin Comments",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/admin-form",
    title: "Admin Forum",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/user-form",
    title: "User Forum",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/user-posts",
    title: "User Posts",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/user-comments",
    title: "User Comments",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/user-candidature-post",
    title: "User candidate",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  {
    path: "/admin-candidature-post",
    title: "Admin view  candidate",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
  { path: '/create', title: 'Create Exam',  icon: 'ni-fat-add text-blue', class: '' },
    { path: '/form-salle', title: 'Create room',  icon: 'ni-fat-add text-green', class: '' },
    { path: '/list-salles', title: 'List of rooms',  icon: 'ni-bullet-list-67 text-orange', class: '' },
    { path: '/list-examens', title: 'List of exams',  icon: 'ni-bullet-list-67 text-yellow', class: '' },
    { path: '/calendrier-examens', title: 'Calendar of exams',  icon: 'ni-calendar-grid-58 text-purple', class: '' },
  {
    path: "/events",
    title: "Events",
    icon: "ni ni-calendar-grid-58 text-pink",
    class: "",
    children: [
      { path: "event-list", title: "Event List" },
      { path: "form-event", title: "Create Event" },
      { path: "BOEvents", title: "Admin Dashboard" },
    ],
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    console.log(this.menuItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = true;
        this.menuItems.forEach((menuItem) => {
          if (menuItem.children) {
            menuItem.showDropdown = false;
          }
        });
      }
    });
  }

  toggleDropdown(menuItem: RouteInfo) {
    menuItem.showDropdown = !menuItem.showDropdown;
  }

  closeDropdown(menuItem: RouteInfo) {
    menuItem.showDropdown = false;
  }

  signout() {
    console.log("signout button clicked");
    this.authService.logout();
  }
}
