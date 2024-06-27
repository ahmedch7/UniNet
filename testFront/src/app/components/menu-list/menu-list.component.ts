import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus: any[] = [];
  newMenu: any = {
    text: '',
    image: '',
    restaurantId: '667da145289a0643f337fa8e' // ID statique du restaurant
  };
  newComment: any = {
    content: '',
    author: '',
    menuId: ''
  };

  constructor(private menuService: MenuService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (data) => {
        this.menus = data;
      },
      (error) => {
        console.error('Error loading menus', error);
      }
    );
  }

  createMenu(): void {
    this.menuService.createMenu(this.newMenu).subscribe(
      (data) => {
        console.log('Menu created successfully', data);
        this.newMenu = {
          text: '',
          image: '',
          restaurantId: '667da145289a0643f337fa8e' // Réinitialisation à l'ID statique après création
        };
        this.loadMenus(); // Rechargez la liste des menus après la création
      },
      (error) => {
        console.error('Error creating menu', error);
      }
    );
  }

  addComment(menuId: string): void {
    this.newComment.menuId = menuId;
    this.commentService.addComment(menuId, this.newComment).subscribe(
      (data) => {
        console.log('Comment added successfully', data);
        this.newComment = {
          content: '',
          author: '',
          menuId: ''
        };
        // Rechargez les commentaires pour le menu après l'ajout
        this.loadMenus();
      },
      (error) => {
        console.error('Error adding comment', error);
      }
    );
  }
}
