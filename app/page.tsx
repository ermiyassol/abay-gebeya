
import { Suspense } from "react"; 
import Loader from "@/components/custom/loader";
import Home from "./home/page";
import SignUp from "./signup/page";

export default async function Dashboard(props: any) {
  return (
    <Suspense fallback={<Loader></Loader>}>
        <SignUp />  
    </Suspense>
  );
}
