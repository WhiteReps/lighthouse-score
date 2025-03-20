"use client";
import { useQuery } from "@tanstack/react-query";
import { extractImage } from "../utils/ExtractImg";
import Image from "next/image";
import Link from "next/link";

const MostPopular = ({title}) => {
  const fetchMostPopular = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/mostpopularpost/${process.env.NEXT_PUBLIC_SITE_ID}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mostPopular"],
    queryFn: fetchMostPopular,
  });

  return (
    <div className="shadow-xl mb-6">
      <h3 className="text-lg uppercase bg-[#f7f7f7] px-3 py-2 text-center">
        {title}
      </h3>
      <div className="px-1">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching posts</div>}
        {data &&
          data.map((post, index) => (
            <Link
              href={post.post_slug}
              key={index}
              className="flex items-start gap-4 py-2 border-b "
            >
              <Image
                src={extractImage(post.post_desc)}
                alt={post.post_title}
                priority={false} 
                className="resent_post"
                width={100}
                height={100}
              />
              <div className="flex justify-center w-full">
                <h4 className="text-sm">{post.post_title}</h4>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MostPopular;
