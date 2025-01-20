"use client";

import { useEffect } from "react";
import { useTag } from "@/context/tag";
import Link from "next/link";

export default function TagList({ category }) {
  const { tags, fetchTag, setUpdatingTag } = useTag();

  useEffect(() => {
    fetchTag();
  }, []);

  if (category) {
    // const filterTags = [];
    // tags.map((t) => {
    //   if (t.parentCategory === category?._id?.toString()) {
    //     filterTags.push(t);
    //   }
    // });

    const filteredTags = tags.filter((t) => t.parentCategory === category._id);

    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col">
            {filteredTags?.map((t) => (
              <div key={t._id}>
                <Link href={`/tag/${t.slug}`} className="btn text-dark">
                  {t?.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mb-3">
        <div className="d-flex">
          {tags?.map((t) => (
            <div key={t._id}>
              <button
                className="btn btn-raised mx-3"
                onClick={() => setUpdatingTag(t)}
              >
                {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
