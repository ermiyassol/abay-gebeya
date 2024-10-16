"use client";

import ManagerLayout from "@/components/mainLayout/manager";
import { ProfileComponent } from "@/components/ui/profile/ProfileComponent";

export default function Dashboard() {

  return (
    <ManagerLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <ProfileComponent />
      
    </ManagerLayout>
  );
}
