import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const forumSchema = new Schema(
  {
    titreForum: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      validate: {
        validator: async function (value) {
          const existingForum = await this.constructor.findOne({
            titreForum: value,
          });
          return !existingForum;
        },
        message: (props) => `Le titre du forum '${props.value}' existe déjà!`,
      },
      // The following regex is updated to include a wider range of Unicode characters, which should include all French characters
      match: /^[\u00C0-\u024F\w\- ]+$/,
    },

    descriptionForum: { type: String },
    category: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true, ref: "user" },
    cv_path: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Forum", forumSchema);
