"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback } from "react";

const fetchCategory = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_URL}/api/category/site/${process.env.NEXT_PUBLIC_SITE_ID}`
    );
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
};

const CategoryLink = React.memo(({ setFn, setSearch }) => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    staleTime: 60 * 1000, // Cache data for 1 minute
  });
  
  const handleCategory = useCallback(
    (id) => {
      setFn(id);
      setSearch("");
    },
    [setFn, setSearch]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="my-4 text-center text-sm">
        <div className="animate-pulse bg-gray-200 h-6 w-24 mx-2 my-1 inline-block"></div>
        <div className="animate-pulse bg-gray-200 h-6 w-24 mx-2 my-1 inline-block"></div>
        <div className="animate-pulse bg-gray-200 h-6 w-24 mx-2 my-1 inline-block"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return <div className="my-4 text-center text-sm text-red-500">Failed to load categories.</div>;
  }

  return (
    <div className="my-4 text-center text-sm">
      {data.map((cat) => (
        <button
          onClick={() => handleCategory(cat.cat_id)}
          className="rounded m-2"
          key={cat.cat_id} // Use cat_id as the key
        >
          <span className="bg-[#c8d3de] hover:bg-[#ffd966] duration-200 px-3 py-1 text-[#00359f]">
            {cat.cat_name}
          </span>
          <span className="bg-[#00359f] px-2 py-1 text-white">
            ({cat.post_count})
          </span>
        </button>
      ))}
    </div>
  );
});

export default CategoryLink;
