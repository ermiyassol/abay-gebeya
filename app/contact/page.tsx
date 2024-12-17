"use client";

import MainLayout from "@/components/mainLayout/main";

import { useState } from "react";
import { DashboardData } from "@/types/floatTypes";

interface DashboardDataType {
  numberOfMappedOutlets: number;
  numberOfVisitedOutlets: number;
}

export default function Contacts() {
  const [loading, setLoading] = useState(true);

  return (
    <MainLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <h2>contact us page</h2>
      {/* {loading && <LoadingSpinner />} */}
      {/* {!loading && <DashboardTopCards
        numberOfMappedOutlets={dashboardReport?.numberOfMappedOutlets}
        numberOfVisitedOutlets={dashboardReport?.numberOfVisitedOutlets}
      />} */}
      {/* <h2 className="mt-10 text-center">Under Development, Stay Tuned!</h2> */}
    </MainLayout>
  );
}
