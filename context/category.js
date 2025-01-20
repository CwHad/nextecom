"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  // to create a category
  const [name, setName] = useState("");
  // for fetching all categorys
  const [categories, setCategories] = useState([]);
  // for update and delete
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("data err", data)
        toast.error(data);
      } else {
        toast.success("Category created");
        setName("");
        setCategories([data.category, ...categories]);
      }
    } catch (err) {
      console.log(err), toast.error("An error occurred, Try again");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err), toast.error("An error occurred, Try again");
    }
  };

  const fetchCategoriesPublic = async () => {
    try {
      const response = await fetch(`${process.env.API}/categories`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err), toast.error("An error occurred, Try again");
    }
  };

  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingCategory),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category updated");
        /**
         * 通常在用户点击“编辑”按钮时调用，将用户当前正在编辑的分类对象存入 updateCategory
         */
        setUpdatingCategory(null);
        setCategories(
          categories.map((category) => {
            return category._id === updatingCategory._id ? data : category;
          })
        );
      }
    } catch (err) {
      console.log(err), toast.error("An error occurred, Try again");
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category deleted");
        setCategories(
          categories.filter((category) => {
            return category._id !== updatingCategory._id;
          })
        );
        setUpdatingCategory(null);
      }
    } catch (err) {
      console.log(err), toast.error("An error occurred, Try again");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        updatingCategory,
        setUpdatingCategory,
        categories,
        setCategories,
        createCategory,
        fetchCategories,
        fetchCategoriesPublic,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
