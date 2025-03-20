"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Header from "../components/Header";
import CategoryLink from "../components/CategoryLink";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
import Image from "next/image";
import { extractImage } from "../utils/ExtractImg";
import LeftSideBar from "../components/LeftSideBar";
import AllPosts from "../components/AllPosts";
import { useData } from "../service/Provider";

const Provider = React.lazy(() => import("../service/Provider"));

import Loading from "./loading";
import Comments from "../components/Comments";
import IconRenderer from "../utils/IconRenderer";

const Page = () => {
  
  const { slug } = useParams();
  const sectionData = useData();
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const singlePostFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/singlepost/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
            postId: process.env.NEXT_PUBLIC_SITE_ID,
          }),
        }
      );

      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singlePost", slug],
    queryFn: singlePostFetch,
    onError: (error, retry) => {
      console.error("Error fetching post:", error);
      retry();
    },
  });

  if (isLoading || !sectionData) return <Loading />;

  const { currentPost, relatedPosts, previousPost, nextPost } = data;

  const meta = currentPost.post_title
    ? `${currentPost.post_title} - Pura+ | Ortopedia Fisioterapia Salud Belleza`
    : "Pura+ | Ortopedia Fisioterapia Salud Belleza";

  document.title = meta;

  const processedDesc = currentPost.post_desc.replace(
    /<img\s+[^>]*src="(\/[^"]*)"/g,
    `<img src="${process.env.NEXT_PUBLIC_CMS_URL}$1"`
  );

  return (
    <Provider>
      <main>
        <Header />
        <section className="pt-24 pb-10">
          <div className="container m-auto">
            <div className="lg:flex lg:gap-10 items-start justify-between">
              <div className="w-full lg:w-9/12">
                <div className="category_wrapper mt-8">
                  <h1 className="hidden">{meta}</h1>
                  <h2 className="text-[#00359f] text-xl text-center">
                    {sectionData?.blogSec[0]?.subtitle_text}
                  </h2>
                  <CategoryLink
                    setFn={setCategory}
                    setSearch={setSearchTerm}
                  />
                  {!category && !searchTerm && (
                    <div className="search_wrapper flex gap-5 items-center justify-center my-6">
                      <input
                        type="search"
                        className="bg-[#c8d3de] text-[#00359f] outline-0 px-4 py-2 font-bold"
                        placeholder="Inserta una palabra clave"
                        value={searchTerm}
                        onChange={(e) =>
                          setTimeout(setSearchTerm(e.target.value), 200)
                        }
                      />
                      <button className="font-bold border-0 bg-[#f5f6f7] py-2 px-3">
                        Buscar
                      </button>
                    </div>
                  )}
                </div>
                {(category || searchTerm) && (
                  <AllPosts
                    category={category}
                    search={searchTerm}
                  />
                )}
                {!category && !searchTerm && (
                  <>
                    <div className="single_post_wrapper">
                      <div className="title_wrappe">
                        <h2 className="text-center text-4xl text-black my-6">
                          {currentPost.post_title}
                        </h2>
                        <div
                          className="post_desc_wrapper"
                          dangerouslySetInnerHTML={{ __html: processedDesc }}
                        />
                      </div>
                    </div>

                    <div className="share_wrapper">
                      <h2 className="text-center mt-3">
                        <span className="border-b text-black text-sm font-bold border-black pb-2 pt-6">
                          {sectionData?.singlePost[0]?.share_text}
                        </span>
                      </h2>
                      <div className="social_icons_wrapper flex items-center justify-center lg:justify-end gap-3 mt-5 lg:mt-0">
                        {sectionData?.singlePostIcons.map((icon, index) => {
                          const isLast =
                            index === sectionData.singlePostIcons.length - 1;
                          return (
                            <Link
                              key={icon.sh_id}
                              href={`${icon.icon_link}${encodeURIComponent(
                                window.location.href
                              )}`}
                              target="_blank"
                              className={`text-2xl bg-black text-white p-1 rounded-sm ${isLast ? "whatsapp_icon_social" : ""
                                }`}
                              rel="noopener noreferrer"
                            >
                              <IconRenderer
                                iconName={icon.icon_name}
                                size={16}
                              />
                            </Link>
                          );
                        })}
                      </div>

                      <div className="relative_category_wrapper gap-10 my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.length > 0 &&
                          relatedPosts.map((postCat, index) => {
                            return (
                              <Link
                                key={index}
                                href={`/${postCat.post_slug}`}
                                className="text-sm text-black text-center"
                              >
                                <span className="relative block w-full h-[150px] lg:w-[240px] lg:h-[150px] ">
                                  <Image
                                    src={extractImage(postCat.post_desc)}
                                    alt="Category post"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 265px"
                                    priority={false}
                                  />
                                </span>
                                <span className="mt-3">
                                  {postCat.post_title}
                                </span>
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                    <div className="pagination_wrapper flex items-center justify-center gap-3 py-8">
                      {nextPost && (
                        <Link
                          href={`/${nextPost.post_slug}`}
                          className="bg-[#00359f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffd966] duration-75 flex items-center gap-2"
                        >
                          <FaArrowCircleLeft className="text-[#ffd966] whatsapp_icon_social" />{" "}
                          {
                            sectionData?.singlePost[0]
                              ?.previous_post_button_text
                          }
                        </Link>
                      )}
                      {previousPost && (
                        <Link
                          href={`/${previousPost.post_slug}`}
                          className="bg-[#00359f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffd966] duration-75"
                        >
                          {sectionData?.singlePost[0]?.next_post_button_text}
                        </Link>
                      )}
                    </div>
                  </>
                )}
                <div>
                  <Comments id={currentPost.post_id} />
                </div>
              </div>
              <div className="w-full lg:w-3/12">
                <LeftSideBar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Provider>
  );
};

export default Page;
