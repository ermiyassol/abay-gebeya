import Link from "next/link";
// import { Button } from "../ui/button";
// import { RiLoginCircleLine } from "react-icons/ri";

export default function Unauthenticated() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-slate-800">
      <div className="border-white border p-4 shadow-xl rounded-md bg-slate-200">
        <div className="flex justify-center mt-8">
          <h2 className="text-red-600 text-4xl">
            Hold on there Ke-mosah-bee! you are not authenticated !!!
          </h2>
        </div>
        <div className="flex justify-center mt-8 px-12">
          <p>
            Ke-mo sah-bee (/ˌkiːmoʊˈsɑːbiː/; often spelled kemo sabe, kemosabe
            or kimosabe) is the term used by the fictional Native American
            sidekick Tonto as the Native American name for the Lone Ranger in
            the American Lone Ranger radio program and television show. Derived
            from gimoozaabi, an Ojibwe and Potawatomi word that may mean `he/she
            looks out in secret`,[1] it has been occasionally translated as{" "}
            <span className="text-xl text-primary">trusty scout</span> or{" "}
            <span className="text-xl text-primary">faithful friend</span>.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Link href={process.env.NEXT_BASE_URL??'/'}>
            {/* <Button className="my-1  mr-8">
              Login
              <RiLoginCircleLine className="ml-4"></RiLoginCircleLine>
            </Button> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
