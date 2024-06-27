export class Post {
  postId: string;
  contenuPost: string;
  userId: string;
  likes: string[];
  dislikes: string[];
  reportCount?: number;
  createdAt?: Date;
  updatedAt?: Date;*


  constructor(data: any) {
    this.postId = data._id;
    this.contenuPost = data.contenuPost;
    this.userId = data.userId;
    this.likes = data.likes || [];
    this.dislikes = data.dislikes || [];
    this.reportCount = data.reportCount;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
