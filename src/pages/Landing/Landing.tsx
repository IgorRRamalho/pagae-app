import { useEffect, useState } from "react";
import LandingDesktop from "./Landing.desktop";
import LandingMobile from "./Landing.mobile";


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
