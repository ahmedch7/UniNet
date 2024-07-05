export class Forum {
  _id?: string;

  titreForum: string;
  descriptionForum?: string;
  category: string;
  userId: string;
  cv_path?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this._id = data._id;
    this.titreForum = data.titreForum;
    this.descriptionForum = data.descriptionForum;
    this.category = data.category;
    this.userId = data.userId;
    this.cv_path = data.cv_path;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
