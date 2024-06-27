export class Commentaire {
  _id: string;
  contenuCommentaire: string;
  dateCommentaire?: Date;
  userId: string;
  postId: string;
  likes: string[];
  dislikes: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this._id = data._id;

    this.contenuCommentaire = data.contenuCommentaire;
    this.dateCommentaire = data.dateCommentaire || new Date();
    this.userId = data.userId;
    this.postId = data.postId;
    this.likes = data.likes || [];
    this.dislikes = data.dislikes || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // You can add methods here if needed
}
