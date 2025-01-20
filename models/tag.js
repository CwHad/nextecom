import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Category from "@/models/category"

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
      maxLength: 20,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500,
    },
    image: {
        type: String,
        trim: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);


tagSchema.plugin(uniqueValidator, 'is already taken.');

export default mongoose.models?.Tag || mongoose.model("Tag", tagSchema);
