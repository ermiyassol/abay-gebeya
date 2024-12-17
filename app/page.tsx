
import { Suspense } from "react"; 
import Loader from "@/components/custom/loader";
import Home from "./home/page";
import SignIn from "./signin/page";

export default async function Dashboard(props: any) {
  return (
    <Suspense fallback={<Loader></Loader>}>
        <SignIn />  
    </Suspense>
  );
}
