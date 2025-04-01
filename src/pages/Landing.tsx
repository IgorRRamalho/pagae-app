import { useEffect, useState } from "react";
import LandingMobile from "./Landing/Landing.mobile";
import LandingDesktop from "./Landing/Landing.desktop";



const Landing = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <LandingMobile /> : <LandingDesktop />;
};

export default Landing;
