import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  acces: string[];
  children?: { path: string, title: string }[];
  showDropdown?: boolean;}


export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '',acces:['admin','responsable'] },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' ,acces:['admin','responsable'] },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '',acces:['admin','responsable']  },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '',acces:['admin','responsable']  },
    { path: '/stat-foyer', title: 'TK Statistiques foyer',  icon: 'ni-building text-red', class: '',acces:['admin','responsable'] },
    { path: '/foyer', title: 'TK Foyer',  icon: 'ni-building text-red', class: '' ,acces:['admin','responsable'] },
    { path: '/restaurant', title: 'TK Restaurant',  icon: 'ni-building text-red', class: '' ,acces:['admin','responsable'] },
    { path: '/menu-Restau', title: 'TK Menu-Restaurant',  icon: 'ni-building text-red', class: '',acces:['admin','responsable']  },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' ,acces:['admin','responsable'] },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '',acces:['admin','responsable']  },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '',acces:['admin','responsable']  },
  {
    path: '/events',
    title: 'Events',
    icon: 'ni ni-calendar-grid-58 text-pink',
    class: '',
    children: [
      { path: 'event-list', title: 'Event List'},
      { path: 'form-event', title: 'Create Event'},
      { path: 'BOEvents', title: 'Admin Dashboard'}
    ],acces:['admin','responsable']  
  } 
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  public isCollapsed = true;

  constructor(private router: Router) { }
  role='admin';
  ngOnInit() {

    
    this.menuItems = ROUTES.filter(menuItem => menuItem.acces.includes(this.role));

    console.log(this.menuItems)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = true;
        this.menuItems.forEach(menuItem => {
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
}
