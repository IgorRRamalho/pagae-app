
import useIsMobile from "@hook/useIsMobile";
import { FooterMobile } from "./Footer/Footer.mobile";
import { FooterDesktop } from "./Footer/Footer.desktop";



const Footer = () => {
    const isMobile = useIsMobile();

    return isMobile ? <FooterMobile /> : <FooterDesktop />;
};
export default Footer;
