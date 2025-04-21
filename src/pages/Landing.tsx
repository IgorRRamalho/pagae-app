import useIsMobile from "@hook/useIsMobile";
import LandingDesktop from "./Landing/Landing.desktop";
import LandingMobile from "./Landing/Landing.mobile";



const Landing = () => {
  const isMobile = useIsMobile();

  return isMobile ? <LandingMobile /> : <LandingDesktop />;
};

export default Landing;
