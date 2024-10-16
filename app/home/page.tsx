"use client";

import MainLayout from "@/components/mainLayout/main";
import { HomeCarousal } from "@/components/ui/carousal/HomeCarousal";
import { AboutText } from "@/components/ui/descriptions/aboutText";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();
  const [reloadSidebar, setReloadSidebar] = useState(false);

  useEffect(() => {
    router.push("/home");
  }, [])
  return (
    <MainLayout
      reloadSidebar={reloadSidebar}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <HomeCarousal />
      <AboutText />
    </MainLayout>
  );
}
