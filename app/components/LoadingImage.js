"use client";
import Image from "next/image";
import React from "react";
import spinner from '@/public/spinner.svg'

const LoadingImage = () => {
  // const [imgSrc, setImgSrc] = useState(null);
  // const data = useData();

  // useEffect(() => {
  //   if (data?.loading_error?.[0]?.loading_img) {
  //     console.log('✅', `${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${data.loading_error[0].loading_img}`)
  //     setImgSrc(
  //       `${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${data.loading_error[0].loading_img}`
  //     );
  //   }
  // }, [data]);

  // if (!imgSrc) return null;

  return (
    <div className="flex justify-center items-center">
      <Image
        src={spinner}
        width={250}
        height={250}
        priority
        className="m-auto"
        alt="loading image"
        loading="eager"
        placeholder="blur" // Optional: Show a blurred image first
        blurDataURL="/placeholder.jpg" // Use a low-res placeholder
      />
    </div>
  );
};

export default LoadingImage;
