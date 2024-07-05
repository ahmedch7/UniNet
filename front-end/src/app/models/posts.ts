import {Commentaire} from "./commentaire";

export class Post {
  _id: string;
  contenuPost: string;
  userId: string;
  likes: string[];
  dislikes: string[];
  reportCount?: number;
  comments: Commentaire[];
  showCommentField?: boolean;
  newCommentContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isVerifed?: boolean;

  constructor(data: any) {
    console.log("data from the constructor", data);
    this._id = data._id;
    this.contenuPost = data.contenuPost;
    this.userId = data.userId;
    this.likes = data.likes || [];
    this.dislikes = data.dislikes || [];
    this.reportCount = data.reportCount;
    this.comments = data.comments || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.isVerifed = data.isVerifed;
  }
}
