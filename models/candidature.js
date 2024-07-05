import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const CandidatureSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      required: true,
      ref: "post",
    },
    cv_path: { type: String },
  },
  { timestamps: true }
);
export default model("Candidature", CandidatureSchema);
