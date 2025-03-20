"use client";
import Link from "next/link";
import TitleWrapper from "./TitleWrapper";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import LoadingImage from "./LoadingImage";
import CategoryLink from "./CategoryLink";
import { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useData } from "../service/Provider";
import React from "react";

import { FaExclamationCircle } from "react-icons/fa";
import { extractImage } from "../utils/ExtractImg";

const Posts = () => {

  

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sectionData = useData();

  const variants = {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  };

  const fetchData = async ({ queryKey }) => {
    const [_, page, searchTerm, category] = queryKey;
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: 8,
        ...(searchTerm && { search: searchTerm }),
        ...(category !== null && { category_id: category }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/site/${process.env.NEXT_PUBLIC_SITE_ID}?${queryParams}`
      );

      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return { posts: [], totalPages: 0 };
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts", page, searchTerm, category],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, [category, searchTerm]);

  useEffect(() => {
    if (data?.posts) {
      setPosts((prev) => {
        const updatedPosts = [...prev, ...data.posts];
        const postMap = new Map(updatedPosts.map((post) => [post.post_id, post]));
        return Array.from(postMap.values());
      });

      setHasMore(data.page < data.totalPages);
      setLoadingMore(false);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section
      id="posts"
      className="pb-10"
    >
      <div className="container m-auto py-8">
        <TitleWrapper
          title={sectionData?.blogSec[0]?.title_text}
          firstLine={sectionData?.blogSec[0]?.text_desc}
        />

        <div className="category_wrapper mt-8">
          <h2 className="text-[#00359f] text-xl text-center">
            {sectionData?.blogSec[0]?.subtitle_text}
          </h2>
          <CategoryLink
            setFn={setCategory}
            setSearch={setSearchTerm}
            totalNumber={posts.length}
          />
        </div>

        <div className="search_wrapper flex gap-5 items-center justify-center my-6">
          <input
            type="search"
            className="bg-[#c8d3de] text-[#00359f] outline-0 px-4 py-2 font-bold"
            placeholder="Inserisci una parola chiave"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="font-bold border-0 bg-[#f5f6f7] py-2 px-3">
            Cercare
          </button>
        </div>

        {isLoading && page === 1 && <LoadingImage />}

        {!isLoading && posts.length === 0 && (
          <p className="font-bold mt-4 flex gap-2 text-gray-400 text-lg justify-center items-center">
            <FaExclamationCircle className="text-[#2b37ce]" />
            <span>Nessun risultato trovato. Prova un&apos;altra parola</span>
          </p>
        )}

        {!isLoading && posts.length > 0 && (
          <>
            <div className="post_wrapper gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {posts.map((elem) => (
                <motion.div
                  className="relative group"
                  key={elem.post_id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  variants={variants}
                >
                  <div className="relative w-full h-[260px] lg:w-[280px] lg:h-[260px]">
                    <Image
                      src={extractImage(elem.post_desc)}
                      alt="Post image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 280px"
                      priority={false}
                    />
                  </div>
                  <div className="text-center absolute top-0 opacity-0 group-hover:opacity-100 flex items-center justify-center h-full w-full bg-[#0000005c] text-white text-2xl transition-opacity duration-300 ease-in-out">
                    <h2>
                      <Link href={elem.post_slug}>{elem.post_title}</Link>
                    </h2>
                  </div>
                </motion.div>
              ))}
            </div>
            {hasMore &&
              (loadingMore ? (
                <LoadingImage />
              ) : (
                <div className="text-center mt-6">
                  <button
                    className="bg-[#00359f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffd966] duration-75 m-auto flex items-center gap-2"
                    onClick={handleLoadMore}
                  >
                    <FaCirclePlus className="text-[#ffd966] whatsapp_icon_social" />{" "}
                    Vedi altre voci
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Posts;
