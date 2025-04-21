import useIsMobile from "@hook/useIsMobile";
import { NavLandingMobile } from "./NavLanding/NavLanding.mobile";
import NavLandingDesktop from "./NavLanding/NavLanding.desktop";

const NavLanding = () => {
  const isMobile = useIsMobile();

  return isMobile ? <NavLandingMobile /> : <NavLandingDesktop />;
};
export default NavLanding;
