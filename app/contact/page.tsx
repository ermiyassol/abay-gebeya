"use client";

import MainLayout from "@/components/mainLayout/main";

import { useState, useEffect, useRef, useMemo } from "react";
import { DashboardData } from "@/types/floatTypes";

import { getSession, signIn } from "next-auth/react";
import encrypt from "@/utils/encrypt";
import { useRouter, useSearchParams } from "next/navigation";
import { getDashboardReport } from "../actions/ctapp/dashboard";
// import DashboardTopCards from "@/components/ui/card/dashboardTopCards";
// import LoadingSpinner from "@/components/ui/loading-spinner/loadingSpinner";

interface DashboardDataType {
  numberOfMappedOutlets: number;
  numberOfVisitedOutlets: number;
}

export default function Contacts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [reloadSidebar, setReloadSidebar] = useState(false);
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);
  const [dashboardReport, setDashboardReport] = useState<DashboardDataType>({
    numberOfMappedOutlets: 0,
    numberOfVisitedOutlets: 0,
  });
  const [loading, setLoading] = useState(true);
  // const [selectedDetailType, setSelectedDetailType] = useState("");
  // const [selectedDetail, setSelectedDetail] = useState<any>([]);
  // const hierarchyList = useRef<string[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await getDashboardReport();
      setDashboardReport(response.data);
      setLoading(false);
    };

    const fetchToken = async () => {
      const session = await getSession();
      if (session == null) {
        const key = memoizedSearchParams.get(encrypt("key"));
        const userName = memoizedSearchParams.get(encrypt("userName"));
        if (key != null) {
          await signIn("credentials", {
            key: key,
            userName: userName,
            redirect: false,
          });
          setReloadSidebar(true);
          router.replace("/");
          fetchAllData();
        } else {
          setReloadSidebar(false);
          fetchAllData();
        }
      } else {
        setReloadSidebar(false);
        fetchAllData();
      }
    };
    fetchToken();
  }, []);

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    activeFloatBalance: 0,
    averageFloatAvailability: "none",
    floatBalance: 0,
    floatUsage: 0,
    availabilityVsUsage: [],
    averageGrossByLocation: [],
    list: [],
  });

  return (
    <MainLayout
      reloadSidebar={reloadSidebar}
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
