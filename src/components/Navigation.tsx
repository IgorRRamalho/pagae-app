
import useIsMobile from "@hook/useIsMobile";
import NavigationDesktop from "./Navigation/Navigation.desktop";
import NavigationMobile from "./Navigation/Navigation.mobile";


const Navigation = () => {
  const isMobile = useIsMobile();

  return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
};
export default Navigation;
