import { Component, OnInit } from '@angular/core';
import { MenuRestauService } from '../../services/menu-restau.service';
import { CommentRestauService } from '../../services/comment-restau.service';

@Component({
  selector: 'app-menu-restau',
  templateUrl: './menu-restau.component.html',
  styleUrls: ['./menu-restau.component.scss']
})
export class MenuRestauComponent implements OnInit {
  menus: any[] = [];
  newMenu: any = {
    text: '',
    image: null,
    restaurantId: '667da145289a0643f337fa8e' // ID statique du restaurant
  };
  newComment: any = {
    content: '',
    author: '664f89f28fb320b8082864b5',//ID statique d auteur
    menuId: ''
  };

  constructor(private menuService: MenuRestauService, private commentService: CommentRestauService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (data) => {
        // Ajoutez la propriété showComments pour chaque menu
        this.menus = data.map(menu => ({ ...menu, showComments: false, editMode: false, editText: menu.text }));
      },
      (error) => {
        console.error('Error loading menus', error);
      }
    );
  }

  onFileChange(event: any, menu?: any): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (menu) {
        menu.editImage = file;
      } else {
        this.newMenu.image = file;
      }
    }
  }

  createMenu(): void {
    const formData = new FormData();
    formData.append('text', this.newMenu.text);
    formData.append('restaurantId', this.newMenu.restaurantId);
    if (this.newMenu.image) {
      formData.append('image', this.newMenu.image);
    }

    this.menuService.createMenu(formData).subscribe(
      (data) => {
        console.log('Menu created successfully', data);
        this.newMenu = {
          text: '',
          image: null,
          restaurantId: '667da145289a0643f337fa8e' // Réinitialisation à l'ID statique après création
        };
        this.loadMenus(); // Rechargez la liste des menus après la création
      },
      (error) => {
        console.error('Error creating menu', error);
      }
    );
  }

  updateMenu(menuId: string): void {
    const menu = this.menus.find(menu => menu._id === menuId);
    const formData = new FormData();
    formData.append('text', menu.editText);
    formData.append('restaurantId', menu.restaurantId);
    if (menu.editImage) {
      formData.append('image', menu.editImage);
    }

    this.menuService.updateMenu(menuId, formData).subscribe(
      (data) => {
        console.log('Menu updated successfully', data);
        this.loadMenus(); // Rechargez la liste des menus après la mise à jour
      },
      (error) => {
        console.error('Error updating menu', error);
      }
    );
  }

  deleteMenu(menuId: string): void {
    this.menuService.deleteMenu(menuId).subscribe(
      (data) => {
        console.log('Menu deleted successfully', data);
        this.loadMenus(); // Rechargez la liste des menus après la suppression
      },
      (error) => {
        console.error('Error deleting menu', error);
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

  toggleComments(menuId: string): void {
    this.menus = this.menus.map(menu => {
      // Si le menu est celui cliqué, alternez son état showComments
      // Si un autre menu a showComments true, mettez-le à false
      if (menu._id === menuId) {
        menu.showComments = !menu.showComments;
        if (menu.showComments) {
          this.commentService.getComments(menuId).subscribe(
            (comments) => {
              menu.comments = comments;
            },
            (error) => {
              console.error('Error loading comments', error);
            }
          );
        }
      } else {
        menu.showComments = false;
      }
      return menu;
    });
  }

  editMenu(menu: any): void {
    menu.editMode = !menu.editMode;
  }
}
