"use client";

import MainLayout from "@/components/mainLayout/main";
import { ProfileComponent } from "@/components/ui/profile/ProfileComponent";

export default function Dashboard() {

  return (
    <MainLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <ProfileComponent />
    </MainLayout>
  );
}
