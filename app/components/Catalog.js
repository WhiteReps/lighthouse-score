import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useData } from "../service/Provider";
const Catalog = () => {

  

  const renderText = (text) => {
    if (!text) return null;
    return text.split(/<br\s*\/?>/).map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  const data = useData();

  if (!data || !data.catalog || data.catalog.length === 0) {
    return <p className="text-center text-white">Catalog data is unavailable.</p>;
  }

  return (
    <section id="catalog" className="py-8">
      <div className="container m-auto text-center text-white">
        <h2 className="text-4xl mb-4">{data?.catalog[0]?.title_text || "Catalog"}</h2>
        <div className="font-light text-sm">
          {renderText(data?.catalog[0]?.text_desc)}
        </div>
        {data?.catalog[0]?.catalog_img && (
          <Link href={`https://catalogo.puramas.co/`} target="_blank" aria-label="catalogo img">
            <Image
              src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${data?.catalog[0]?.catalog_img}`}
              alt="Catalog Photo"
              width={400}
              height={283}
              priority={false}
              className="m-auto mt-7"
            />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Catalog;
