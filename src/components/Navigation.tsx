
import { useEffect, useState } from "react";
import NavigationDesktop from "./Navigation/Navigation.desktop";
import NavigationMobile from "./Navigation/Navigation.mobile";



const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
};

export default Navigation;
