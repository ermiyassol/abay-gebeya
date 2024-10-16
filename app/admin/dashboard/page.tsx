"use client";

import AdminLayout from "@/components/mainLayout/admin";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const router = useRouter();
  const [reloadSidebar, setReloadSidebar] = useState(false);

  return (
    <AdminLayout
      reloadSidebar={reloadSidebar}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div>Dashboard</div>
    </AdminLayout>
  );
}
