import useIsMobile from "@hook/useIsMobile";
import HomeDesktop from "./Home/Home.desktop";
import HomeMobile from "./Home/Home.mobile";

const Home = () => {
  const isMobile = useIsMobile();

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;
