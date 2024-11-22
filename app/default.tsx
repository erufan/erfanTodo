import HomePageProp from "@/interface/HomePageProp";
import HomePage from "./page";

const DefaultHomePage = ({ searchParams }: HomePageProp) => {
  return (
    <>
      <HomePage searchParams={searchParams} />
    </>
  );
};

export default DefaultHomePage;
