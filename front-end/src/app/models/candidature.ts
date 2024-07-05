export interface Candidature {
  _id: string;
  userName: string;
  phoneNumber: string;
  postId: string;
  cv_path?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
