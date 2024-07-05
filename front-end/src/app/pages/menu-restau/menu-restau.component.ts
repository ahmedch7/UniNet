import { Component, OnInit } from '@angular/core';
import { MenuRestauService } from 'src/app/Services/menu-restau.service';
import { CommentRestauService } from 'src/app/Services/comment-restau.service';

@Component({
  selector: 'app-menu-restau',
  templateUrl: './menu-restau.component.html',
  styleUrls: ['./menu-restau.component.scss']
})
export class MenuRestauComponent implements OnInit {
  menus: any[] = [];

  datafromlocalstorge={
    role:1
  }
  newMenu: any = {
    text: '',
    image: null,
    restaurantId: '667da145289a0643f337fa8e', // ID statique du restaurant
    previewImage: null // Pour stocker l'URL de l'aperçu de l'image
  };
  newComment: any = {
    
    content: '',
    author: '6683e1c309d9b20f76f09c1d', // ID statique de l'auteur
    menuId: ''
  };

  currentEditMenu: any = {}; // Pour stocker les données du menu à éditer
  showEditModal = false; // Pour contrôler la visibilité du modal

  constructor(private menuService: MenuRestauService, private commentService: CommentRestauService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (data) => {
        this.menus = data.map(menu => ({
          ...menu,
          showComments: false,
          editMode: false,
          editText: menu.text
        }));
      },
      (error) => {
        console.error('Error loading menus', error);
      }
    );
  }


  onFileChange(event: any, menu?: any): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.newMenu.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
  
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
          restaurantId: '667da145289a0643f337fa8e',
          previewImage: null // Réinitialiser l'aperçu après la création
        };
        this.loadMenus();
      },
      (error) => {
        console.error('Error creating menu', error);
      }
    );
  }

  updateMenu(menuId: string, menu: any): void {
    const formData = new FormData();
    formData.append('text', menu.text); // Utilisez menu.text au lieu de menu.editText
    if (menu.editImage) {
      formData.append('image', menu.editImage);
    }
  
    this.menuService.updateMenu(menuId, formData).subscribe(
      (data) => {
        console.log('Menu updated successfully', data);
        this.loadMenus();
      },
      (error) => {
        console.error('Error updating menu', error);
      }
    );
  }
  
  startEditMenu(menu: any): void {
    // Assurez-vous de cloner l'objet menu pour éviter la modification directe
    this.currentEditMenu = { ...menu };
    // Réinitialisez editImage pour charger l'image existante dans le formulaire de mise à jour
    this.currentEditMenu.editImage = null;
  
    // Afficher l'image existante dans le formulaire de modification si disponible
    this.newMenu.previewImage = this.currentEditMenu.image
      ? `http://localhost:9090/img/${this.currentEditMenu.image}`
      : null;
  
    this.showEditModal = true;
  }
  
  
  

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveEditedMenu(): void {
    this.updateMenu(this.currentEditMenu._id, this.currentEditMenu);
    this.closeEditModal();
  }
  
  deleteMenu(menuId: string): void {
    this.menuService.deleteMenu(menuId).subscribe(
      (data) => {
        console.log('Menu deleted successfully', data);
        this.loadMenus();
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

  deleteComment(menuId: string, commentId: string): void {
    this.commentService.deleteComment(menuId, commentId).subscribe(
      (data) => {
        console.log('Comment deleted successfully', data);
        // Rechargez les commentaires pour le menu après la suppression
        this.loadMenus();
      },
      (error) => {
        console.error('Error deleting comment', error);
      }
    );
  }


}
