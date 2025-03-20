import React, { Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";

import("intl-tel-input/styles");
import("react-toastify/dist/ReactToastify.css");

const Provider = React.lazy(() => import("./service/Provider"));

const montserratSans = localFont({
  src: "./fonts/Montserrat.ttf",
  variable: "--font-montserrat-sans",
  weight: "100 900",
});
const montserratMono = localFont({
  src: "./fonts/Montserrat.ttf",
  variable: "--font-montserrat-mono",
  weight: "100 900",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_POST_URL}/api/details/meta/${process.env.NEXT_PUBLIC_SITE_ID}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    const faviconAddress = data?.site_fav
      ? `${process.env.NEXT_PUBLIC_CMS_URL}api/uploads/${data.site_fav}`
      : "/favicon.ico";

    return {
      title: data?.site_title || "Pura+ | Ortopedia Fisioterapia Salud Belleza",
      description:
        data?.site_desc ||
        "ortopedia cuidado pie rehabilitacion fitness medias varices salud belleza",
      icons: {
        icon: faviconAddress,
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    return {
      title: "Pura+ | Ortopedia Fisioterapia Salud Belleza",
      description: "Error fetching metadata.",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.webp"
        />
        <link rel="preconnect" href="https://avexim.com" />
        <link rel="preconnect" href="https://admin.avexim.com" />
        <link rel="preconnect" href="https://api.avexim.com" />
        <link rel="dns-prefetch" href="https://avexim.com" />
        <link rel="dns-prefetch" href="https://admin.avexim.com" />
        <link rel="dns-prefetch" href="https://api.avexim.com" />

        <link
          rel="preload"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${montserratSans.variable} ${montserratMono.variable} antialiased overflow-x-hidden`}
      >
        <h1 className="sr-only">Pura+ | Ortopedia Fisioterapia Salud Belleza</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <Provider>{children}</Provider>
        </Suspense>
      </body>
    </html>
  );
}