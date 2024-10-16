export interface FloatAreaData {
  location: string;
  average: number;
}
export interface FloatVsUsageData {
  date: string;
  data: number[];
}

export interface ListData {
  businessName: string;
  cluster: string;
  createdAt: string;
  dsa: string;
  floatStatus: string;
  id: string;
  route: string;
  site: string;
}
export interface DashboardData {
  activeFloatBalance: number;
  averageFloatAvailability: string;
  floatBalance: number;
  floatUsage: number;
  availabilityVsUsage:FloatVsUsageData[];
  averageGrossByLocation: FloatAreaData[];
  list: ListData[];
}

interface ChartData {
  name: string,
  data: number[]
}

export interface PerformanceDashboardData {
  series: ChartData[],
  categories: string[],
  title: string
}