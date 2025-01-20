"use client";

import tag from "@/models/tag";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [updatingTag, setUpdatingTag] = useState(null);

  const createTag = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, parentCategory }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Tag created");
        setName("");
        // setParentCategory("");
        setTags([data, ...tags]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error creating tag");
    }
  };

  const fetchTag = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/tag`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("all tags ======>", data);

      if (!response.ok) {
        toast.error(data);
      } else {
        setTags(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error creating tag");
    }
  };


  const fetchTagsPublic = async () => {
    try {
      const response = await fetch(`${process.env.API}/tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setTags(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error creating tag");
    }
  };

  const updateTag = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tag/${updatingTag?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingTag),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Tag Updated");
        setUpdatingTag(null);
        setParentCategory("");
        setTags((prevTags) => {
          return prevTags?.map((t) => (t._id === data._id ? data : t));
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error creating tag");
    }
  };

  const deleteTag = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tag/${updatingTag?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = await response.json()
      if(!response.ok) {
        toast.error(data)
      } else {
        toast.success("Tag deleted"),
        setUpdatingTag(null),
        setParentCategory(""),
        setTags((prevTags) => {
          return prevTags?.filter((t) => t._id !== data._id)
        })
      }
    } catch (err) {
      console.log(err);
      toast.error("Error creating tag");
    }
  };

  return (
    <TagContext.Provider
      value={{
        name,
        setName,
        parentCategory,
        setParentCategory,
        tags,
        setTags,
        updatingTag,
        setUpdatingTag,
        createTag,
        fetchTag,
        fetchTagsPublic,
        updateTag,
        deleteTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTag = () => useContext(TagContext);
