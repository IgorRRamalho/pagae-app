import useIsMobile from "@hook/useIsMobile";
import AuthPageMobile from "./Auth/AuthPage.mobile";
import AuthPageDesktop from "./Auth/AuthPage.desktop";


const AuthPage = () => {
  const isMobile = useIsMobile();

  return isMobile ? <AuthPageMobile /> : <AuthPageDesktop />;
};

export default AuthPage;
