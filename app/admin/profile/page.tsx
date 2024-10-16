"use client";

import AdminLayout from "@/components/mainLayout/admin";
import { ProfileComponent } from "@/components/ui/profile/ProfileComponent";

export default function Dashboard() {

  return (
    <AdminLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <ProfileComponent />
      
    </AdminLayout>
  );
}
