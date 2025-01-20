"use client";

import { useEffect } from "react";
import { useCategory } from "@/context/category";

export const CategoryList = () => {
  const { fetchCategories, categories, setUpdatingCategory } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="my-5">
      {categories?.map((c) => (
        <button
          className="btn"
          key={c._id}
          onClick={() => {
            setUpdatingCategory(c);
          }}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
};
