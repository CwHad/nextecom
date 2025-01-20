import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = new mongoose.Schema(
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
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  { timestamps: true }
);


categorySchema.plugin(uniqueValidator, 'is already taken.');

export default mongoose.models?.Category || mongoose.model("Category", categorySchema);
