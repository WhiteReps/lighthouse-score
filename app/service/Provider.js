"use client";

import { createContext, useContext } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Error from "../error";
import Loading from "../loading";

// Create Context
const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

// Initialize Query Client
const queryClient = new QueryClient();

// Fetch Data Function
const fetchSiteData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_POST_URL}/api/details/${process.env.NEXT_PUBLIC_SITE_ID}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

// Data Provider Component (Client-Side Fetching)
const DataProvider = ({ children, initialData }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["siteData"],
    queryFn: fetchSiteData,
    staleTime: 300000, // 5 minutes
    initialData, // Use server-side fetched data
  });

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Static Data Fetching (SSG or ISR)
export async function getStaticProps() {
  try {
    const data = await fetchSiteData();

    return {
      props: { initialData: data }, // Pass data as props
      revalidate: 60, // Revalidate every 60 seconds (ISR)
    };
  } catch (error) {
    return {
      props: { initialData: null }, // Handle errors gracefully
    };
  }
}

// Main Provider Component
export default function Provider({ children, initialData }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider initialData={initialData}>{children}</DataProvider>
    </QueryClientProvider>
  );
}