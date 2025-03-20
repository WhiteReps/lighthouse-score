"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Loading from "./loading";
import dynamic from "next/dynamic";

const Promo = dynamic(() => import("./components/Promo"), {
  loading: () => <Loading />
});
const Slider = dynamic(() => import("./components/Slider"), {
  loading: () => <Loading />
});
const CountWrapper = dynamic(() => import("./components/CountWrapper"), {
  loading: () => <Loading />
});
const Catalog = dynamic(() => import("./components/Catalog"), {
  loading: () => <Loading />
});
const Posts = dynamic(() => import("./components/Posts"), {
  loading: () => <Loading />
});
const PlaceLoc = dynamic(() => import("./components/PlaceLoc"), {
  loading: () => <Loading />
});
const GroupWrapper = dynamic(() => import("./components/GroupWrapper"), {
  loading: () => <Loading />
});
const FormWrapper = dynamic(() => import("./components/FormWrapper"), {
  loading: () => <Loading />
});
const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <Loading />
});
const ContactOut = dynamic(() => import("./components/ContactOut"), {
  loading: () => <Loading />
});

export default function Home() {
  const [offloading, setOffLoading] = useState(false);

  useEffect(() => {
    setOffLoading(false);
    setTimeout(() => setOffLoading(true), 200);
  }, []);

  return (
    <main>
      <Loading done={offloading} />
      <Header />
      <HeroSection />
      <Suspense>
        <Promo />
        <Slider />
        <CountWrapper />
        <Posts />
        <Catalog />
        <PlaceLoc />
        <GroupWrapper />
        <FormWrapper />
        <Footer />
        <ContactOut />
      </Suspense>
      <ToastContainer />
    </main>
  );
}