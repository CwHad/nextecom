import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import Category from "@/models/category";
import Tag from "@/models/tag";
import User from "@/models/user";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 160,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1000000,
      text: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    images: [
      {
        secure_url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    published: {
      type: Boolean,
      default: false,
    },
    customerField1: {
      type: String,
      default: null,
    },
    customerField2: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

blogSchema.plugin(uniqueValidator, {message: "Already exists"});


export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
