"use client";

import MainLayout from "@/components/mainLayout/main";
import { AboutText } from "@/components/ui/descriptions/aboutText";

export default function About() {
  return (
    <MainLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <AboutText />
    </MainLayout>
  );
}
